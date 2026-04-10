import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";

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

export default function MerchantEditProfileScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();

  const [usdtAddress, setUsdtAddress] = useState("");
  const [usdtNetwork, setUsdtNetwork] = useState<UsdtNetwork | "">("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
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
  }, []);

  const save = async () => {
    setSaving(true);
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
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={t("merchant.mSettings.profileTitle")} showBack />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="bg-white rounded-xl border border-border p-4">
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

          <Button onPress={save} disabled={saving}>
            <Text className="text-primary-foreground font-semibold">
              {saving ? t("settings.profile.saving") : t("merchant.mSettings.save")}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
