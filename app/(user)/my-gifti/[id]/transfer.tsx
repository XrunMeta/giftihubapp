import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import { transferVoucher } from "@/services/vouchers";

export default function TransferScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!email) {
      Alert.alert("입력 오류", "수신자 이메일을 입력해주세요.");
      return;
    }
    Alert.alert("양도 확인", `${email}에게 기프티를 양도하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      {
        text: "양도",
        onPress: async () => {
          setLoading(true);
          try {
            await transferVoucher(id!, email);
            Alert.alert("완료", "기프티가 양도되었습니다.", [
              { text: "확인", onPress: () => router.back() },
            ]);
          } catch (err: any) {
            Alert.alert("실패", err.body?.error || "양도에 실패했습니다.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="기프티 양도" />
      <View className="flex-1 px-5 mt-4">
        <Text className="text-sm font-medium text-foreground mb-1.5">수신자 이메일</Text>
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="recipient@example.com"
          value={email}
          onChangeText={setEmail}
        />
        <Text className="text-xs text-muted-foreground mt-2">
          양도 후에는 취소할 수 없습니다.
        </Text>
        <Button onPress={handleTransfer} disabled={loading} className="mt-6">
          {loading ? "양도 중..." : "양도하기"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
