import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import type { PaymentMethod } from "@/services/store";
import { getDevMode } from "@/services/system";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Banknote, Coins, CreditCard, Zap } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_PAYMENT_METHODS: { key: PaymentMethod; label: string; icon: React.ReactNode; devOnly?: boolean }[] = [
  { key: "dev_pay", label: "개발페이", icon: <Zap size={20} color="#3b82f6" />, devOnly: true },
  { key: "paypal", label: "PayPal", icon: <CreditCard size={20} color="#0a0a0a" /> },
  { key: "dana", label: "DANA", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "smileypay", label: "SmileyPay", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "usdt_trc20", label: "USDT (TRC-20)", icon: <Coins size={20} color="#0a0a0a" /> },
];

const SYM: Record<string, string> = { KRW: "₩", USD: "$", IDR: "Rp" };

export default function PurchaseScreen() {
  const router = useRouter();
  const { currency } = useLocalSearchParams<{ currency?: string }>();
  const { items, packageItems } = useCart();
  const [selected, setSelected] = useState<PaymentMethod | null>(null);
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    getDevMode().then(setDevMode).catch(() => { });
  }, []);

  const PAYMENT_METHODS = BASE_PAYMENT_METHODS.filter((m) => !m.devOnly || devMode);

  const targetCurrency = currency || "KRW";
  const pkgTotal = packageItems
    .filter((p) => p.currency === targetCurrency)
    .reduce((s, p) => s + p.totalBudget, 0);

  const targetItems = items.filter((i) => {
    if (i.flexibleAmount) return (i.product.flexible_currency ?? "KRW") === targetCurrency;
    return targetCurrency === "KRW";
  });
  const itemTotal = targetItems.reduce((s, i) => {
    if (i.flexibleAmount) return s + i.flexibleAmount;
    return s + i.product.price * i.quantity;
  }, 0);
  const totalPrice = pkgTotal + itemTotal;
  const totalCount = packageItems.filter((p) => p.currency === targetCurrency).length
    + targetItems.length;

  const handlePay = () => {
    if (!selected) {
      Alert.alert("선택 필요", "결제 수단을 선택해주세요.");
      return;
    }
    router.push({
      pathname: "/(user)/payment-process",
      params: { method: selected, currency: targetCurrency },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={`${targetCurrency} 결제`} />
      <View className="flex-1 px-5">
        <View className="bg-card rounded-xl border border-border p-4 mb-6">
          <View className="flex-row justify-between">
            <Text className="text-sm text-muted-foreground">상품 수</Text>
            <Text className="text-sm font-medium text-foreground">{totalCount}개</Text>
          </View>
          <Separator className="my-3" />
          <View className="flex-row justify-between">
            <Text className="text-base font-semibold text-foreground">결제 금액</Text>
            <Text className="text-xl font-bold text-primary">
              {SYM[targetCurrency] ?? ""}{totalPrice.toLocaleString()}
            </Text>
          </View>
        </View>

        <Text className="text-base font-semibold text-foreground mb-3">결제 수단</Text>
        <View className="gap-2">
          {PAYMENT_METHODS.map((pm) => (
            <Pressable
              key={pm.key}
              className={`flex-row items-center p-4 rounded-xl border ${selected === pm.key ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              onPress={() => setSelected(pm.key)}
            >
              {pm.icon}
              <Text className="text-base text-foreground ml-3 flex-1">{pm.label}</Text>
              <View
                className={`w-5 h-5 rounded-full border-2 ${selected === pm.key ? "border-primary bg-primary" : "border-border"
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
