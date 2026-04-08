import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useRouter } from "expo-router";
import { ChevronRight, Globe, LogOut, Settings2 } from "lucide-react-native";
import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function MenuItem({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-4 py-4 bg-card active:bg-muted"
    >
      <View className="mr-3">{icon}</View>
      <Text className="flex-1 text-sm text-foreground">{label}</Text>
      <ChevronRight size={18} color="#9ca3af" />
    </Pressable>
  );
}

export default function MerchantSettingsScreen() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(t("merchant.mSettings.logoutTitle"), t("merchant.mSettings.logoutBody"), [
      { text: t("merchant.mSettings.cancel"), style: "cancel" },
      {
        text: t("merchant.mSettings.logout"), onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        }
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={t("merchant.mSettings.title")} />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>

        <View className="mx-4 mt-4 bg-card rounded-xl border border-border p-5 mb-6">
          <Text className="text-lg font-bold text-foreground">{user?.name}</Text>
          {user?.email && <Text className="text-sm text-muted-foreground mt-0.5">{user.email}</Text>}
          <Text className="text-xs text-primary mt-1">{t("merchant.mSettings.merchantAccount")}</Text>
        </View>

        <View className="mx-4 bg-card rounded-xl border border-border overflow-hidden mb-4">
          <MenuItem
            icon={<Settings2 size={18} color="#6b7280" />}
            label={t("merchant.mSettings.settlementPolicy")}
            onPress={() => router.push("/(merchant)/settlement-policy")}
          />
          <View className="h-px bg-border mx-4" />
          <MenuItem
            icon={<Globe size={18} color="#6b7280" />}
            label={t("settings.language")}
            onPress={() => router.push("/(user)/settings")}
          />
        </View>

        <View className="px-4 mt-2">
          <Button variant="outline" onPress={handleLogout} className="flex-row gap-2 bg-white">
            <LogOut size={18} color="#ef4444" />
            <Text className="text-destructive font-medium">{t("merchant.mSettings.logout")}</Text>
          </Button>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
