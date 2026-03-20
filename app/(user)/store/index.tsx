import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getStoreProducts, type Product } from "@/services/store";

export default function StoreScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

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
    const discount = item.price < item.face_value
      ? Math.round((1 - item.price / item.face_value) * 100)
      : 0;

    return (
      <Pressable
        className="flex-1 m-1.5 bg-card rounded-xl border border-border overflow-hidden"
        onPress={() => router.push(`/(user)/store/${item.id}`)}
      >
        <Image
          source={{ uri: item.thumb_url || item.image_url }}
          className="w-full h-32"
          resizeMode="cover"
        />
        <View className="p-3">
          <Text className="text-xs text-muted-foreground" numberOfLines={1}>
            {item.brand_name}
          </Text>
          <Text className="text-sm font-medium text-foreground mt-0.5" numberOfLines={2}>
            {item.name}
          </Text>
          <View className="flex-row items-center mt-2 gap-1.5">
            {discount > 0 && (
              <Badge variant="destructive" label={`${discount}%`} />
            )}
            <Text className="text-base font-bold text-foreground">
              ₩{item.price.toLocaleString()}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

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
        <Text className="text-2xl font-bold text-foreground">스토어</Text>
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

      <FlatList
        data={filtered}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="text-muted-foreground">상품이 없습니다.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
