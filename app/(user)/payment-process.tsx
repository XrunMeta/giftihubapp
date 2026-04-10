import { Button } from "@/components/ui/button";
import { getItemCurrency, useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { purchaseBundle } from "@/services/bundle";
import { getPaymentStatus } from "@/services/payment";
import { purchaseProduct, type PaymentMethod } from "@/services/store";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { CheckCircle, XCircle } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function PaymentProcessScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { method, currency, nonce } = useLocalSearchParams<{ method: string; currency?: string; nonce?: string }>();
  const router = useRouter();
  const { items, packageItems, clearByCurrency, clearCart, selectedItemIds, selectedPackageIds, removeFromCart, removePackage } = useCart();
  const [status, setStatus] = useState<"processing" | "success" | "failed">("processing");
  const [debugError, setDebugError] = useState<string>("");
  const processedNonceRef = useRef<string | null>(null);

  const targetCurrency = currency || "KRW";

  useEffect(() => {
    const key = `${method}|${currency}|${nonce ?? "none"}`;
    if (processedNonceRef.current === key) {
      console.log(`[pay] skip duplicate key=${key}`);
      return;
    }
    processedNonceRef.current = key;
    console.log(`[pay] trigger key=${key} itemsLen=${items.length} pkgLen=${packageItems.length}`);
    setStatus("processing");
    setDebugError("");
    processPayment();
  }, [method, currency, nonce]);

  const processPayment = async () => {
    if (!method) {
      alert(t("userPaymentProcess.errNoMethodTitle"), t("userPaymentProcess.errNoMethodBody"));
      setStatus("failed");
      return;
    }

    const targetPackages = packageItems.filter(
      (p) => p.currency === targetCurrency && p.id && selectedPackageIds.has(p.id),
    );
    const targetItems = items.filter(
      (i) => getItemCurrency(i) === targetCurrency && i.cartId && selectedItemIds.has(i.cartId),
    );

    console.log("[payment-process] debug:", JSON.stringify({
      targetCurrency,
      method,
      totalItems: items.length,
      itemDetails: items.map(i => ({
        id: i.product.id,
        flexAmt: i.flexibleAmount,
        flexCur: i.product.flexible_currency,
        productType: i.product.product_type,
      })),
      targetItemsCount: targetItems.length,
      targetPackagesCount: targetPackages.length,
    }));

    if (!targetPackages.length && !targetItems.length) {
      alert(
        t("userPaymentProcess.errNoMethodTitle"),
        t("userPaymentProcess.errNoItems")
          .replace("{{currency}}", targetCurrency)
          .replace("{{cartCount}}", String(items.length)),
      );
      setStatus("failed");
      return;
    }

    try {
      console.log(`[pay] START loop pkgs=${targetPackages.length} items=${targetItems.length}`);

      for (let pi = 0; pi < targetPackages.length; pi++) {
        const pkg = targetPackages[pi];
        console.log(`[pay] pkg[${pi}] cur=${pkg.currency} amt=${pkg.composition?.target_amount}`);
        const composition = pkg.composition;
        if (!composition) {
          console.error(`[pay] pkg[${pi}] NO COMPOSITION`);
          alert(t("userPaymentProcess.errNoMethodTitle"), t("userPaymentProcess.errNoComposition"));
          setStatus("failed");
          return;
        }

        console.log(`[pay] pkg[${pi}] calling purchaseBundle...`);
        const res = await purchaseBundle(
          composition.target_amount,
          pkg.currency,
          method as PaymentMethod,
          composition,
        );
        console.log(`[pay] pkg[${pi}] bundleRes=${JSON.stringify({ status: res.status, payment_id: res.payment_id, redirect: !!res.redirect_url })}`);

        if (res.status === "completed" || method === "dev_pay") {
          console.log(`[pay] pkg[${pi}] SKIP poll (status=${res.status}, method=${method})`);
          continue;
        }

        if (res.redirect_url) {
          console.log(`[pay] pkg[${pi}] opening redirect`);
          await WebBrowser.openBrowserAsync(res.redirect_url);
        }

        const completed = await pollStatusAsync(res.payment_id);
        console.log(`[pay] pkg[${pi}] polled=${completed}`);
        if (!completed) {
          alert(t("userPaymentProcess.pollFailTitle"), t("userPaymentProcess.pollFailBody"));
          setStatus("failed");
          return;
        }
      }

      for (let ii = 0; ii < targetItems.length; ii++) {
        const item = targetItems[ii];
        console.log(`[pay] item[${ii}] id=${item.product.id} name=${item.product.name} flexAmt=${item.flexibleAmount}`);
        console.log(`[pay] item[${ii}] calling purchaseProduct...`);
        const res = await purchaseProduct(item.product.id, method as PaymentMethod, item.flexibleAmount);
        console.log(`[pay] item[${ii}] res=${JSON.stringify({ status: res.status, payment_id: res.payment_id, redirect: !!res.redirect_url })}`);
        if (res.status !== "completed" && method !== "dev_pay") {
          if (res.redirect_url) {
            console.log(`[pay] item[${ii}] opening redirect`);
            await WebBrowser.openBrowserAsync(res.redirect_url);
          }
          const completed = await pollStatusAsync(res.payment_id);
          console.log(`[pay] item[${ii}] polled=${completed}`);
          if (!completed) {
            setStatus("failed");
            return;
          }
        } else {
          console.log(`[pay] item[${ii}] SKIP poll (status=${res.status}, method=${method})`);
        }
      }

      console.log(`[pay] LOOP DONE — removing purchased items only, setting success`);

      for (const it of targetItems) {
        if (it.cartId) removeFromCart(it.cartId);
      }
      for (const pkg of targetPackages) {
        const idx = packageItems.findIndex((p) => p.id === pkg.id);
        if (idx >= 0) removePackage(idx);
      }
      setStatus("success");
    } catch (err: any) {
      const detail = err.body?.error || err.message || t("userPaymentProcess.failDetailFallback");
      const debugInfo = JSON.stringify(
        { status: err.status, body: err.body, message: err.message },
        null,
        2,
      );
      console.error("[payment-process] error:", debugInfo);
      setDebugError(debugInfo);
      alert(
        t("userPaymentProcess.failTitle"),
        t("userPaymentProcess.failBody")
          .replace("{{detail}}", detail)
          .replace("{{status}}", String(err.status ?? "unknown")),
      );
      setStatus("failed");
    }
  };

  const pollStatusAsync = async (id: string): Promise<boolean> => {
    const maxAttempts = 30;
    let consecutiveErrors = 0;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const res = await getPaymentStatus(id);
        console.log(`[payment-process] poll #${i + 1} payment_id=${id} status=${res.status}`);
        consecutiveErrors = 0;
        if (res.status === "completed") return true;
        if (res.status === "failed" || res.status === "expired") return false;
      } catch (err: any) {
        consecutiveErrors += 1;
        const info = {
          attempt: i + 1,
          payment_id: id,
          status: err?.status,
          body: err?.body,
          message: err?.message,
        };
        console.error("[payment-process] poll error:", JSON.stringify(info));
        setDebugError(JSON.stringify(info, null, 2));
        if (consecutiveErrors >= 3) {
          alert(
            t("userPaymentProcess.pollFailTitle"),
            `poll error x${consecutiveErrors}\nstatus=${err?.status}\n${err?.message ?? ""}`,
          );
          return false;
        }
      }
      await new Promise((r) => setTimeout(r, 3000));
    }
    return false;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
      {status === "processing" && (
        <View className="items-center">
          <ActivityIndicator size="large" color="#CE3630" />
          <Text className="text-lg font-semibold text-foreground mt-4">
            {t("userPaymentProcess.processing").replace("{{currency}}", targetCurrency)}
          </Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            {t("userPaymentProcess.processingHint")}
          </Text>
        </View>
      )}

      {status === "success" && (() => {

        const remaining = packageItems.filter((p) => p.currency !== targetCurrency);
        const hasMore = remaining.length > 0 || (targetCurrency !== "KRW" && items.length > 0);
        return (
          <View className="items-center">
            <CheckCircle size={64} color="#22c55e" />
            <Text className="text-xl font-bold text-foreground mt-4">
              {t("userPaymentProcess.successTitle").replace("{{currency}}", targetCurrency)}
            </Text>
            <Text className="text-sm text-muted-foreground mt-2 text-center">
              {t("userPaymentProcess.successIssued")}
              {hasMore
                ? `\n${t("userPaymentProcess.successMoreInCart")}`
                : `\n${t("userPaymentProcess.successCheckMy")}`}
            </Text>
            {hasMore ? (
              <Button className="mt-6 w-full" onPress={() => router.replace("/(user)/cart")}>
                {t("userPaymentProcess.backToCart")}
              </Button>
            ) : (
              <Button className="mt-6 w-full" onPress={() => router.replace("/(user)/oth-path")}>
                {t("userPaymentProcess.viewMyGifti")}
              </Button>
            )}
          </View>
        );
      })()}

      {status === "failed" && (
        <View className="items-center">
          <XCircle size={64} color="#ef4444" />
          <Text className="text-xl font-bold text-foreground mt-4">{t("userPaymentProcess.failedTitle")}</Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            {t("userPaymentProcess.failedBody")}
          </Text>
          {debugError ? (
            <Text className="text-xs text-red-400 mt-2 text-left font-mono" selectable>
              {debugError}
            </Text>
          ) : null}
          <Button className="mt-6 w-full" onPress={() => router.back()}>
            {t("userPaymentProcess.goBack")}
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
