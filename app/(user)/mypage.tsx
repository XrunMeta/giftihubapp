import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { getMe, type MeResponse } from "@/services/account";
import { useFocusEffect, useRouter } from "expo-router";
import { ChevronRight, CreditCard, Gift, Globe, History, KeyRound, LogOut, Settings, Shield, UserCircle, UserPen } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function MyPageScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const alert = useAlertShim();
  const { user, logout, updateUser } = useAuth();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadMe();
    }, [])
  );

  const loadMe = async () => {
    try {
      const data = await getMe();
      setMe(data);
      if (data.user) {
        updateUser(data.user);
      }
    } catch {

    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    alert(t("mypage.alertLogoutTitle"), t("mypage.alertLogoutBody"), [
      { text: t("mypage.cancel"), style: "cancel" },
      {
        text: t("mypage.logout"),
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const profile = me?.user || user;
  const stats = me?.voucher_stats || [];
  const activeCount = stats.find((s) => s.status === "active")?.count || 0;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={t("mypage.title")} />
      <ScrollView className="flex-1">
        {}
        <View className="mx-4 bg-card rounded-xl border border-border p-5 mb-4">
          <View className="flex-row gap-3">
            <View className="h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <UserCircle size={22} color="#CE3630" strokeWidth={2} />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-lg font-bold text-foreground">{profile?.name}</Text>
              {profile?.email && (
                <Text className="mt-0.5 text-sm text-muted-foreground">{profile.email}</Text>
              )}
              {profile?.telegram_username && (
                <Text className="text-sm text-muted-foreground">@{profile.telegram_username}</Text>
              )}
            </View>
          </View>
          <View className="mt-4 flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Gift size={22} color="#CE3630" strokeWidth={2} />
            </View>
            <View>
              <Text className="text-2xl font-bold text-primary">{activeCount}</Text>
              <Text className="text-sm text-muted-foreground">{t("mypage.giftCount")}</Text>
            </View>
          </View>
        </View>

        {}
        <View className="mx-4 bg-card rounded-xl border border-border overflow-hidden mb-4">
          <MenuItem
            icon={<UserPen size={20} color="#737373" />}
            label={t("mypage.editProfile")}
            onPress={() => router.push("/(user)/edit-profile")}
          />
          <Separator />
          <MenuItem
            icon={<KeyRound size={20} color="#737373" />}
            label={t("mypage.changePassword")}
            onPress={() => router.push("/(user)/change-password")}
          />
          <Separator />
          <MenuItem
            icon={<Globe size={20} color="#737373" />}
            label={t("settings.language")}
            onPress={() => router.push("/(user)/language-settings")}
          />
        </View>

        <View className="mx-4 bg-card rounded-xl border border-border overflow-hidden">
          <MenuItem
            icon={<History size={20} color="#737373" />}
            label={t("mypage.purchaseHistory")}
            onPress={() => router.push("/(user)/settlement")}
          />
          <Separator />
          <MenuItem
            icon={<CreditCard size={20} color="#737373" />}
            label={t("mypage.paymentHistory")}
            onPress={() => router.push("/(user)/settlement")}
          />
        </View>

        <View className="mx-4 mt-4 bg-card rounded-xl border border-border overflow-hidden">
          <MenuItem
            icon={<Shield size={20} color="#737373" />}
            label="지식재산권 안내"
            onPress={() => router.push("/(user)/patent-notice")}
          />
        </View>

        <View className="px-4 mt-6 mb-8">
          <Button variant="outline" onPress={handleLogout} className="flex-row gap-2 bg-white">
            <LogOut size={18} color="#ef4444" />
            <Text className="text-destructive font-medium">{t("mypage.logout")}</Text>
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
      className="flex-row items-center justify-between px-4 py-6"
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
