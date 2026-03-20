import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";
import { Input } from "@/components/ui/input";
import { ScrollableTabs } from "@/components/ui/scrollable-tabs";
import { Badge } from "@/components/ui/badge";
import {
  getMarketplaceListings,
  type MarketplaceListing,
  type MarketplaceCategory,
} from "@/services/marketplace";

const CATEGORY_TABS = [
  { key: "all", label: "전체" },
  { key: "food", label: "식품" },
  { key: "culture", label: "문화" },
  { key: "convenience", label: "편의점" },
  { key: "beauty", label: "뷰티" },
  { key: "etc", label: "기타" },
];

export default function MarketplaceScreen() {
  const router = useRouter();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const loadListings = useCallback(async () => {
    setLoading(true);
    try {
      const category = activeTab === "all" ? undefined : (activeTab as MarketplaceCategory);
      const res = await getMarketplaceListings({ category, q: search || undefined });
      setListings(res.listings);
    } catch {
      console.error("Failed to load marketplace listings");
    } finally {
      setLoading(false);
    }
  }, [activeTab, search]);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  const renderListing = ({ item }: { item: MarketplaceListing }) => (
    <Pressable
      className="mx-4 mb-3 bg-card rounded-xl border border-border p-4"
      onPress={() => router.push(`/(user)/oth-path${item.id}`)}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-xs text-muted-foreground">{item.brand}</Text>
          <Text className="text-sm font-semibold text-foreground mt-0.5" numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        {item.discount > 0 && (
          <Badge variant="destructive" label={`${item.discount}%`} />
        )}
      </View>
      <View className="flex-row justify-between items-center mt-3">
        <View className="flex-row items-baseline gap-2">
          <Text className="text-lg font-bold text-foreground">
            ₩{item.selling_price.toLocaleString()}
          </Text>
          <Text className="text-xs text-muted-foreground line-through">
            ₩{item.original_price.toLocaleString()}
          </Text>
        </View>
        <Text className="text-xs text-muted-foreground">{item.seller_name}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">중고마켓</Text>
      </View>

      <View className="px-4 mb-3">
        <View className="flex-row items-center bg-secondary rounded-lg px-3">
          <Search size={18} color="#737373" />
          <Input
            className="flex-1 border-0 bg-transparent"
            placeholder="브랜드 또는 상품명 검색"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollableTabs tabs={CATEGORY_TABS} activeTab={activeTab} onTabPress={setActiveTab} className="mb-3" />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={listings}
          renderItem={renderListing}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-muted-foreground">판매 중인 상품이 없습니다.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
