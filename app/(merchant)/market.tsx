import React, { useRef, useState, useCallback } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, ScrollView } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Package } from "lucide-react-native";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { resolveImageUrl } from "@/lib/image";
import {
  getMarketplaceListings,
  type MarketplaceListing,
} from "@/services/marketplace";

const CATEGORY_TABS = [
  { key: "all", label: "전체" },
  { key: "set", label: "구성상품" },
];

export default function MerchantMarketScreen() {
  const router = useRouter();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const listRef = useRef<FlatList>(null);

  const loadListings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMarketplaceListings({ q: search || undefined });
      let items = res.listings;
      if (activeTab === "set") {
        items = items.filter((l: any) => !!l.set_id);
      }
      setListings(items);
    } catch {
      console.error("Failed to load marketplace listings");
    } finally {
      setLoading(false);
    }
  }, [activeTab, search]);

  useFocusEffect(
    useCallback(() => {
      loadListings();
    }, [loadListings])
  );

  const handleDetail = (item: MarketplaceListing) => {
    router.push({
      pathname: "/(merchant)/market-detail",
      params: { id: item.id },
    });
  };

  const renderListing = ({ item }: { item: MarketplaceListing }) => {
    const imgUri = resolveImageUrl(item.thumb_url, item.image_url, item.brand_logo);
    const isSet = !!(item as any).set_id;
    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-border p-3 flex-row"
        onPress={() => handleDetail(item)}
      >
        {imgUri ? (
          <Image source={{ uri: imgUri }} className="w-16 h-16 rounded-lg" resizeMode="cover" />
        ) : (
          <View className="w-16 h-16 rounded-lg bg-muted items-center justify-center">
            {isSet ? <Package size={24} color="#CE3630" /> : <Text className="text-2xl">🎁</Text>}
          </View>
        )}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <View className="flex-row items-center gap-1">
                <Text className="text-xs text-muted-foreground">{item.brand}</Text>
                {isSet && (
                  <View className="bg-primary/10 rounded px-1.5 py-0.5">
                    <Text className="text-[10px] font-medium text-primary">구성상품</Text>
                  </View>
                )}
              </View>
              <Text className="text-sm font-semibold text-foreground mt-0.5" numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            {item.discount > 0 && (
              <Badge variant="destructive" label={`${item.discount}%`} />
            )}
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-baseline gap-2">
              <Text className="text-base font-bold text-foreground">
                ₩{item.selling_price.toLocaleString()}
              </Text>
              <Text className="text-xs text-muted-foreground line-through">
                ₩{item.original_price.toLocaleString()}
              </Text>
            </View>
            <Text className="text-xs text-muted-foreground">{item.seller_name}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const listHeader = (
    <>
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
        className="mb-3"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={{ alignSelf: "flex-start" }}
              className={cn(
                "rounded-full px-4 py-2",
                isActive ? "bg-primary" : "bg-secondary",
              )}
            >
              <Text
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <FlatList
        ref={listRef}
        data={loading ? [] : listings}
        renderItem={renderListing}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          loading ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">판매 중인 상품이 없습니다.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
