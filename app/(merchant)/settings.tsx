import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { resolveImageUrl } from "@/lib/image";
import { useFocusEffect, useRouter } from "expo-router";
import { Bell, ChevronRight, Globe, LogOut, Settings2 } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
interface Brand { slug: string; name: string; logo_url: string | null }

type UsdtNetwork = "ethereum" | "polygon" | "bnb";

interface MerchantProfile {
  usdt_address?: string;
  usdt_network?: UsdtNetwork;
  bank_name?: string;
  account_number?: string;
  address?: string;
}

const NETWORK_OPTIONS: { key: UsdtNetwork; label: string }[] = [
  { key: "ethereum", label: "merchant.mSettings.ethereum" },
  { key: "polygon", label: "merchant.mSettings.polygon" },
  { key: "bnb", label: "merchant.mSettings.bnb" },
];

function MenuItem({ icon, label, onPress }: { icon: React.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable className="flex-row items-center justify-between px-4 py-6" onPress={onPress}>
      <View className="flex-row items-center gap-3">
        {icon}
        <Text className="text-base text-foreground">{label}</Text>
      </View>
      <ChevronRight size={18} color="#737373" />
    </Pressable>
  );
}

export default function MerchantSettingsScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);

  const [usdtAddress, setUsdtAddress] = useState("");
  const [usdtNetwork, setUsdtNetwork] = useState<UsdtNetwork | "">("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [address, setAddress] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useFocusEffect(
    useCallback(() => {
      apiFetch<{ brands: Brand[] }>("/oth-path")
        .then((d) => setBrands(d.brands))
        .catch(() => {});

      apiFetch<{ profile: MerchantProfile }>("/oth-path")
        .then((d) => {
          const p = d.profile;
          setUsdtAddress(p.usdt_address ?? "");
          setUsdtNetwork(p.usdt_network ?? "");
          setBankName(p.bank_name ?? "");
          setAccountNumber(p.account_number ?? "");
          setAddress(p.address ?? "");
        })
        .catch(() => {});
    }, [])
  );

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      await apiFetch("/oth-path", {
        method: "PATCH",
        body: JSON.stringify({
          usdt_address: usdtAddress,
          usdt_network: usdtNetwork || undefined,
          bank_name: bankName,
          account_number: accountNumber,
          address,
        }),
      });
      alert(t("merchant.mSettings.savedTitle"), t("merchant.mSettings.saved"));
    } catch (err: any) {
      alert(t("settings.profile.failTitle"), String(err?.body?.error ?? err?.message ?? err));
    } finally {
      setSavingProfile(false);
    }
  };

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
          <Text className="text-lg font-bold text-foreground">{user?.name}</Text>
          {user?.email && <Text className="text-sm text-muted-foreground mt-0.5">{user.email}</Text>}
          <Text className="text-xs text-primary mt-1">{t("merchant.mSettings.merchantAccount")}</Text>
        </View>

        {}
        {brands.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {brands.map((b) => (
              <View key={b.slug} className="items-center gap-1.5" style={{ width: 72 }}>
                <View className="w-14 h-14 rounded-xl bg-white border border-border items-center justify-center overflow-hidden">
                  {b.logo_url ? (
                    <Image
                      source={{ uri: resolveImageUrl(b.logo_url) ?? undefined }}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  ) : (
                    <Text className="text-xl font-bold text-muted-foreground">
                      {b.name.slice(0, 1)}
                    </Text>
                  )}
                </View>
                <Text className="text-xs text-foreground text-center" numberOfLines={2}>{b.name}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {}
        <View className="mx-4 bg-card rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-semibold text-foreground mb-3">{t("merchant.mSettings.profileTitle")}</Text>

          {}
          <Text className="text-xs text-muted-foreground mb-1">{t("merchant.mSettings.usdt")}</Text>
          <TextInput
            value={usdtAddress}
            onChangeText={setUsdtAddress}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-2"
            placeholder={t("merchant.mSettings.usdtAddressPh")}
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
          <Text className="text-xs text-muted-foreground mb-1">{t("merchant.mSettings.usdtNetwork")}</Text>
          <View className="flex-row gap-2 mb-4">
            {NETWORK_OPTIONS.map((opt) => {
              const selected = usdtNetwork === opt.key;
              return (
                <Pressable
                  key={opt.key}
                  className={`flex-1 items-center py-2.5 rounded-lg border ${selected ? "border-primary bg-primary/10" : "border-border bg-gray-50"}`}
                  onPress={() => setUsdtNetwork(opt.key)}
                >
                  <Text className={`text-xs font-medium ${selected ? "text-primary" : "text-foreground"}`}>
                    {t(opt.label)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {}
          <Text className="text-xs text-muted-foreground mb-1">{t("merchant.mSettings.bankName")}</Text>
          <TextInput
            value={bankName}
            onChangeText={setBankName}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-2"
            placeholder={t("merchant.mSettings.bankName")}
            placeholderTextColor="#999"
          />
          <Text className="text-xs text-muted-foreground mb-1">{t("merchant.mSettings.accountNumber")}</Text>
          <TextInput
            value={accountNumber}
            onChangeText={setAccountNumber}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-4"
            placeholder={t("merchant.mSettings.accountNumber")}
            placeholderTextColor="#999"
            keyboardType="number-pad"
          />

          {}
          <Text className="text-xs text-muted-foreground mb-1">{t("merchant.mSettings.address")}</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-4"
            placeholder={t("merchant.mSettings.addressPlaceholder")}
            placeholderTextColor="#999"
            multiline
            numberOfLines={2}
          />

          <Button onPress={saveProfile} disabled={savingProfile}>
            <Text className="text-primary-foreground font-semibold">
              {savingProfile ? t("settings.profile.saving") : t("merchant.mSettings.save")}
            </Text>
          </Button>
        </View>

        {}
        <View className="mx-4 bg-card rounded-xl border border-border overflow-hidden mb-4">
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
