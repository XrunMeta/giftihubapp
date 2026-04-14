import { ScreenHeader } from "@/components/ScreenHeader";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/context/I18nContext";
import { formatPrice } from "@/lib/currency";
import { resolveImageUrl } from "@/lib/image";
import { cn } from "@/lib/utils";
import {
  getKeywords,
  getMarketplaceListings,
  type Keyword,
  type MarketplaceListing,
} from "@/services/marketplace";
import type { Locale } from "@/locales/types";
import { useFocusEffect, useRouter } from "expo-router";
import { Package } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function kwLabel(kw: Keyword, locale: Locale): string {
  if (locale === "en" && kw.name_en) return kw.name_en;
  if (locale === "id" && kw.name_id) return kw.name_id;
  return kw.name;
}

export default function MarketplaceScreen() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeKeyword, setActiveKeyword] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const listRef = useRef<FlatList>(null);

  useFocusEffect(
    useCallback(() => {
      getKeywords()
        .then((res) => setKeywords(res.keywords))
        .catch(() => {});
    }, []),
  );

  const loadListings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMarketplaceListings({
        keyword: activeKeyword ?? undefined,
        q: search || undefined,
      });
      setListings(res.listings);
    } catch {
      console.error("Failed to load marketplace listings");
    } finally {
      setLoading(false);
    }
  }, [activeKeyword, search]);

  useFocusEffect(
    useCallback(() => {
      loadListings();
    }, [loadListings])
  );

  const renderListing = ({ item }: { item: MarketplaceListing }) => {
    const imgUri = resolveImageUrl(item.thumb_url, item.image_url, item.brand_logo);
    const isBundle = !!item.set_id;

    if (isBundle) {
      return (
        <Pressable
          className="mx-4 mb-3 bg-card rounded-xl border border-primary/30 p-3"
          onPress={() => router.push(`/(user)/oth-path${item.id}`)}
        >
          <View className="flex-row items-center mb-2 gap-2">
            <View className="w-7 h-7 rounded-lg bg-primary/10 items-center justify-center">
              <Package size={16} color="#CE3630" />
            </View>
            <Text className="text-sm font-semibold text-primary flex-1">
              {t("myGifti.list.bundleTitle").replace("{{count}}", String(item.set_count ?? ""))}
            </Text>
            {item.discount > 0 && (
              <Badge variant="destructive" label={`${item.discount}%`} />
            )}
          </View>
          <View className="flex-row">
            {imgUri ? (
              <Image source={{ uri: imgUri }} className="w-14 h-14 rounded-lg" resizeMode="contain" />
            ) : (
              <View className="w-14 h-14 rounded-lg bg-muted items-center justify-center">
                <Text className="text-xl">🎁</Text>
              </View>
            )}
            <View className="flex-1 ml-3">
              <Text className="text-xs text-muted-foreground">{item.brand}</Text>
              <Text className="text-sm font-semibold text-foreground mt-0.5" numberOfLines={1}>
                {item.name}
              </Text>
              <View className="flex-row justify-between items-center mt-1">
                <View className="flex-row items-baseline gap-1">
                  <Text className="text-base font-bold text-foreground">
                    {formatPrice(item.selling_price, item.currency)}
                  </Text>
                  <Text className="text-xs text-muted-foreground line-through">
                    {formatPrice(item.original_price, item.currency)}
                  </Text>
                </View>
                <Text className="text-xs text-muted-foreground">{item.seller_name}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      );
    }

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
                {formatPrice(item.selling_price, item.currency)}
              </Text>
              <Text className="text-xs text-muted-foreground line-through">
                {formatPrice(item.original_price, item.currency)}
              </Text>
            </View>
            <Text className="text-xs text-muted-foreground">{item.seller_name}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader
        elevated
        title={t("userMarketplace.list.title")}
        search={{
          value: search,
          onChangeText: setSearch,
          placeholder: t("userMarketplace.list.searchPlaceholder"),
        }}
        bottom={
          keywords.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
              className="mb-3"
            >
              <Pressable
                onPress={() => setActiveKeyword(null)}
                style={{ alignSelf: "flex-start" }}
                className={cn(
                  "rounded-full px-4 py-2",
                  activeKeyword === null ? "bg-primary" : "bg-secondary",
                )}
              >
                <Text
                  className={cn(
                    "text-sm font-medium",
                    activeKeyword === null ? "text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  {t("userMarketplace.list.tabAll")}
                </Text>
              </Pressable>
              {keywords.map((kw) => {
                const isActive = activeKeyword === kw.id;
                return (
                  <Pressable
                    key={kw.id}
                    onPress={() => setActiveKeyword(isActive ? null : kw.id)}
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
                      {kwLabel(kw, locale)}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          ) : undefined
        }
      />
      <FlatList
        ref={listRef}
        style={{ flex: 1 }}
        data={loading ? [] : listings}
        renderItem={renderListing}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          loading ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">{t("userMarketplace.list.empty")}</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
