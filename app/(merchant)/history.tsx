import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiFetch } from "@/services/api";
import { format } from "date-fns";

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

const LIMIT = 20;

export default function MerchantHistoryScreen() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchHistory = useCallback(async (p: number, reset = false) => {
    try {
      const res = await apiFetch<HistoryResponse>(`/oth-path?page=${p}&limit=${LIMIT}`);
      const newItems = res.history;
      setItems((prev) => reset ? newItems : [...prev, ...newItems]);
      setHasMore(newItems.length === LIMIT);
      setPage(p);
    } catch {

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory(1, true);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchHistory(1, true);
  };

  const handleEndReached = () => {
    if (!loading && hasMore) {
      fetchHistory(page + 1);
    }
  };

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border p-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-xs text-muted-foreground">{item.brand ?? "-"}</Text>
          <Text className="text-base font-semibold text-foreground">{item.name ?? "알 수 없음"}</Text>
          {item.user_name && (
            <Text className="text-xs text-muted-foreground mt-0.5">사용자: {item.user_name}</Text>
          )}
        </View>
        <View className="items-end">
          <Text className="text-base font-bold text-primary">₩{item.amount?.toLocaleString()}</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            {format(new Date(item.created_at * 1000), "MM.dd HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">사용 이력</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-muted-foreground">사용 이력이 없습니다.</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && items.length > 0 ? (
            <ActivityIndicator size="small" color="#CE3630" style={{ padding: 16 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
