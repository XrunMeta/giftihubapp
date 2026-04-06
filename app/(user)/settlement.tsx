import { PageHeader } from "@/components/PageHeader";
import { ScrollableTabs } from "@/components/ui/scrollable-tabs";
import { getPurchases } from "@/services/account";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TABS = [
  { key: "all", label: "전체" },
  { key: "store", label: "스토어" },
  { key: "marketplace", label: "중고마켓" },
];

export default function SettlementScreen() {
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
      const res = await getPurchases({ source: source as any });
      setPurchases((res as any).purchases || []);
    } catch {

    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="구매 이력" />
      <ScrollableTabs tabs={TABS} activeTab={activeTab} onTabPress={setActiveTab} className="mb-3" />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mx-4 mb-2 bg-card rounded-lg border border-border p-3">
              <View className="flex-row justify-between">
                <Text className="text-sm font-medium text-foreground">{item.voucher_name || item.brand}</Text>
                <Text className="text-sm font-bold text-foreground">₩{item.amount?.toLocaleString()}</Text>
              </View>
              <Text className="text-xs text-muted-foreground mt-1">{item.payment_method}</Text>
            </View>
          )}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-muted-foreground">구매 이력이 없습니다.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
