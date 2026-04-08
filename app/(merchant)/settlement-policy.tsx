import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SettlementPolicy = "anytime" | "monthly" | "request_only";

const POLICY_OPTIONS: { key: SettlementPolicy; labelKey: string; descKey: string }[] = [
  { key: "anytime", labelKey: "merchant.mSettings.policyAnytime", descKey: "merchant.mSettings.policyAnytimeDesc" },
  { key: "monthly", labelKey: "merchant.mSettings.policyMonthly", descKey: "merchant.mSettings.policyMonthlyDesc" },
  { key: "request_only", labelKey: "merchant.mSettings.policyRequest", descKey: "merchant.mSettings.policyRequestDesc" },
];

export default function SettlementPolicyScreen() {
  const { t } = useI18n();
  const router = useRouter();
  const [policy, setPolicy] = useState<SettlementPolicy>("anytime");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ settlement_policy: string }>("/oth-path")
      .then((data) => setPolicy(data.settlement_policy as SettlementPolicy))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const changePolicy = async (p: SettlementPolicy) => {
    const prev = policy;
    setPolicy(p);
    try {
      await apiFetch("/oth-path", {
        method: "PATCH",
        body: JSON.stringify({ settlement_policy: p }),
      });
      router.back();
    } catch {
      setPolicy(prev);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <PageHeader title={t("merchant.mSettings.settlementPolicy")} />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 24 }}>
        {loading ? (
          <ActivityIndicator size="small" className="mt-8" />
        ) : (
          <View className="bg-card rounded-xl border border-border overflow-hidden">
            {POLICY_OPTIONS.map((opt, index) => {
              const selected = policy === opt.key;
              return (
                <View key={opt.key}>
                  {index > 0 ? <View className="h-px bg-border mx-4" /> : null}
                  <Pressable
                    className={`flex-row items-center justify-between px-4 py-4 ${selected ? "bg-primary/5" : ""}`}
                    onPress={() => changePolicy(opt.key)}
                  >
                    <View className="flex-1 mr-3">
                      <Text className={`text-sm font-medium ${selected ? "text-primary" : "text-foreground"}`}>
                        {t(opt.labelKey)}
                      </Text>
                      <Text className="text-xs text-muted-foreground mt-0.5">{t(opt.descKey)}</Text>
                    </View>
                    {selected ? <Check size={20} color="#CE3630" /> : null}
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
