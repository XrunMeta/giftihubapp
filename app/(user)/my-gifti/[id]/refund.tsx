import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { apiFetch } from "@/services/api";

export default function RefundScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRefund = () => {
    Alert.alert(
      "환불 요청",
      "환불을 요청하시겠습니까? 관리자 승인 후 원결제 수단으로 환불됩니다.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "환불 요청",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await apiFetch(`/oth-path${id}/refund`, { method: "POST" });
              Alert.alert("완료", "환불 요청이 접수되었습니다.", [
                { text: "확인", onPress: () => router.back() },
              ]);
            } catch (err: any) {
              Alert.alert("실패", err.body?.error || "환불 요청에 실패했습니다.");
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
      <PageHeader title="환불 요청" />
      <View className="flex-1 px-5 mt-4">
        <View className="bg-card rounded-xl border border-border p-4">
          <Text className="text-sm text-foreground leading-5">
            • 환불은 관리자 승인 후 처리됩니다.{"\n"}
            • 원결제 수단으로 환불됩니다.{"\n"}
            • 환불 처리에는 1~3 영업일이 소요됩니다.{"\n"}
            • 양도 또는 일부 사용된 기프티는 환불이 불가합니다.
          </Text>
        </View>

        <Button
          variant="destructive"
          onPress={handleRefund}
          disabled={loading}
          className="mt-6"
        >
          {loading ? "요청 중..." : "환불 요청하기"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
