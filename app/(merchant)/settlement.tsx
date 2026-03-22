import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiFetch } from "@/services/api";
import { Separator } from "@/components/ui/separator";

type DailyItem = {
  date: string;
  count: number;
  total_amount: number;
};

type SettlementResponse = {
  daily: DailyItem[];
  summary: {
    total_count: number;
    total_amount: number;
  };
};

type Period = "7d" | "30d" | "90d";

const PERIODS: { key: Period; label: string; days: number }[] = [
  { key: "7d", label: "7일", days: 7 },
  { key: "30d", label: "30일", days: 30 },
  { key: "90d", label: "90일", days: 90 },
];

export default function MerchantSettlementScreen() {
  const [data, setData] = useState<SettlementResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("30d");

  const fetchSettlement = async (p: Period) => {
    setLoading(true);
    try {
      const days = PERIODS.find((x) => x.key === p)!.days;
      const from = Math.floor(Date.now() / 1000) - days * 86400;
      const res = await apiFetch<SettlementResponse>(`/oth-path?from=${from}`);
      setData(res);
    } catch {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettlement(period);
  }, [period]);

  const renderItem = ({ item }: { item: DailyItem }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-sm font-medium text-foreground">{item.date}</Text>
          <Text className="text-xs text-muted-foreground mt-0.5">{item.count}건</Text>
        </View>
        <Text className="text-base font-bold text-foreground">₩{item.total_amount?.toLocaleString()}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">정산</Text>
      </View>

      {}
      <View className="flex-row mx-4 mb-3 gap-2">
        {PERIODS.map((p) => (
          <TouchableOpacity
            key={p.key}
            onPress={() => setPeriod(p.key)}
            className={`flex-1 py-2 rounded-lg border ${
              period === p.key ? "bg-primary border-primary" : "bg-card border-border"
            }`}
          >
            <Text
              className={`text-center text-sm font-medium ${
                period === p.key ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {}
      {data && !loading && (
        <View className="mx-4 mb-3 bg-card rounded-xl border border-border p-4">
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-xs text-muted-foreground">총 건수</Text>
              <Text className="text-xl font-bold text-foreground mt-1">
                {data.summary.total_count}건
              </Text>
            </View>
            <Separator orientation="vertical" />
            <View className="items-center flex-1">
              <Text className="text-xs text-muted-foreground">총 금액</Text>
              <Text className="text-xl font-bold text-primary mt-1">
                ₩{data.summary.total_amount?.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      )}

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={data?.daily ?? []}
          keyExtractor={(item) => item.date}
          renderItem={renderItem}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">정산 내역이 없습니다.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
