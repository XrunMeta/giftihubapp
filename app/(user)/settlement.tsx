import { PageHeader } from "@/components/PageHeader";
import { Package } from "lucide-react-native";

import { formatPrice as fmtAmount } from "@/lib/currency";
import { ScrollableTabs } from "@/components/ui/scrollable-tabs";
import type { Locale } from "@/context/I18nContext";
import { useI18n } from "@/context/I18nContext";
import { localeToBcp47 } from "@/locales";
import { getPurchases } from "@/services/account";
import { useRouter } from "expo-router";
import { ReceiptText } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PurchaseRow = {
  id?: string;
  payment_id?: string;
  voucher_name?: string;
  brand?: string;
  amount?: number;
  payment_method?: string;
  created_at?: number;
  purchased_at?: number;
  source?: string;
};

function formatPurchaseWhen(ts: number | undefined, locale: Locale): string | null {
  if (ts == null || Number.isNaN(ts)) return null;
  const ms = ts < 1e12 ? ts * 1000 : ts;
  try {
    return new Date(ms).toLocaleString(localeToBcp47(locale), {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return null;
  }
}

export default function SettlementScreen() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const tabs = useMemo(
    () => [
      { key: "all", label: t("userSettlement.tabAll") },
      { key: "store", label: t("userSettlement.tabStore") },
      { key: "marketplace", label: t("userSettlement.tabMarketplace") },
    ],
    [t],
  );
  const [activeTab, setActiveTab] = useState("all");
  const [purchases, setPurchases] = useState<PurchaseRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPurchases();
  }, [activeTab]);

  const loadPurchases = async () => {
    setLoading(true);
    try {
      const source = activeTab === "all" ? undefined : activeTab;
      const res = await getPurchases({ source: source as "store" | "marketplace" | "all" | undefined });
      const raw = res as { purchases?: PurchaseRow[]; items?: PurchaseRow[] };
      const list = raw.purchases ?? raw.items ?? [];
      setPurchases(Array.isArray(list) ? list : []);
    } catch {
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  const sourceLabel = (src?: string) => {
    if (src === "store") return t("userSettlement.tabStore");
    if (src === "marketplace") return t("userSettlement.tabMarketplace");
    return null;
  };

  const renderItem = ({ item }: { item: PurchaseRow }) => {
    const title = item.voucher_name || item.brand || "—";
    const subBrand = item.voucher_name && item.brand && item.brand !== item.voucher_name ? item.brand : null;
    const when = formatPurchaseWhen(item.purchased_at ?? item.created_at, locale);
    const src = sourceLabel(item.source);

    return (
      <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <View className="flex-row items-start justify-between gap-3 p-4">
          <View className="min-w-0 flex-1 flex-row gap-3">
            <View className="mt-0.5 h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ReceiptText size={22} color="#CE3630" strokeWidth={2} />
            </View>
            <View className="min-w-0 flex-1">
              <View className="flex-row flex-wrap items-center gap-2">
                <Text className="text-base font-bold leading-snug text-foreground" numberOfLines={2}>
                  {title}
                </Text>
                {src ? (
                  <View className="rounded-full border border-border bg-muted/60 px-2 py-0.5">
                    <Text className="text-xs font-semibold text-muted-foreground">{src}</Text>
                  </View>
                ) : null}
              </View>
              {subBrand ? (
                <Text className="mt-1 text-sm text-muted-foreground" numberOfLines={1}>
                  {subBrand}
                </Text>
              ) : null}
              <View className="mt-2 flex-row flex-wrap items-center gap-x-2 gap-y-1">
                {item.payment_method ? (
                  <Text className="text-sm font-medium text-muted-foreground">{item.payment_method}</Text>
                ) : null}
                {item.payment_method && when ? (
                  <Text className="text-sm text-muted-foreground">·</Text>
                ) : null}
                {when ? <Text className="text-sm text-muted-foreground">{when}</Text> : null}
              </View>
            </View>
          </View>
          <Text className="shrink-0 pt-0.5 text-lg font-bold text-primary">
            ₩{(item.amount ?? 0).toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <View >
        <PageHeader
          title={t("userSettlement.title")}
          onBackPress={() => router.navigate("/(user)/mypage")}
        />
        <ScrollableTabs tabs={tabs} activeTab={activeTab} onTabPress={setActiveTab} className="mb-1" />
      </View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item, index) => String(item.id ?? item.payment_id ?? `purchase-${index}`)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-base text-muted-foreground">{t("userSettlement.empty")}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
