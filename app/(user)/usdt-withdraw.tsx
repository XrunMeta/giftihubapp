import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/services/api";

interface WithdrawResponse {
  ok: boolean;
  tx_hash?: string;
  estimated_time?: string;
}

export default function UsdtWithdrawScreen() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidTrc20 = (addr: string) =>
    /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(addr.trim());

  const handleWithdraw = async () => {
    if (!walletAddress.trim() || !amount.trim()) {
      Alert.alert("입력 오류", "지갑 주소와 금액을 모두 입력해주세요.");
      return;
    }
    if (!isValidTrc20(walletAddress)) {
      Alert.alert("입력 오류", "올바른 TRC-20 지갑 주소를 입력해주세요.");
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert("입력 오류", "올바른 금액을 입력해주세요.");
      return;
    }

    Alert.alert(
      "출금 확인",
      `${numAmount} USDT를\n${walletAddress.substring(0, 8)}...${walletAddress.substring(walletAddress.length - 6)}\n으로 출금하시겠습니까?`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "출금하기",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const res = await apiFetch<WithdrawResponse>(
                "/oth-path",
                {
                  method: "POST",
                  body: JSON.stringify({
                    wallet_address: walletAddress.trim(),
                    amount: numAmount,
                    network: "TRC-20",
                  }),
                },
              );
              Alert.alert(
                "출금 요청 완료",
                `출금이 요청되었습니다.\n${res.estimated_time ? `예상 소요시간: ${res.estimated_time}` : "처리까지 시간이 걸릴 수 있습니다."}`,
                [{ text: "확인", onPress: () => router.back() }],
              );
            } catch (err: any) {
              Alert.alert(
                "출금 실패",
                err.body?.error || "다시 시도해주세요.",
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="USDT 출금" />
      <ScrollView className="flex-1 px-6">
        <View className="bg-card border border-border rounded-xl p-4 mt-4">
          <Text className="text-xs text-muted-foreground">출금 네트워크</Text>
          <Text className="text-base font-semibold text-foreground mt-1">
            TRON (TRC-20)
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            TRC-20 지갑 주소
          </Text>
          <Input
            placeholder="T로 시작하는 34자리 주소"
            value={walletAddress}
            onChangeText={setWalletAddress}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            출금 금액 (USDT)
          </Text>
          <Input
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6">
          <Text className="text-sm font-medium text-amber-600">⚠️ 주의사항</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            • 반드시 TRC-20 네트워크 주소를 입력해주세요.{"\n"}
            • 잘못된 주소로 전송 시 복구가 불가합니다.{"\n"}
            • 출금 처리에 최대 24시간이 소요될 수 있습니다.{"\n"}
            • 최소 출금 금액: 10 USDT
          </Text>
        </View>

        <Button
          onPress={handleWithdraw}
          disabled={loading || !walletAddress.trim() || !amount.trim()}
          className="mt-8"
        >
          {loading ? "처리 중..." : "출금 요청"}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
