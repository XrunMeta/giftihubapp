import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { resolveImageUrl } from "@/lib/image";
import { useFocusEffect, useRouter } from "expo-router";
import { Bell, ChevronRight, Globe, LogOut, Settings2, UserCog } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
interface Brand { slug: string; name: string; logo_url: string | null }

function MenuItem({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable className="flex-row items-center justify-between px-4 py-6" onPress={onPress}>
      <View className="flex-row items-center gap-3">
        {icon}
        <Text className="text-lg text-foreground">{label}</Text>
      </View>
      <ChevronRight size={20} color="#737373" />
    </Pressable>
  );
}

export default function MerchantSettingsScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);

  useFocusEffect(
    useCallback(() => {
      apiFetch<{ brands: Brand[] }>("/oth-path")
        .then((d) => setBrands(d.brands))
        .catch(() => {});
    }, [])
  );

  const handleLogout = () => {
    alert(t("merchant.mSettings.logoutTitle"), t("merchant.mSettings.logoutBody"), [
      { text: t("merchant.mSettings.cancel"), style: "cancel" },
      {
        text: t("merchant.mSettings.logout"), onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={t("merchant.mSettings.title")} />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>

        {}
        <View className="mx-4 mt-4 bg-card rounded-xl border border-border p-5 mb-4">
          <Text className="text-xl font-bold text-foreground">{user?.name}</Text>
          {user?.email && <Text className="text-base text-muted-foreground mt-1">{user.email}</Text>}
          <Text className="text-sm text-primary mt-1.5">{t("merchant.mSettings.merchantAccount")}</Text>
        </View>

        {}
        {brands.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {brands.map((b) => {
              const logoUri = b.logo_url ? resolveImageUrl(b.logo_url) : null;
              return (
              <View key={b.slug} className="items-center gap-1.5" style={{ width: 72 }}>
                <View className="w-14 h-14 rounded-xl bg-white border border-border items-center justify-center overflow-hidden">
                  {logoUri ? (
                    <Image
                      source={{ uri: logoUri }}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  ) : (
                    <Text className="text-xl font-bold text-muted-foreground">
                      {b.name.slice(0, 1)}
                    </Text>
                  )}
                </View>
                <Text className="text-sm text-foreground text-center" numberOfLines={2}>{b.name}</Text>
              </View>
              );
            })}
          </ScrollView>
        )}

        {}
        <View className="mx-4 bg-card rounded-xl border border-border overflow-hidden mb-4">
          <MenuItem
            icon={<UserCog size={20} color="#737373" />}
            label={t("merchant.mSettings.profileTitle")}
            onPress={() => router.push("/(merchant)/edit-profile")}
          />
          <Separator />
          <MenuItem
            icon={<Settings2 size={20} color="#737373" />}
            label={t("merchant.mSettings.settlementPolicy")}
            onPress={() => router.push("/(merchant)/settlement-policy")}
          />
          <Separator />
          <MenuItem
            icon={<Globe size={20} color="#737373" />}
            label={t("settings.language")}
            onPress={() => router.push("/(merchant)/language-settings")}
          />
          <Separator />
          <MenuItem
            icon={<Bell size={20} color="#737373" />}
            label={t("merchant.mSettings.notifications")}
            onPress={() => router.push("/(merchant)/notifications")}
          />
        </View>

        {}
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
