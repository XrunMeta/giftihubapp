import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Minus, Plus } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { useCart } from "@/context/CartContext";
import { getProductDetail, getProductFullImageUrl, type Product, type ProductDetailResponse } from "@/services/store";

const CUR_SYM: Record<string, string> = { KRW: "₩", USD: "$", IDR: "Rp" };

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [flexAmount, setFlexAmount] = useState("");

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductDetail(id!);
      setProduct(data.product);
    } catch {
      Alert.alert("오류", "상품 정보를 불러올 수 없습니다.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading || !product) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const isFlexible = product.product_type === "flexible";
  const flexCur = product.flexible_currency ?? "KRW";
  const sym = CUR_SYM[flexCur] ?? "₩";
  const discount =
    !isFlexible && product.price > 0 && product.face_value > 0 && product.price < product.face_value
      ? Math.round((1 - product.price / product.face_value) * 100)
      : 0;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title={product.brand_name} />
      <ScrollView className="flex-1">
        {getProductFullImageUrl(product) ? (
          <Image
            source={{ uri: getProductFullImageUrl(product)! }}
            className="w-full h-64"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-48 bg-muted items-center justify-center">
            <Text className="text-4xl">🎁</Text>
            <Text className="text-muted-foreground mt-2">{product.brand_name}</Text>
          </View>
        )}
        <View className="px-5 py-4">
          <Text className="text-xs text-muted-foreground">{product.brand_name}</Text>
          <Text className="text-xl font-bold text-foreground mt-1">{product.name}</Text>

          {isFlexible ? (
            <>
              <View className="mt-3">
                <Text className="text-sm text-muted-foreground">
                  {sym}{(product.flexible_min ?? 0).toLocaleString()} ~ {sym}{(product.flexible_max ?? 0).toLocaleString()} 범위에서 입력
                </Text>
              </View>
              <View className="mt-4">
                <Text className="text-sm font-medium text-foreground mb-2">구매 금액 ({flexCur})</Text>
                <View className="flex-row items-center border border-border rounded-lg px-3 py-2">
                  <Text className="text-lg font-bold text-muted-foreground mr-1">{sym}</Text>
                  <TextInput
                    className="flex-1 text-lg font-bold text-foreground"
                    placeholder={`${(product.flexible_min ?? 0).toLocaleString()}`}
                    keyboardType="numeric"
                    value={flexAmount}
                    onChangeText={setFlexAmount}
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <View className="flex-row items-baseline mt-3 gap-2">
                {discount > 0 && (
                  <Text className="text-lg font-bold text-primary">{discount}%</Text>
                )}
                <Text className="text-2xl font-bold text-foreground">
                  {CUR_SYM[product.display_currency] ?? "₩"}{(product.price ?? 0).toLocaleString()}
                </Text>
                {discount > 0 && (
                  <Text className="text-sm text-muted-foreground line-through">
                    {CUR_SYM[product.display_currency] ?? "₩"}{(product.face_value ?? 0).toLocaleString()}
                  </Text>
                )}
              </View>
              <View className="flex-row items-center mt-6 gap-4">
                <Text className="text-sm text-foreground">수량</Text>
                <View className="flex-row items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={16} color="#0a0a0a" />
                  </Button>
                  <Text className="text-base font-medium w-10 text-center text-foreground">
                    {quantity}
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} color="#0a0a0a" />
                  </Button>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View className="flex-row gap-3 px-5 py-4 border-t border-border">
        <Button
          variant="outline"
          className="flex-1"
          onPress={() => {
            if (isFlexible) {
              const amt = Number(flexAmount);
              if (!amt || amt < (product.flexible_min ?? 0) || amt > (product.flexible_max ?? 0)) {
                Alert.alert("금액 오류", `${sym}${(product.flexible_min ?? 0).toLocaleString()} ~ ${sym}${(product.flexible_max ?? 0).toLocaleString()} 범위에서 입력해주세요.`);
                return;
              }
              addToCart(product, 1, amt);
            } else {
              addToCart(product, quantity);
            }
            Alert.alert("장바구니", "장바구니에 추가되었습니다.");
          }}
        >
          장바구니
        </Button>
        <Button
          className="flex-1"
          onPress={() => {
            if (isFlexible) {
              const amt = Number(flexAmount);
              if (!amt || amt < (product.flexible_min ?? 0) || amt > (product.flexible_max ?? 0)) {
                Alert.alert("금액 오류", `${sym}${(product.flexible_min ?? 0).toLocaleString()} ~ ${sym}${(product.flexible_max ?? 0).toLocaleString()} 범위에서 입력해주세요.`);
                return;
              }
              addToCart(product, 1, amt);
            } else {
              addToCart(product, quantity);
            }
            router.push("/(user)/cart");
          }}
        >
          구매하기
        </Button>
      </View>
    </SafeAreaView>
  );
}
