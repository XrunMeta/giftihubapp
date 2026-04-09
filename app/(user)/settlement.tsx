import { PageHeader } from "@/components/PageHeader";
import { Package } from "lucide-react-native";

const SYM: Record<string, string> = { KRW: "₩", USD: "$", IDR: "Rp" };
function fmtAmount(amount: number, currency?: string) {
  const sym = SYM[currency ?? "KRW"] ?? "";
  return `${sym}${amount?.toLocaleString() ?? 0}`;
}
import { ScrollableTabs } from "@/components/ui/scrollable-tabs";
import { useI18n } from "@/context/I18nContext";
import { getPurchases } from "@/services/account";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettlementScreen() {
  const { t } = useI18n();
  const tabs = useMemo(
    () => [
      { key: "all", label: t("userSettlement.tabAll") },
      { key: "store", label: t("userSettlement.tabStore") },
      { key: "marketplace", label: t("userSettlement.tabMarketplace") },
    ],
    [t],
  );
  const [activeTab, setActiveTab] = useState("all");
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPurchases();
  }, [activeTab]);

  const loadPurchases = async () => {
    setLoading(true);
    try {
      const source = activeTab === "all" ? undefined : activeTab;
      console.log("[settlement] loading, source=", source);
      const res = await getPurchases({ source: source as any });
      console.log("[settlement] res=", JSON.stringify(res));
      setPurchases((res as any).purchases || []);
    } catch (e) {
      console.error("[settlement] error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={t("userSettlement.title")} />
      <ScrollableTabs tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab} className="mb-3" />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isBundle = !!item.set_id;
            const vouchers: any[] = item.set_vouchers ?? [];
            if (isBundle) {
              return (
                <View className="mx-4 mb-2 bg-card rounded-xl border border-primary/30 p-3">
                  <View className="flex-row items-center gap-2 mb-2">
                    <View className="w-7 h-7 rounded-lg bg-primary/10 items-center justify-center">
                      <Package size={15} color="#CE3630" />
                    </View>
                    <Text className="text-sm font-semibold text-primary flex-1">
                      {t("myGifti.list.bundleTitle").replace("{{count}}", String(item.set_count ?? vouchers.length ?? ""))}
                    </Text>
                    <Text className="text-sm font-bold text-foreground">{fmtAmount(item.set_total_amount ?? item.amount, item.set_currency || item.currency || item.base_currency)}</Text>
                  </View>
                  {vouchers.map((v: any, i: number) => (
                    <View key={i} className="flex-row justify-between py-1 border-t border-border">
                      <Text className="text-xs text-muted-foreground flex-1" numberOfLines={1}>{v.brand} · {v.name}</Text>
                      <Text className="text-xs text-muted-foreground">{fmtAmount(v.face_value_base || v.face_value, v.base_currency)}</Text>
                    </View>
                  ))}
                  <Text className="text-xs text-muted-foreground mt-1">{item.payment_method}</Text>
                </View>
              );
            }
            return (
              <View className="mx-4 mb-2 bg-card rounded-lg border border-border p-3">
                <View className="flex-row justify-between">
                  <Text className="text-sm font-medium text-foreground">{item.voucher_name || item.brand}</Text>
                  <Text className="text-sm font-bold text-foreground">{fmtAmount(item.amount, item.currency || item.base_currency)}</Text>
                </View>
                <Text className="text-xs text-muted-foreground mt-1">{item.payment_method}</Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-muted-foreground">{t("userSettlement.empty")}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
