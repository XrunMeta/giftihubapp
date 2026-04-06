import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MerchantSettingsScreen() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const router = useRouter();

  type SettlementPolicy = "anytime" | "monthly" | "request_only";
  const POLICY_OPTIONS: { key: SettlementPolicy; labelKey: string; descKey: string }[] = [
    { key: "anytime", labelKey: "merchant.mSettings.policyAnytime", descKey: "merchant.mSettings.policyAnytimeDesc" },
    { key: "monthly", labelKey: "merchant.mSettings.policyMonthly", descKey: "merchant.mSettings.policyMonthlyDesc" },
    { key: "request_only", labelKey: "merchant.mSettings.policyRequest", descKey: "merchant.mSettings.policyRequestDesc" },
  ];

  const [policy, setPolicy] = useState<SettlementPolicy>("anytime");
  const [policyLoading, setPolicyLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ settlement_policy: string }>("/oth-path")
      .then((data) => setPolicy(data.settlement_policy as SettlementPolicy))
      .catch(() => { })
      .finally(() => setPolicyLoading(false));
  }, []);

  const changePolicy = async (p: SettlementPolicy) => {
    const prev = policy;
    setPolicy(p);
    try {
      await apiFetch("/oth-path", {
        method: "PATCH",
        body: JSON.stringify({ settlement_policy: p }),
      });
    } catch { setPolicy(prev); }
  };

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

      <View className="mx-4 bg-card rounded-xl border border-border p-5 mb-4">
        <Text className="text-lg font-bold text-foreground">{user?.name}</Text>
        {user?.email && <Text className="text-sm text-muted-foreground mt-0.5">{user.email}</Text>}
        <Text className="text-xs text-primary mt-1">{t("merchant.mSettings.merchantAccount")}</Text>
      </View>

      <View className="mt-6 px-4">
        <Text className="text-base font-semibold text-foreground mb-3">{t("merchant.mSettings.settlementPolicy")}</Text>
        {policyLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          POLICY_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => changePolicy(opt.key)}
              className={"flex-row items-center p-3 mb-2 rounded-lg border bg-white " + (policy === opt.key ? "border-primary bg-primary/10" : "border-border")}
            >
              <View className={"w-5 h-5 rounded-full border-2 mr-3 items-center justify-center " + (policy === opt.key ? "border-primary" : "border-muted-foreground")}>
                {policy === opt.key && <View className="w-3 h-3 rounded-full bg-primary" />}
              </View>
              <View>
                <Text className="text-sm font-medium text-foreground">{t(opt.labelKey)}</Text>
                <Text className="text-xs text-muted-foreground">{t(opt.descKey)}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View className="px-4 mt-4">
        <Button variant="outline" onPress={handleLogout} className="flex-row gap-2 bg-white">
          <LogOut size={18} color="#ef4444" />
          <Text className="text-destructive font-medium">{t("merchant.mSettings.logout")}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
