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
  const { method } = useLocalSearchParams<{ method: string }>();
  const router = useRouter();
  const { items, packageItems, clearCart } = useCart();
  const [status, setStatus] = useState<"processing" | "success" | "failed">("processing");
  const [debugError, setDebugError] = useState<string>("");

  useEffect(() => {
    processPayment();
  }, []);

  const processPayment = async () => {
    const hasItems = items.length > 0;
    const hasPackages = packageItems.length > 0;

    if (!hasItems && !hasPackages) {
      Alert.alert("결제 오류", "장바구니가 비어있습니다.");
      setStatus("failed");
      return;
    }
    if (!method) {
      Alert.alert("결제 오류", "결제 수단이 선택되지 않았습니다.");
      setStatus("failed");
      return;
    }

    try {
      if (hasPackages) {

        const pkg = packageItems[0];
        const composition = pkg.composition;
        if (!composition) {
          Alert.alert("결제 오류", "구성 정보가 없습니다.");
          setStatus("failed");
          return;
        }

        console.log("[payment-process] bundle purchase:", {
          amount: pkg.totalBudget,
          currency: pkg.currency,
          method,
        });

        const res = await purchaseBundle(
          composition.target_amount,
          pkg.currency,
          method as PaymentMethod,
          composition,
        );

        if (res.status === "completed" || method === "dev_pay") {
          setStatus("success");
          clearCart();
          return;
        }

        if (res.redirect_url) {
          await WebBrowser.openBrowserAsync(res.redirect_url);
        }

        pollStatus(res.payment_id);
      } else {

        const item = items[0];
        console.log("[payment-process] purchasing:", {
          productId: item.product.id,
          method,
          itemCount: items.length,
        });

        const res = await purchaseProduct(
          item.product.id,
          method as PaymentMethod,
        );

        if (res.status === "completed" || method === "dev_pay") {
          setStatus("success");
          clearCart();
          return;
        }

        if (res.redirect_url) {
          await WebBrowser.openBrowserAsync(res.redirect_url);
        }

        pollStatus(res.payment_id);
      }
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

  const pollStatus = async (id: string) => {
    const maxAttempts = 30;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const res = await getPaymentStatus(id);
        if (res.status === "completed") {
          setStatus("success");
          clearCart();
          return;
        }
        if (res.status === "failed" || res.status === "expired") {
          setStatus("failed");
          return;
        }
      } catch {

      }
      await new Promise((r) => setTimeout(r, 3000));
    }
    setStatus("failed");
  };

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center px-6">
      {status === "processing" && (
        <View className="items-center">
          <ActivityIndicator size="large" color="#CE3630" />
          <Text className="text-lg font-semibold text-foreground mt-4">결제 처리 중...</Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            결제가 완료될 때까지 잠시 기다려주세요.
          </Text>
        </View>
      )}

      {status === "success" && (
        <View className="items-center">
          <CheckCircle size={64} color="#22c55e" />
          <Text className="text-xl font-bold text-foreground mt-4">결제 완료!</Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            기프티가 발급되었습니다.{"\n"}내 기프티에서 확인하세요.
          </Text>
          <Button className="mt-6 w-full" onPress={() => router.replace("/(user)/oth-path")}>
            내 기프티 보기
          </Button>
        </View>
      )}

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
