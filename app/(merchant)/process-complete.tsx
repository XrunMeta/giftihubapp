import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProcessCompleteScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6" edges={["top"]}>
      <CheckCircle size={80} color="#22c55e" />
      <Text className="text-2xl font-bold text-foreground mt-6">사용 완료!</Text>
      <Text className="text-sm text-muted-foreground mt-2 text-center">
        바우처가 정상적으로 사용 처리되었습니다.
      </Text>
      <Button className="w-full mt-8" onPress={() => router.replace("/(merchant)")}>
        홈으로 돌아가기
      </Button>
    </SafeAreaView>
  );
}
