import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert, Image } from "react-native";
import { Package, ShoppingCart } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { getBundlePreview, type BundleComposition } from "@/services/bundle";
import { resolveImageUrl } from "@/lib/image";

const CURRENCIES = ["KRW", "USD", "IDR"] as const;
const CURRENCY_SYMBOLS: Record<string, string> = { KRW: "₩", USD: "$", IDR: "Rp" };
const CURRENCY_PLACEHOLDER: Record<string, string> = {
  KRW: "예: 50000",
  USD: "예: 50",
  IDR: "예: 500000",
};

export function BundleComposer() {
  const { addPackageToCart } = useCart();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<string>("KRW");
  const [loading, setLoading] = useState(false);
  const [composition, setComposition] = useState<BundleComposition | null>(null);

  const handleCompose = async () => {
    const num = Number(amount);
    if (!num || num <= 0) {
      Alert.alert("금액 오류", "올바른 금액을 입력해주세요.");
      return;
    }
    setLoading(true);
    setComposition(null);
    try {
      const res = await getBundlePreview(num, currency);
      setComposition(res.composition);
    } catch (err: any) {
      Alert.alert("구성 실패", err.body?.error || err.message || "상품을 구성할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!composition) return;
    const items = composition.items.map((item) => ({
      product: {
        id: item.storage_id,
        brand_slug: item.brand_slug,
        brand_name: item.brand_name,
        brand_logo: null,
        name: item.name,
        face_value: item.face_value,
        face_value_usd: item.face_value_usd,
        price: item.face_value,
        price_usd: item.face_value_usd,
        display_currency: item.display_currency,
        image_url: item.image_url,
        thumb_url: item.thumb_url,
        stock_count: null,
        total_issued: 0,
        status: "active",
        product_type: "fixed" as const,
        flexible_currency: null,
        flexible_min: null,
        flexible_max: null,
      },
      quantity: item.quantity,
    }));

    addPackageToCart({
      items,
      totalBudget: composition.total,
      currency: composition.currency,
      composition,
    });

    Alert.alert("장바구니 추가", "구성 상품이 장바구니에 담겼습니다.");
    setComposition(null);
    setAmount("");
  };

  const sym = CURRENCY_SYMBOLS[currency] ?? "";

  return (
    <View className="mx-1.5 mb-4">
      <View className="bg-card rounded-xl border border-border p-4">
        <View className="flex-row items-center gap-2 mb-3">
          <Package size={18} color="#CE3630" />
          <Text className="text-base font-bold text-foreground">구성 구매</Text>
        </View>

        <Text className="text-xs text-muted-foreground mb-2">
          금액을 입력하면 최적의 상품 조합을 만들어 드립니다.
        </Text>

        {}
        <View className="flex-row gap-2 mb-3">
          {CURRENCIES.map((c) => (
            <Pressable
              key={c}
              onPress={() => { setCurrency(c); setComposition(null); }}
              className={`flex-1 py-1.5 rounded-lg border items-center ${
                currency === c
                  ? "bg-primary border-primary"
                  : "bg-secondary border-border"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  currency === c ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {c}
              </Text>
            </Pressable>
          ))}
        </View>

        {}
        <View className="flex-row gap-2">
          <View className="flex-1 flex-row items-center bg-secondary rounded-lg px-3 border border-border">
            <Text className="text-sm text-muted-foreground mr-1">{sym}</Text>
            <TextInput
              className="flex-1 py-2.5 text-sm text-foreground"
              placeholder={CURRENCY_PLACEHOLDER[currency]}
              placeholderTextColor="#737373"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
          <Button
            onPress={handleCompose}
            disabled={loading || !amount}
            className="px-4"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-sm font-semibold text-primary-foreground">구성하기</Text>
            )}
          </Button>
        </View>
      </View>

      {}
      {composition && (
        <View className="bg-card rounded-xl border border-border p-4 mt-2">
          <Text className="text-sm font-bold text-foreground mb-3">
            구성 결과
          </Text>

          {composition.items.map((item, idx) => {
            const imgUri = resolveImageUrl(item.thumb_url, item.image_url);
            return (
              <View key={idx} className="flex-row items-center py-2 border-b border-border">
                {imgUri ? (
                  <Image source={{ uri: imgUri }} className="w-10 h-10 rounded-md mr-3" resizeMode="cover" />
                ) : (
                  <View className="w-10 h-10 rounded-md bg-muted items-center justify-center mr-3">
                    <Text className="text-lg">🎁</Text>
                  </View>
                )}
                <View className="flex-1">
                  <Text className="text-xs text-muted-foreground">{item.brand_name}</Text>
                  <Text className="text-sm text-foreground" numberOfLines={1}>{item.name}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-xs text-muted-foreground">x{item.quantity}</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {sym}{item.subtotal.toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          })}

          {composition.flexible_item && (
            <View className="flex-row items-center py-2 border-b border-border">
              <View className="w-10 h-10 rounded-md bg-amber-900/30 items-center justify-center mr-3">
                <Text className="text-lg">💳</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-amber-500">제휴상품권</Text>
                <Text className="text-sm text-foreground">{composition.flexible_item.name}</Text>
              </View>
              <Text className="text-sm font-semibold text-foreground">
                {sym}{composition.flexible_item.flexible_amount.toLocaleString()}
              </Text>
            </View>
          )}

          {}
          <View className="flex-row justify-between items-center mt-3 pt-2">
            <Text className="text-sm text-muted-foreground">
              합계 ({composition.items.length + (composition.flexible_item ? 1 : 0)}종)
            </Text>
            <Text className="text-lg font-bold text-foreground">
              {sym}{composition.total.toLocaleString()}
            </Text>
          </View>

          {composition.overshoot > 0 && (
            <Text className="text-xs text-amber-500 mt-1">
              목표 대비 +{sym}{composition.overshoot.toLocaleString()} 초과
            </Text>
          )}

          <Button className="mt-3 flex-row gap-2" onPress={handleAddToCart}>
            <ShoppingCart size={16} color="#fff" />
            <Text className="text-sm font-semibold text-primary-foreground">장바구니에 담기</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
