import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { purchaseFromMarketplace } from "@/services/marketplace";
import type { PaymentMethod } from "@/services/store";
import { getDevMode } from "@/services/system";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Banknote, Coins, CreditCard, Zap } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_METHODS: { key: PaymentMethod; label: string; icon: React.ReactNode; devOnly?: boolean }[] = [
  { key: "dev_pay", label: "개발페이", icon: <Zap size={20} color="#3b82f6" />, devOnly: true },
  { key: "paypal", label: "PayPal", icon: <CreditCard size={20} color="#0a0a0a" /> },
  { key: "dana", label: "DANA", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "smileypay", label: "SmileyPay", icon: <Banknote size={20} color="#0a0a0a" /> },
  { key: "usdt_trc20", label: "USDT (TRC-20)", icon: <Coins size={20} color="#0a0a0a" /> },
];

export default function MarketplacePurchaseScreen() {
  const { listingId } = useLocalSearchParams<{ listingId: string }>();
  const router = useRouter();
  const [selected, setSelected] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    getDevMode().then(setDevMode).catch(() => { });
  }, []);

  const METHODS = BASE_METHODS.filter((m) => !m.devOnly || devMode);

  const handlePurchase = async () => {
    if (!selected || !listingId) return;
    setLoading(true);
    try {
      const res = await purchaseFromMarketplace(listingId, selected);
      if (selected === "dev_pay" || res.payment_method === "dev_pay") {
        Alert.alert("구매 완료", "개발페이로 즉시 구매가 완료되었습니다.", [
          { text: "확인", onPress: () => router.replace("/(user)/oth-path") },
        ]);
        return;
      }
      if (res.redirect_url) {
        await WebBrowser.openBrowserAsync(res.redirect_url);
      }
      Alert.alert("결제 진행", "결제가 진행됩니다.", [
        { text: "확인", onPress: () => router.replace("/(user)/oth-path") },
      ]);
    } catch (err: any) {
      Alert.alert("결제 실패", err.body?.error || "다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <PageHeader title="중고 구매 결제" />
      <View className="flex-1 px-5 mt-4">
        <Text className="text-base font-semibold text-foreground mb-3">결제 수단</Text>
        <View className="gap-2">
          {METHODS.map((m) => (
            <Pressable
              key={m.key}
              className={`flex-row items-center p-4 rounded-xl border ${selected === m.key ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              onPress={() => setSelected(m.key)}
            >
              {m.icon}
              <Text className="text-base text-foreground ml-3 flex-1">{m.label}</Text>
              <View
                className={`w-5 h-5 rounded-full border-2 ${selected === m.key ? "border-primary bg-primary" : "border-border"
                  }`}
              />
            </Pressable>
          ))}
        </View>
      </View>
      <View className="px-5 py-3 border-t border-border">
        <Button onPress={handlePurchase} disabled={!selected || loading}>
          {loading ? "결제 중..." : "결제하기"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
