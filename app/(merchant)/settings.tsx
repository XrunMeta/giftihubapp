import React from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogOut } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function MerchantSettingsScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "로그아웃", onPress: () => logout() },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">설정</Text>
      </View>

      <View className="mx-4 bg-card rounded-xl border border-border p-5 mb-4">
        <Text className="text-lg font-bold text-foreground">{user?.name}</Text>
        {user?.email && <Text className="text-sm text-muted-foreground mt-0.5">{user.email}</Text>}
        <Text className="text-xs text-primary mt-1">가맹점 계정</Text>
      </View>

      <View className="px-4 mt-4">
        <Button variant="outline" onPress={handleLogout} className="flex-row gap-2">
          <LogOut size={18} color="#ef4444" />
          <Text className="text-destructive font-medium">로그아웃</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
