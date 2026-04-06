import { ScreenHeader } from "@/components/ScreenHeader";
import { Badge } from "@/components/ui/badge";
import { resolveImageUrl } from "@/lib/image";
import { cn } from "@/lib/utils";
import {
  getMarketplaceListings,
  type MarketplaceCategory,
  type MarketplaceListing,
} from "@/services/marketplace";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const listRef = useRef<FlatList>(null);

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

  useFocusEffect(
    useCallback(() => {
      loadListings();
    }, [loadListings])
  );

  const renderListing = ({ item }: { item: MarketplaceListing }) => {
    const imgUri = resolveImageUrl(item.thumb_url, item.image_url, item.brand_logo);
    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-border p-3 flex-row"
        onPress={() => router.push(`/(user)/oth-path${item.id}`)}
      >
        {imgUri ? (
          <Image source={{ uri: imgUri }} className="w-16 h-16 rounded-lg" resizeMode="contain" />
        ) : (
          <View className="w-16 h-16 rounded-lg bg-muted items-center justify-center">
            <Text className="text-2xl">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      <ScreenHeader
        elevated
        title="중고마켓"
        search={{ value: search, onChangeText: setSearch }}
        bottom={
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
        }
      />
      <FlatList
        ref={listRef}
        style={{ flex: 1 }}
        data={loading ? [] : listings}
        renderItem={renderListing}
        keyExtractor={(item) => item.id}
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
