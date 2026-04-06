import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/services/api";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecordPaymentScreen() {
  const router = useRouter();
  const [barcode, setBarcode] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecord = async () => {
    if (!barcode.trim() || !amount.trim()) {
      Alert.alert("입력 오류", "바코드와 금액을 모두 입력해주세요.");
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert("입력 오류", "올바른 금액을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/oth-path", {
        method: "POST",
        body: JSON.stringify({
          barcode: barcode.trim(),
          amount: numAmount,
          memo: memo.trim() || undefined,
        }),
      });
      Alert.alert("기록 완료", "결제가 기록되었습니다.", [
        { text: "확인", onPress: () => router.back() },
      ]);
    } catch (err: any) {
      Alert.alert("기록 실패", err.body?.error || "다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="결제 기록" />
      <ScrollView className="flex-1 px-6">
        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            바코드 번호
          </Text>
          <Input
            placeholder="14자리 바코드 입력"
            value={barcode}
            onChangeText={setBarcode}
            keyboardType="number-pad"
            maxLength={14}
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            결제 금액
          </Text>
          <Input
            placeholder="0"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            메모 (선택)
          </Text>
          <Input
            placeholder="메모 입력"
            value={memo}
            onChangeText={setMemo}
          />
        </View>

        <Button
          onPress={handleRecord}
          disabled={loading || !barcode.trim() || !amount.trim()}
          className="mt-8"
        >
          {loading ? "기록 중..." : "결제 기록"}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
