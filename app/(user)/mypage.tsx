import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LogOut, ChevronRight, CreditCard, History, Settings } from "lucide-react-native";
import { Pressable } from "react-native";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getMe, type MeResponse } from "@/services/account";

export default function MyPageScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMe();
  }, []);

  const loadMe = async () => {
    try {
      const data = await getMe();
      setMe(data);
    } catch {

    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "로그아웃", onPress: () => logout() },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const profile = me?.user || user;
  const stats = me?.voucher_stats || [];
  const activeCount = stats.find((s) => s.status === "active")?.count || 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView className="flex-1">
        <View className="px-5 py-6">
          <Text className="text-2xl font-bold text-foreground">MY</Text>
        </View>

        {}
        <View className="mx-4 bg-card rounded-xl border border-border p-5 mb-4">
          <Text className="text-lg font-bold text-foreground">{profile?.name}</Text>
          {profile?.email && (
            <Text className="text-sm text-muted-foreground mt-0.5">{profile.email}</Text>
          )}
          {profile?.telegram_username && (
            <Text className="text-sm text-muted-foreground">@{profile.telegram_username}</Text>
          )}
          <View className="flex-row mt-4 gap-6">
            <View>
              <Text className="text-2xl font-bold text-primary">{activeCount}</Text>
              <Text className="text-xs text-muted-foreground">보유 기프티</Text>
            </View>
          </View>
        </View>

        {}
        <View className="mx-4 bg-card rounded-xl border border-border overflow-hidden">
          <MenuItem
            icon={<History size={20} color="#737373" />}
            label="구매 이력"
            onPress={() => router.push("/(user)/settlement")}
          />
          <Separator />
          <MenuItem
            icon={<CreditCard size={20} color="#737373" />}
            label="결제 내역"
            onPress={() => router.push("/(user)/settlement")}
          />
          <Separator />
          <MenuItem
            icon={<Settings size={20} color="#737373" />}
            label="설정"
            onPress={() => {}}
          />
        </View>

        <View className="px-4 mt-6 mb-8">
          <Button variant="outline" onPress={handleLogout} className="flex-row gap-2">
            <LogOut size={18} color="#ef4444" />
            <Text className="text-destructive font-medium">로그아웃</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      className="flex-row items-center justify-between px-4 py-3.5"
      onPress={onPress}
    >
      <View className="flex-row items-center gap-3">
        {icon}
        <Text className="text-base text-foreground">{label}</Text>
      </View>
      <ChevronRight size={18} color="#737373" />
    </Pressable>
  );
}
