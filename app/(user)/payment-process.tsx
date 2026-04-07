import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { purchaseBundle } from "@/services/bundle";
import { getPaymentStatus } from "@/services/payment";
import { purchaseProduct, type PaymentMethod } from "@/services/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { CheckCircle, XCircle } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentProcessScreen() {
  const { t } = useI18n();
  const { method, currency } = useLocalSearchParams<{ method: string; currency?: string }>();
  const router = useRouter();
  const { items, packageItems, clearByCurrency, clearCart } = useCart();
  const [status, setStatus] = useState<"processing" | "success" | "failed">("processing");
  const [debugError, setDebugError] = useState<string>("");

  const targetCurrency = currency || "KRW";

  useEffect(() => {
    setStatus("processing");
    setDebugError("");
    processPayment();
  }, [method, currency]);

  const processPayment = async () => {
    if (!method) {
      Alert.alert(t("userPaymentProcess.errNoMethodTitle"), t("userPaymentProcess.errNoMethodBody"));
      setStatus("failed");
      return;
    }

    const targetPackages = packageItems.filter((p) => p.currency === targetCurrency);
    const targetItems = items.filter((i) => {
      if (i.flexibleAmount) return (i.product.flexible_currency ?? "KRW") === targetCurrency;
      return targetCurrency === "KRW";
    });

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
      Alert.alert(
        t("userPaymentProcess.errNoMethodTitle"),
        t("userPaymentProcess.errNoItems")
          .replace("{{currency}}", targetCurrency)
          .replace("{{cartCount}}", String(items.length)),
      );
      setStatus("failed");
      return;
    }

    try {

      for (const pkg of targetPackages) {
        const composition = pkg.composition;
        if (!composition) {
          Alert.alert(t("userPaymentProcess.errNoMethodTitle"), t("userPaymentProcess.errNoComposition"));
          setStatus("failed");
          return;
        }

        const res = await purchaseBundle(
          composition.target_amount,
          pkg.currency,
          method as PaymentMethod,
          composition,
        );

        if (res.status === "completed" || method === "dev_pay") {
          continue;
        }

        if (res.redirect_url) {
          await WebBrowser.openBrowserAsync(res.redirect_url);
        }

        const completed = await pollStatusAsync(res.payment_id);
        if (!completed) {
          Alert.alert(t("userPaymentProcess.pollFailTitle"), t("userPaymentProcess.pollFailBody"));
          setStatus("failed");
          return;
        }
      }

      for (const item of targetItems) {
        const res = await purchaseProduct(item.product.id, method as PaymentMethod, item.flexibleAmount);
        if (res.status !== "completed" && method !== "dev_pay") {
          if (res.redirect_url) await WebBrowser.openBrowserAsync(res.redirect_url);
          const completed = await pollStatusAsync(res.payment_id);
          if (!completed) {
            setStatus("failed");
            return;
          }
        }
      }

      clearByCurrency(targetCurrency);
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
      Alert.alert(
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
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const res = await getPaymentStatus(id);
        if (res.status === "completed") return true;
        if (res.status === "failed" || res.status === "expired") return false;
      } catch {

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
