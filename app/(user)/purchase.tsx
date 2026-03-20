import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreditCard, Banknote, Coins } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import type { PaymentMethod } from "@/services/store";

const PAYMENT_METHODS: { key: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { key: "paypal", label: "PayPal", icon: <CreditCard size={20} color="#0a0a0a" /> },
  { key: "dana", label: "DANA", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "smileypay", label: "SmileyPay", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "usdt_trc20", label: "USDT (TRC-20)", icon: <Coins size={20} color="#0a0a0a" /> },
];

export default function PurchaseScreen() {
  const router = useRouter();
  const { getTotalPrice, getCartCount } = useCart();
  const [selected, setSelected] = useState<PaymentMethod | null>(null);

  const handlePay = () => {
    if (!selected) {
      Alert.alert("선택 필요", "결제 수단을 선택해주세요.");
      return;
    }
    router.push({
      pathname: "/(user)/payment-process",
      params: { method: selected },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="결제" />
      <View className="flex-1 px-5">
        <View className="bg-card rounded-xl border border-border p-4 mb-6">
          <View className="flex-row justify-between">
            <Text className="text-sm text-muted-foreground">상품 수</Text>
            <Text className="text-sm font-medium text-foreground">{getCartCount()}개</Text>
          </View>
          <Separator className="my-3" />
          <View className="flex-row justify-between">
            <Text className="text-base font-semibold text-foreground">결제 금액</Text>
            <Text className="text-xl font-bold text-primary">
              ₩{getTotalPrice().toLocaleString()}
            </Text>
          </View>
        </View>

        <Text className="text-base font-semibold text-foreground mb-3">결제 수단</Text>
        <View className="gap-2">
          {PAYMENT_METHODS.map((pm) => (
            <Pressable
              key={pm.key}
              className={`flex-row items-center p-4 rounded-xl border ${
                selected === pm.key ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
              onPress={() => setSelected(pm.key)}
            >
              {pm.icon}
              <Text className="text-base text-foreground ml-3 flex-1">{pm.label}</Text>
              <View
                className={`w-5 h-5 rounded-full border-2 ${
                  selected === pm.key ? "border-primary bg-primary" : "border-border"
                }`}
              />
            </Pressable>
          ))}
        </View>
      </View>

      <View className="px-5 py-4 border-t border-border">
        <Button onPress={handlePay} disabled={!selected}>
          결제하기
        </Button>
      </View>
    </SafeAreaView>
  );
}
