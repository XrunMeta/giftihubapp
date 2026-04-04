import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { CheckCircle, XCircle } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { purchaseProduct, type PaymentMethod } from "@/services/store";
import { purchaseBundle } from "@/services/bundle";
import { getPaymentStatus } from "@/services/payment";

export default function PaymentProcessScreen() {
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
      Alert.alert("결제 오류", "결제 수단이 선택되지 않았습니다.");
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
      Alert.alert("결제 오류", `해당 통화(${targetCurrency})의 상품이 없습니다.\n장바구니: ${items.length}개, flex_currencies: ${items.map(i => i.product.flexible_currency).join(",")}`);
      setStatus("failed");
      return;
    }

    try {

      for (const pkg of targetPackages) {
        const composition = pkg.composition;
        if (!composition) {
          Alert.alert("결제 오류", "구성 정보가 없습니다.");
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
          Alert.alert("결제 실패", "결제가 완료되지 않았습니다.");
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
      const detail = err.body?.error || err.message || "결제를 처리할 수 없습니다.";
      const debugInfo = JSON.stringify(
        { status: err.status, body: err.body, message: err.message },
        null,
        2,
      );
      console.error("[payment-process] error:", debugInfo);
      setDebugError(debugInfo);
      Alert.alert("결제 실패", `${detail}\n(status: ${err.status || "unknown"})`);
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
    <SafeAreaView className="flex-1 bg-background items-center justify-center px-6">
      {status === "processing" && (
        <View className="items-center">
          <ActivityIndicator size="large" color="#CE3630" />
          <Text className="text-lg font-semibold text-foreground mt-4">{targetCurrency} 결제 처리 중...</Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            결제가 완료될 때까지 잠시 기다려주세요.
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
              {targetCurrency} 결제 완료!
            </Text>
            <Text className="text-sm text-muted-foreground mt-2 text-center">
              기프티가 발급되었습니다.
              {hasMore ? `\n다른 통화 상품이 장바구니에 남아있습니다.` : `\n내 기프티에서 확인하세요.`}
            </Text>
            {hasMore ? (
              <Button className="mt-6 w-full" onPress={() => router.replace("/(user)/cart")}>
                장바구니로 돌아가기
              </Button>
            ) : (
              <Button className="mt-6 w-full" onPress={() => router.replace("/(user)/oth-path")}>
                내 기프티 보기
              </Button>
            )}
          </View>
        );
      })()}

      {status === "failed" && (
        <View className="items-center">
          <XCircle size={64} color="#ef4444" />
          <Text className="text-xl font-bold text-foreground mt-4">결제 실패</Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            결제가 완료되지 않았습니다.{"\n"}다시 시도해주세요.
          </Text>
          {debugError ? (
            <Text className="text-xs text-red-400 mt-2 text-left font-mono" selectable>
              {debugError}
            </Text>
          ) : null}
          <Button className="mt-6 w-full" onPress={() => router.back()}>
            돌아가기
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
