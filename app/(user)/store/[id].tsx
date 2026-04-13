import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { resolveImageUrl } from "@/lib/image";
import { getProductDetail, getProductFullImageUrl, type Product } from "@/services/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Minus, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
import { currencySymbol } from "@/lib/currency";

function formatThousandsFromDigits(digits: string): string {
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ProductDetailScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [flexDigits, setFlexDigits] = useState("");

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductDetail(id!);
      setProduct(data.product);
    } catch {
      alert(t("userStore.detail.loadErrorTitle"), t("userStore.detail.loadErrorBody"));
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading || !product) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center" edges={["top"]}>
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const isFlexible = product.product_type === "flexible";
  const flexCur = product.flexible_currency ?? "KRW";
  const sym = currencySymbol(flexCur);
  const discount =
    !isFlexible && product.price > 0 && product.face_value > 0 && product.price < product.face_value
      ? Math.round((1 - product.price / product.face_value) * 100)
      : 0;

  const flexAmountNum = flexDigits ? Number(flexDigits) : 0;

  const addCartFlow = (thenGoCart: boolean) => {
    if (isFlexible) {
      const amt = flexAmountNum;
      if (!amt || amt < (product.flexible_min ?? 0) || amt > (product.flexible_max ?? 0)) {
        alert(
          t("userStore.detail.flexRangeTitle"),
          t("userStore.detail.flexRangeBody")
            .replace(/\{\{sym\}\}/g, sym)
            .replace("{{min}}", (product.flexible_min ?? 0).toLocaleString())
            .replace("{{max}}", (product.flexible_max ?? 0).toLocaleString()),
        );
        return;
      }
      addToCart(product, 1, amt);
    } else {
      addToCart(product, quantity);
    }
    if (thenGoCart) {
      router.push("/(user)/cart");
    } else {
      alert(t("userStore.detail.cartAddedTitle"), t("userStore.detail.cartAddedBody"));
    }
  };

  const imgUri = getProductFullImageUrl(product);
  const detailImgUri = resolveImageUrl(product.detail_image_url);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={product.brand_name} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {imgUri ? (
            <Image source={{ uri: imgUri }} className="w-full aspect-square" resizeMode="cover" />
          ) : (
            <View className="w-full aspect-square bg-muted/60 items-center justify-center">
              <Text className="text-5xl">🎁</Text>
              <Text className="text-sm text-muted-foreground mt-3">{product.brand_name}</Text>
            </View>
          )}

          <View className="px-4 mt-4">
            <View className="bg-white rounded-2xl border border-border p-5">
              <Text className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {product.brand_name}
              </Text>
              <Text className="text-xl font-bold text-foreground leading-7">{product.name}</Text>

              {isFlexible ? (
                <>
                  <View className="mt-2 bg-secondary/80 rounded-xl py-3">
                    <Text className="text-sm text-muted-foreground">{t("userStore.detail.purchasableRange")}</Text>
                    <Text className="text-smd font-semibold text-foreground mt-1">
                      {sym}
                      {(product.flexible_min ?? 0).toLocaleString()} ~ {sym}
                      {(product.flexible_max ?? 0).toLocaleString()}
                    </Text>
                  </View>
                  <Text className="text-sm font-medium text-foreground mt-2 mb-2">
                    {t("userStore.detail.purchaseAmount").replace("{{currency}}", flexCur)}
                  </Text>
                  <View className="flex-row items-center bg-secondary rounded-xl border border-border px-4 py-3">
                    <Text className="text-base font-bold text-muted-foreground mr-2">{sym}</Text>
                    <TextInput
                      className="flex-1 text-lg font-semibold text-foreground py-0.5"
                      placeholder={formatThousandsFromDigits(String(product.flexible_min ?? 0))}
                      placeholderTextColor="#737373"
                      keyboardType="numeric"
                      value={formatThousandsFromDigits(flexDigits)}
                      onChangeText={(txt) => setFlexDigits(txt.replace(/\D/g, ""))}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View className="flex-row items-end justify-between gap-3 mt-4">
                    {discount > 0 ? (
                      <>
                        <View className="flex-1 min-w-0">
                          <View className="bg-primary/12 self-start rounded-full ">
                            <Text className="text-sm font-bold text-primary">
                              {t("userStore.detail.discountFmt").replace("{{pct}}", String(discount))}
                            </Text>
                          </View>
                          <Text className="text-sm text-muted-foreground line-through">
                            {currencySymbol(product.display_currency)}
                            {(product.face_value ?? 0).toLocaleString()}
                          </Text>
                        </View>
                        <Text className="text-2xl font-bold text-foreground shrink-0">
                          {currencySymbol(product.display_currency)}
                          {(product.price ?? 0).toLocaleString()}
                        </Text>
                      </>
                    ) : (
                      <Text className="text-2xl font-bold text-foreground">
                        {currencySymbol(product.display_currency)}
                        {(product.price ?? 0).toLocaleString()}
                      </Text>
                    )}
                  </View>

                  <Text className="text-sm font-medium text-foreground mt-4 mb-1">{t("userStore.detail.quantity")}</Text>
                  <View className="flex-row items-center self-start bg-secondary rounded-xl border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl rounded-r-none"
                      onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus size={18} color="#0a0a0a" />
                    </Button>
                    <Text className="text-base font-semibold min-w-[44px] text-center text-foreground">
                      {quantity}
                    </Text>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl rounded-l-none"
                      onPress={() => setQuantity(quantity + 1)}
                    >
                      <Plus size={18} color="#0a0a0a" />
                    </Button>
                  </View>
                </>
              )}
            </View>

            <View className="bg-white rounded-2xl border border-border overflow-hidden mt-3">
              {detailImgUri ? (
                <Image source={{ uri: detailImgUri }} className="w-full" style={{ aspectRatio: 1 }} resizeMode="cover" />
              ) : (
                <View className="w-full py-10 items-center justify-center bg-muted/30">
                  <Text className="text-3xl">🖼️</Text>
                  <Text className="text-xs text-muted-foreground mt-2">{t("userStore.detail.description")}</Text>
                </View>
              )}
              <View className="p-5">
                <Text className="text-sm font-semibold text-foreground mb-2">{t("userStore.detail.description")}</Text>
                <Text className="text-sm text-muted-foreground leading-5">
                  {product.description || "-"}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View className="flex-row gap-3 bg-white border-t border-border px-4 py-4">
          <Button variant="outline" className="flex-1 border-border bg-gray-50" onPress={() => addCartFlow(false)}>
            {t("userStore.detail.addToCart")}
          </Button>
          <Button className="flex-1" onPress={() => addCartFlow(true)}>
            {t("userStore.detail.buyNow")}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
