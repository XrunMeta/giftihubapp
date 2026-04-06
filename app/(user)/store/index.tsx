import { BundleComposer } from "@/components/BundleComposer";
import { ScreenHeader } from "@/components/ScreenHeader";
import { getProductImageUrl, getStoreProducts, type Product } from "@/services/store";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SYM: Record<string, string> = { KRW: "₩", USD: "$", IDR: "Rp" };

const LIST_HORIZONTAL_PAD = 12;
const GRID_COLUMN_GAP = 12;

export default function StoreScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const gridItemWidth =
    (windowWidth - LIST_HORIZONTAL_PAD * 2 - GRID_COLUMN_GAP) / 2;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const loadProducts = async () => {
    try {
      const res = await getStoreProducts();
      setProducts(res.products);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand_name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderProduct = ({ item }: { item: Product }) => {
    const isFlexible = item.product_type === "flexible";
    const discount =
      !isFlexible && item.price > 0 && item.face_value > 0 && item.price < item.face_value
        ? Math.round((1 - item.price / item.face_value) * 100)
        : 0;
    const imgUri = getProductImageUrl(item);

    return (
      <Pressable
        style={{ width: gridItemWidth, marginBottom: 12 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
        onPress={() => router.push(`/(user)/store/${item.id}`)}
      >
        <View className="w-full h-32 bg-white p-3">
          {imgUri ? (
            <Image
              source={{ uri: imgUri }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-32 bg-muted items-center justify-center">
              <Text className="text-3xl">🎁</Text>
            </View>
          )}
        </View>
        <View className="p-3">
          <Text className="text-xs text-muted-foreground" numberOfLines={1}>
            {item.brand_name}
          </Text>
          <Text className="text-sm font-medium text-foreground" numberOfLines={2}>
            {item.name}
          </Text>
          <View className="flex-row items-center  mt-1 gap-1.5">
            {isFlexible ? (
              <Text className="text-base font-bold text-foreground">
                {SYM[item.flexible_currency ?? "KRW"] ?? "₩"}{(item.flexible_min ?? 0).toLocaleString()}~
              </Text>
            ) : (
              <>
                {discount > 0 && (

                  <Text className="text-base font-bold text-red-500">{discount}%</Text>
                )}
                <Text className="text-base font-bold text-foreground">
                  {SYM[item.display_currency] ?? "₩"}{(item.price ?? 0).toLocaleString()}
                </Text>
              </>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScreenHeader
        elevated
        title="스토어"
        search={{ value: search, onChangeText: setSearch }}
      />

      <FlatList
        style={{ flex: 1 }}
        data={filtered}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: GRID_COLUMN_GAP }}
        contentContainerStyle={{ paddingHorizontal: LIST_HORIZONTAL_PAD, paddingBottom: 20 }}
        ListHeaderComponent={<BundleComposer />}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="text-muted-foreground">상품이 없습니다.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
