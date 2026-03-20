import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MerchantSettlementScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">정산</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-muted-foreground">정산 내역이 없습니다.</Text>
      </View>
    </SafeAreaView>
  );
}
