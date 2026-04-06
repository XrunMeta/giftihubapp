import { ScreenHeader } from "@/components/ScreenHeader";
import { Separator } from "@/components/ui/separator";
import { apiFetch } from "@/services/api";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
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

type HistoryItem = {
  id: string;
  type: string;
  amount: number;
  created_at: number;
  brand: string | null;
  name: string | null;
  face_value: number | null;
  user_name: string | null;
};
type HistoryResponse = {
  history: HistoryItem[];
  total: number;
  page: number;
  limit: number;
};

type SettlementRecord = {
  id: string; period_from: string; period_to: string; type: string;
  total_amount: number; fee_amount: number; net_amount: number;
  status: string; tx_hash: string | null; bank_ref: string | null;
  memo: string | null; item_count: number; created_at: number; settled_at: number | null;
};

type Tab = "settlement" | "history" | "records";
type Period = "7d" | "30d" | "90d";

const PERIODS: { key: Period; label: string; days: number }[] = [
  { key: "7d", label: "7일", days: 7 },
  { key: "30d", label: "30일", days: 30 },
  { key: "90d", label: "90일", days: 90 },
];

const LIMIT = 20;

export default function MerchantSettlementScreen() {
  const [tab, setTab] = useState<Tab>("settlement");

  const [settlData, setSettlData] = useState<SettlementResponse | null>(null);
  const [settlLoading, setSettlLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("30d");

  const [histItems, setHistItems] = useState<HistoryItem[]>([]);
  const [histLoading, setHistLoading] = useState(true);
  const [histRefreshing, setHistRefreshing] = useState(false);
  const [histPage, setHistPage] = useState(1);
  const [histHasMore, setHistHasMore] = useState(true);

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
      const days = PERIODS.find((x) => x.key === p)!.days;
      const from = Math.floor(Date.now() / 1000) - days * 86400;
      const res = await apiFetch<SettlementResponse>(`/oth-path?from=${from}`);
      setSettlData(res);
    } catch {

    } finally {
      setSettlLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "settlement") fetchSettlement(period);
  }, [period, tab, fetchSettlement]);

  const fetchHistory = useCallback(async (p: number, reset = false) => {
    try {
      const res = await apiFetch<HistoryResponse>(`/oth-path?page=${p}&limit=${LIMIT}`);
      setHistItems((prev) => (reset ? res.history : [...prev, ...res.history]));
      setHistHasMore(res.history.length === LIMIT);
      setHistPage(p);
    } catch {

    } finally {
      setHistLoading(false);
      setHistRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "history") {
      setHistLoading(true);
      fetchHistory(1, true);
    }
  }, [tab, fetchHistory]);

  const renderDaily = ({ item }: { item: DailyItem }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-sm font-medium text-foreground">{item.date}</Text>
          <Text className="text-xs text-muted-foreground mt-0.5">{item.count}건</Text>
        </View>
        <Text className="text-base font-bold text-foreground">
          ₩{item.total_amount?.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  const renderHistory = ({ item }: { item: HistoryItem }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border p-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-xs text-muted-foreground">{item.brand ?? "-"}</Text>
          <Text className="text-base font-semibold text-foreground">
            {item.name ?? "알 수 없음"}
          </Text>
          {item.user_name && (
            <Text className="text-xs text-muted-foreground mt-0.5">
              사용자: {item.user_name}
            </Text>
          )}
        </View>
        <View className="items-end">
          <Text className="text-base font-bold text-primary">
            ₩{item.amount?.toLocaleString()}
          </Text>
          <Text className="text-xs text-muted-foreground mt-1">
            {format(new Date(item.created_at * 1000), "MM.dd HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );

  const STATUS_COLORS: Record<string, string> = {
    pending: "#f59e0b",
    settling: "#3b82f6",
    settled: "#22c55e",
    rejected: "#ef4444",
  };
  const STATUS_LABELS: Record<string, string> = {
    pending: "대기", settling: "정산중", settled: "완료", rejected: "거절",
  };

  const renderRecord = ({ item }: { item: SettlementRecord }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border p-4">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-xs text-muted-foreground">
            {item.period_from} ~ {item.period_to}
          </Text>
          <Text className="text-sm font-semibold text-foreground mt-0.5">
            {item.type === "bundle" ? "묶음" : "일반"} · {item.item_count}건
          </Text>
        </View>
        <View className="px-2 py-1 rounded-full" style={{ backgroundColor: (STATUS_COLORS[item.status] ?? "#737373") + "20" }}>
          <Text className="text-xs font-medium" style={{ color: STATUS_COLORS[item.status] ?? "#737373" }}>
            {STATUS_LABELS[item.status] ?? item.status}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-xs text-muted-foreground">총액</Text>
        <Text className="text-xs text-foreground font-medium">₩{item.total_amount?.toLocaleString()}</Text>
      </View>
      <View className="flex-row justify-between mt-0.5">
        <Text className="text-xs text-muted-foreground">수수료</Text>
        <Text className="text-xs text-muted-foreground">-₩{item.fee_amount?.toLocaleString()}</Text>
      </View>
      <View className="flex-row justify-between mt-0.5">
        <Text className="text-xs text-muted-foreground">실수령</Text>
        <Text className="text-sm font-bold text-primary">₩{item.net_amount?.toLocaleString()}</Text>
      </View>
      {(item.tx_hash || item.bank_ref) && (
        <Text className="text-xs text-muted-foreground mt-2" numberOfLines={1}>
          {item.tx_hash ? `TX: ${item.tx_hash}` : `은행: ${item.bank_ref}`}
        </Text>
      )}
    </View>
  );

  const TabSelector = () => (
    <View className="flex-row mx-4 mb-3 gap-2">
      {(["settlement", "history", "records"] as Tab[]).map((t) => (
        <TouchableOpacity
          key={t}
          onPress={() => setTab(t)}
          className={`flex-1 py-3 rounded-lg border ${tab === t ? "bg-primary border-primary" : "bg-card border-border"
            }`}
        >
          <Text
            className={`text-center text-sm font-medium ${tab === t ? "text-primary-foreground" : "text-foreground"
              }`}
          >
            {t === "settlement" ? "정산 집계" : t === "history" ? "사용 이력" : "정산현황"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title="정산" bottom={<TabSelector />} />

      {tab === "settlement" ? (
        <>
          {}
          <View className="flex-row mx-4 mb-3 gap-2">
            {PERIODS.map((p) => (
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
                  <Text className="text-xs text-muted-foreground">총 건수</Text>
                  <Text className="text-xl font-bold text-foreground mt-1">
                    {settlData.summary.total_count}건
                  </Text>
                </View>
                <Separator orientation="vertical" />
                <View className="items-center flex-1">
                  <Text className="text-xs text-muted-foreground">총 금액</Text>
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
              data={settlData?.daily ?? []}
              keyExtractor={(item) => item.date}
              renderItem={renderDaily}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-muted-foreground">정산 내역이 없습니다.</Text>
                </View>
              }
            />
          )}
        </>
      ) : tab === "history" ? (
        histLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#CE3630" />
          </View>
        ) : (
          <FlatList
            data={histItems}
            keyExtractor={(item) => item.id}
            renderItem={renderHistory}
            onEndReached={() => {
              if (!histLoading && histHasMore) fetchHistory(histPage + 1);
            }}
            onEndReachedThreshold={0.3}
            onRefresh={() => {
              setHistRefreshing(true);
              fetchHistory(1, true);
            }}
            refreshing={histRefreshing}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center py-20">
                <Text className="text-muted-foreground">사용 이력이 없습니다.</Text>
              </View>
            }
            ListFooterComponent={
              histHasMore && histItems.length > 0 ? (
                <ActivityIndicator size="small" color="#CE3630" style={{ padding: 16 }} />
              ) : null
            }
          />
        )
      ) : (
        <>
          {}
          <View className="flex-row mx-4 mb-3 gap-2">
            {[{ key: "", label: "전체" }, { key: "settling", label: "정산중" }, { key: "settled", label: "완료" }].map((f) => (
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
              data={records}
              keyExtractor={(item) => item.id}
              renderItem={renderRecord}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-muted-foreground">정산 내역이 없습니다.</Text>
                </View>
              }
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
