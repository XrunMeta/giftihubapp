import { ScreenHeader } from "@/components/ScreenHeader";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { Calendar, ReceiptText } from "lucide-react-native";
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
    <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="min-w-0 flex-1 flex-row items-center gap-3">
          <View className="h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
            <Calendar size={20} color="#737373" strokeWidth={2} />
          </View>
          <View className="min-w-0 flex-1">
            <Text className="text-base font-bold text-foreground" numberOfLines={1}>
              {item.date}
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              {item.count}
              {t("merchant.settlement.countSuffix")}
            </Text>
          </View>
        </View>
        <Text className="ml-2 shrink-0 text-lg font-bold text-primary">
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
    <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <View className="flex-row items-start justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3">
        <View className="min-w-0 flex-1 flex-row items-start gap-3">
          <View className="mt-0.5 h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
            <ReceiptText size={18} color="#737373" strokeWidth={2} />
          </View>
          <View className="min-w-0 flex-1">
            <Text className="text-sm font-medium leading-5 text-muted-foreground">
              {item.period_from} ~ {item.period_to}
            </Text>
            <Text className="mt-1.5 text-base font-bold text-foreground">
              {item.type === "bundle" ? t("merchant.settlement.typeBundle") : t("merchant.settlement.typeNormal")} ·{" "}
              {item.item_count}
              {t("merchant.settlement.countSuffix")}
            </Text>
          </View>
        </View>
        <View
          className="shrink-0 rounded-full px-2.5 py-1.5"
          style={{ backgroundColor: (STATUS_COLORS[item.status] ?? "#737373") + "22" }}
        >
          <Text className="text-sm font-semibold" style={{ color: STATUS_COLORS[item.status] ?? "#737373" }}>
            {recordStatusLabel(item.status)}
          </Text>
        </View>
      </View>

      <View className="gap-2.5 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-muted-foreground">{t("merchant.settlement.totalLabel")}</Text>
          <Text className="text-sm font-semibold text-foreground">₩{item.total_amount?.toLocaleString()}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-muted-foreground">{t("merchant.settlement.feeLabel")}</Text>
          <Text className="text-sm font-semibold text-red-600">−₩{item.fee_amount?.toLocaleString()}</Text>
        </View>
        <View className="h-px bg-border" />
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-medium text-foreground">{t("merchant.settlement.netLabel")}</Text>
          <Text className="text-lg font-bold text-primary">₩{item.net_amount?.toLocaleString()}</Text>
        </View>
      </View>

      {(item.tx_hash || item.bank_ref) && (
        <View className="border-t border-border bg-muted/20 px-4 py-2.5">
          <Text className="text-xs leading-5 text-muted-foreground" numberOfLines={2}>
            {item.tx_hash
              ? `${t("merchant.settlement.txPrefix")}${item.tx_hash}`
              : `${t("merchant.settlement.bankPrefix")}${item.bank_ref}`}
          </Text>
        </View>
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
            className={`text-center font-medium ${tab === subTab ? "text-primary-foreground" : "text-foreground"
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
          <SegmentedControl<Period>
            className="mx-4 mb-3"
            value={period}
            onChange={setPeriod}
            options={periods.map((p) => ({ value: p.key, label: p.label }))}
          />

          {}
          {settlData && !settlLoading && (
            <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm p-5">
              <View className="flex-row justify-between">
                <View className="flex-1 items-center">
                  <Text className="text-sm font-medium text-muted-foreground">
                    {t("merchant.settlement.totalCountLabel")}
                  </Text>
                  <Text className="mt-2 text-2xl font-bold text-foreground">
                    {settlData.summary.total_count}
                    {t("merchant.settlement.countSuffix")}
                  </Text>
                </View>
                <Separator orientation="vertical" />
                <View className="flex-1 items-center">
                  <Text className="text-sm font-medium text-muted-foreground">
                    {t("merchant.settlement.totalAmountLabel")}
                  </Text>
                  <Text className="mt-2 text-2xl font-bold text-primary">
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
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-base text-muted-foreground">{t("merchant.settlement.emptyDaily")}</Text>
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
                <Text className={`text-sm font-medium ${recFilter === f.key ? "text-primary-foreground" : "text-foreground"}`}>
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
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-base text-muted-foreground">{t("merchant.settlement.emptyRecords")}</Text>
                </View>
              }
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
