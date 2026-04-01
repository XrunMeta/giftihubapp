import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Minus, Plus, Trash2, Package, X } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart, type CartItem, type PackageItem } from "@/context/CartContext";
import { getProductImageUrl } from "@/services/store";

const SYM: Record<string, string> = { KRW: "₩", USD: "$", IDR: "Rp" };

function formatPrice(amount: number, currency?: string) {
  const sym = SYM[currency ?? "KRW"] ?? "₩";
  return `${sym}${amount.toLocaleString()}`;
}

export default function CartScreen() {
  const router = useRouter();
  const {
    items, packageItems,
    updateQuantity, removeFromCart, removePackage,
    getTotalPrice, getCartCount,
  } = useCart();

  const hasItems = items.length > 0 || packageItems.length > 0;

  const renderPackages = () => {
    if (!packageItems.length) return null;
    return (
      <View className="mb-2">
        {packageItems.map((pkg, idx) => {
          const firstItem = pkg.items[0];
          const restCount = pkg.items.reduce((s, i) => s + i.quantity, 0) - (firstItem?.quantity ?? 0);
          const label = firstItem
            ? `${firstItem.product.name}${restCount > 0 ? ` 외 ${restCount}건` : ""}`
            : "구성 상품";

          return (
            <View key={`pkg-${idx}`} className="bg-card rounded-xl border border-border p-3 mx-4 mb-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2 flex-1">
                  <View className="w-10 h-10 rounded-lg bg-primary/10 items-center justify-center">
                    <Package size={20} color="#CE3630" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-primary font-semibold">구성 상품</Text>
                    <Text className="text-sm text-foreground" numberOfLines={1}>{label}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3">
                  <Text className="text-sm font-bold text-foreground">
                    {formatPrice(pkg.totalBudget, pkg.currency)}
                  </Text>
                  <Pressable onPress={() => removePackage(idx)}>
                    <X size={16} color="#ef4444" />
                  </Pressable>
                </View>
              </View>

              {}
              <View className="mt-2 pt-2 border-t border-border">
                {pkg.items.map((ci, ciIdx) => (
                  <View key={ciIdx} className="flex-row justify-between py-0.5">
                    <Text className="text-xs text-muted-foreground flex-1" numberOfLines={1}>
                      {ci.product.brand_name} · {ci.product.name}
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      x{ci.quantity}
                    </Text>
                  </View>
                ))}
                {pkg.composition?.flexible_item && (
                  <View className="flex-row justify-between py-0.5">
                    <Text className="text-xs text-amber-500 flex-1">
                      제휴상품권 · {pkg.composition.flexible_item.name}
                    </Text>
                    <Text className="text-xs text-amber-500">
                      {formatPrice(pkg.composition.flexible_item.flexible_amount, pkg.currency)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    const imgUri = getProductImageUrl(item.product);
    return (
      <View className="flex-row bg-card rounded-xl border border-border p-3 mx-4 mb-3">
        {imgUri ? (
          <Image
            source={{ uri: imgUri }}
            className="w-20 h-20 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="w-20 h-20 rounded-lg bg-muted items-center justify-center">
            <Text className="text-2xl">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3 justify-between">
          <View>
            <Text className="text-xs text-muted-foreground">{item.product.brand_name}</Text>
            <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
              {item.product.name}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center border border-border rounded-md">
              <Pressable
                onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="p-1.5"
              >
                <Minus size={14} color="#737373" />
              </Pressable>
              <Text className="text-sm font-medium w-8 text-center text-foreground">
                {item.quantity}
              </Text>
              <Pressable
                onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="p-1.5"
              >
                <Plus size={14} color="#737373" />
              </Pressable>
            </View>
            <View className="flex-row items-center gap-3">
              <Text className="text-sm font-bold text-foreground">
                ₩{(item.product.price * item.quantity).toLocaleString()}
              </Text>
              <Pressable onPress={() => removeFromCart(item.product.id)}>
                <Trash2 size={16} color="#ef4444" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">장바구니</Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={renderPackages()}
        ListEmptyComponent={
          !packageItems.length ? (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">장바구니가 비어있습니다.</Text>
            </View>
          ) : null
        }
      />

      {hasItems && (
        <View className="px-5 py-4 border-t border-border">
          <View className="flex-row justify-between mb-3">
            <Text className="text-base text-foreground">합계 ({getCartCount()}개)</Text>
            <Text className="text-xl font-bold text-foreground">
              ₩{getTotalPrice().toLocaleString()}
            </Text>
          </View>
          <Button onPress={() => router.push("/(user)/purchase")}>
            결제하기
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
