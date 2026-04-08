import { ScreenHeader } from "@/components/ScreenHeader";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DailyItem = { date: string; count: number; total_amount: number };
type SettlementResponse = {
  daily: DailyItem[];
  summary: { total_count: number; total_amount: number };
};

type SettlementRecord = {
  id: string; period_from: string; period_to: string; type: string;
  total_amount: number; fee_amount: number; net_amount: number;
  status: string; tx_hash: string | null; bank_ref: string | null;
  memo: string | null; item_count: number; created_at: number; settled_at: number | null;
};

type Tab = "settlement" | "records";
type Period = "7d" | "30d" | "90d";

export default function MerchantSettlementScreen() {
  const { t } = useI18n();
  const periods = useMemo(
    () =>
      [
        { key: "7d" as const, label: t("merchant.settlement.days7"), days: 7 },
        { key: "30d" as const, label: t("merchant.settlement.days30"), days: 30 },
        { key: "90d" as const, label: t("merchant.settlement.days90"), days: 90 },
      ] as const,
    [t],
  );
  const recordFilters = useMemo(
    () =>
      [
        { key: "", label: t("merchant.settlement.filterAll") },
        { key: "settling", label: t("merchant.settlement.filterSettling") },
        { key: "settled", label: t("merchant.settlement.filterSettled") },
      ] as const,
    [t],
  );
  const [tab, setTab] = useState<Tab>("settlement");

  const [settlData, setSettlData] = useState<SettlementResponse | null>(null);
  const [settlLoading, setSettlLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("30d");

  const [records, setRecords] = useState<SettlementRecord[]>([]);
  const [recLoading, setRecLoading] = useState(false);
  const [recFilter, setRecFilter] = useState<string>("");

  const loadRecords = useCallback(async () => {
    setRecLoading(true);
    try {
      const params = recFilter ? `?status=${recFilter}` : "";
      const data = await apiFetch<{ records: SettlementRecord[] }>(`/oth-path${params}`);
      setRecords(data.records);
    } catch { }
    setRecLoading(false);
  }, [recFilter]);

  useEffect(() => { if (tab === "records") loadRecords(); }, [tab, recFilter]);

  const fetchSettlement = useCallback(async (p: Period) => {
    setSettlLoading(true);
    try {
      const days = periods.find((x) => x.key === p)!.days;
      const from = Math.floor(Date.now() / 1000) - days * 86400;
      const res = await apiFetch<SettlementResponse>(`/oth-path?from=${from}`);
      setSettlData(res);
    } catch {

    } finally {
      setSettlLoading(false);
    }
  }, [periods]);

  useEffect(() => {
    if (tab === "settlement") fetchSettlement(period);
  }, [period, tab, fetchSettlement]);

  const renderDaily = ({ item }: { item: DailyItem }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-sm font-medium text-foreground">{item.date}</Text>
          <Text className="text-xs text-muted-foreground mt-0.5">
            {item.count}
            {t("merchant.settlement.countSuffix")}
          </Text>
        </View>
        <Text className="text-base font-bold text-foreground">
          ₩{item.total_amount?.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  const STATUS_COLORS: Record<string, string> = {
    pending: "#f59e0b",
    settling: "#3b82f6",
    settled: "#22c55e",
    rejected: "#ef4444",
  };
  const recordStatusLabel = (s: string) =>
    ({
      pending: t("merchant.settlement.recPending"),
      settling: t("merchant.settlement.recSettling"),
      settled: t("merchant.settlement.recSettled"),
      rejected: t("merchant.settlement.recRejected"),
    } as Record<string, string>)[s] ?? s;

  const renderRecord = ({ item }: { item: SettlementRecord }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border p-4">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-xs text-muted-foreground">
            {item.period_from} ~ {item.period_to}
          </Text>
          <Text className="text-sm font-semibold text-foreground mt-0.5">
            {item.type === "bundle" ? t("merchant.settlement.typeBundle") : t("merchant.settlement.typeNormal")} · {item.item_count}
            {t("merchant.settlement.countSuffix")}
          </Text>
        </View>
        <View className="px-2 py-1 rounded-full" style={{ backgroundColor: (STATUS_COLORS[item.status] ?? "#737373") + "20" }}>
          <Text className="text-xs font-medium" style={{ color: STATUS_COLORS[item.status] ?? "#737373" }}>
            {recordStatusLabel(item.status)}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-xs text-muted-foreground">{t("merchant.settlement.totalLabel")}</Text>
        <Text className="text-xs text-foreground font-medium">₩{item.total_amount?.toLocaleString()}</Text>
      </View>
      <View className="flex-row justify-between mt-0.5">
        <Text className="text-xs text-muted-foreground">{t("merchant.settlement.feeLabel")}</Text>
        <Text className="text-xs text-muted-foreground">-₩{item.fee_amount?.toLocaleString()}</Text>
      </View>
      <View className="flex-row justify-between mt-0.5">
        <Text className="text-xs text-muted-foreground">{t("merchant.settlement.netLabel")}</Text>
        <Text className="text-sm font-bold text-primary">₩{item.net_amount?.toLocaleString()}</Text>
      </View>
      {(item.tx_hash || item.bank_ref) && (
        <Text className="text-xs text-muted-foreground mt-2" numberOfLines={1}>
          {item.tx_hash ? `${t("merchant.settlement.txPrefix")}${item.tx_hash}` : `${t("merchant.settlement.bankPrefix")}${item.bank_ref}`}
        </Text>
      )}
    </View>
  );

  const TabSelector = () => (
    <View className="flex-row mx-4 mb-3 gap-2">
      {(["settlement", "records"] as Tab[]).map((subTab) => (
        <TouchableOpacity
          key={subTab}
          onPress={() => setTab(subTab)}
          className={`flex-1 py-3 rounded-lg border ${tab === subTab ? "bg-primary border-primary" : "bg-card border-border"
            }`}
        >
          <Text
            className={`text-center text-sm font-medium ${tab === subTab ? "text-primary-foreground" : "text-foreground"
              }`}
          >
            {subTab === "settlement"
              ? t("merchant.settlement.tabSummary")
              : t("merchant.settlement.tabRecords")}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={t("merchant.settlement.title")} bottom={<TabSelector />} />

      {tab === "settlement" ? (
        <>
          {}
          <View className="flex-row mx-4 mb-3 gap-2">
            {periods.map((p) => (
              <TouchableOpacity
                key={p.key}
                onPress={() => setPeriod(p.key)}
                className={`flex-1 py-3 rounded-lg border ${period === p.key ? "bg-primary border-primary" : "bg-card border-border"
                  }`}
              >
                <Text
                  className={`text-center text-sm font-medium ${period === p.key ? "text-primary-foreground" : "text-foreground"
                    }`}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {}
          {settlData && !settlLoading && (
            <View className="mx-4 mb-3 bg-card rounded-xl border border-border p-4">
              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <Text className="text-xs text-muted-foreground">{t("merchant.settlement.totalCountLabel")}</Text>
                  <Text className="text-xl font-bold text-foreground mt-1">
                    {settlData.summary.total_count}
                    {t("merchant.settlement.countSuffix")}
                  </Text>
                </View>
                <Separator orientation="vertical" />
                <View className="items-center flex-1">
                  <Text className="text-xs text-muted-foreground">{t("merchant.settlement.totalAmountLabel")}</Text>
                  <Text className="text-xl font-bold text-primary mt-1">
                    ₩{settlData.summary.total_amount?.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {settlLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={settlData?.daily ?? []}
              keyExtractor={(item) => item.date}
              renderItem={renderDaily}
              contentContainerStyle={{ paddingBottom: 0 }}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-muted-foreground">{t("merchant.settlement.emptyDaily")}</Text>
                </View>
              }
            />
          )}
        </>
      ) : (
        <>
          {}
          <View className="flex-row mx-4 mb-3 gap-2">
            {recordFilters.map((f) => (
              <TouchableOpacity
                key={f.key}
                onPress={() => setRecFilter(f.key)}
                className={`px-3 py-1.5 rounded-full border ${recFilter === f.key ? "bg-primary border-primary" : "bg-card border-border"
                  }`}
              >
                <Text className={`text-xs font-medium ${recFilter === f.key ? "text-primary-foreground" : "text-foreground"}`}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {recLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={records}
              keyExtractor={(item) => item.id}
              renderItem={renderRecord}
              contentContainerStyle={{ paddingBottom: 0 }}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-muted-foreground">{t("merchant.settlement.emptyRecords")}</Text>
                </View>
              }
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
