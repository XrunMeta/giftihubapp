import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { giftVoucher } from "@/services/vouchers";

export default function SendGiftScreen() {
  const router = useRouter();
  const { voucherId, voucherName } = useLocalSearchParams<{
    voucherId: string;
    voucherName: string;
  }>();
  const [telegramId, setTelegramId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendGift = async () => {
    if (!telegramId.trim()) {
      Alert.alert("입력 오류", "받는 사람의 Telegram ID를 입력해주세요.");
      return;
    }
    if (!voucherId) {
      Alert.alert("오류", "선물할 기프티를 선택해주세요.");
      return;
    }

    Alert.alert(
      "선물 확인",
      `"${voucherName || "기프티"}"를 Telegram ID: ${telegramId}에게 선물하시겠습니까?\n\n수수료가 부과될 수 있습니다.`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "선물하기",
          onPress: async () => {
            setLoading(true);
            try {
              const res = await giftVoucher(voucherId, telegramId.trim());
              Alert.alert(
                "선물 완료",
                `기프티가 성공적으로 전송되었습니다.${res.fee > 0 ? `\n수수료: ${res.fee}원` : ""}`,
                [{ text: "확인", onPress: () => router.back() }],
              );
            } catch (err: any) {
              Alert.alert("선물 실패", err.body?.error || "다시 시도해주세요.");
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
      <PageHeader title="선물하기" />
      <ScrollView className="flex-1 px-6">
        {voucherName ? (
          <View className="bg-card border border-border rounded-xl p-4 mt-4">
            <Text className="text-xs text-muted-foreground">선물할 기프티</Text>
            <Text className="text-base font-semibold text-foreground mt-1">
              {voucherName}
            </Text>
          </View>
        ) : null}

        <View className="mt-6">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            받는 사람 Telegram ID
          </Text>
          <Input
            placeholder="Telegram 사용자 ID 입력"
            value={telegramId}
            onChangeText={setTelegramId}
            keyboardType="number-pad"
          />
          <Text className="text-xs text-muted-foreground mt-2">
            받는 사람의 Telegram 숫자 ID를 입력해주세요.
          </Text>
        </View>

        <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6">
          <Text className="text-sm font-medium text-amber-600">⚠️ 주의사항</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            • 선물 후에는 취소할 수 없습니다.{"\n"}
            • 받는 사람이 GiftiHub에 가입되어 있어야 합니다.{"\n"}
            • 수수료가 부과될 수 있습니다.
          </Text>
        </View>

        <Button
          onPress={handleSendGift}
          disabled={loading || !telegramId.trim()}
          className="mt-8"
        >
          {loading ? "전송 중..." : "선물 보내기"}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
