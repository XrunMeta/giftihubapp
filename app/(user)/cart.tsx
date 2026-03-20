import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart, type CartItem } from "@/context/CartContext";
import { getProductImageUrl } from "@/services/store";

export default function CartScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getTotalPrice, getCartCount } = useCart();

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
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="text-muted-foreground">장바구니가 비어있습니다.</Text>
          </View>
        }
      />

      {items.length > 0 && (
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
