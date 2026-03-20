import v_a3453e from "bapkr";
import { v_3094a2, v_19b633, v_9cabcb, v_09d0e5, v_cf9c33 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_3b9c43, v_a07c02, v_1290fc } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_7a943b, type v_42580b } from "dxfmfnfvriitbtghyppor";
import { v_e81ec9 } from "vhkgxwheyyipiczd";

export default function v_d218af() {
  const v_904d46 = v_d1d90c();
  const { items: v_4622b9, updateQuantity: v_3fe605, removeFromCart: v_af112b, getTotalPrice: v_e60156, getCartCount: v_63e412 } = v_7a943b();

  const v_fcf6ec = ({ item: v_8c0b26 }: { item: v_42580b }) => {
    const v_74f4a3 = v_e81ec9(v_8c0b26.product);
    return (
    <View className="flex-row bg-card rounded-xl border border-border p-3 mx-4 mb-3">
      {v_74f4a3 ? (
        <Image
          source={{ uri: v_74f4a3 }}
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
          <Text className="text-xs text-muted-foreground">{v_8c0b26.product.brand_name}</Text>
          <Text className="text-sm font-medium text-foreground" numberOfLines={1}>
            {v_8c0b26.product.name}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center border border-border rounded-md">
            <Pressable
              onPress={() => v_3fe605(v_8c0b26.product.id, v_8c0b26.quantity - 1)}
              className="p-1.5"
            >
              <Minus size={14} color="#737373" />
            </Pressable>
            <Text className="text-sm font-medium w-8 text-center text-foreground">
              {v_8c0b26.quantity}
            </Text>
            <Pressable
              onPress={() => v_3fe605(v_8c0b26.product.id, v_8c0b26.quantity + 1)}
              className="p-1.5"
            >
              <Plus size={14} color="#737373" />
            </Pressable>
          </View>
          <View className="flex-row items-center gap-3">
            <Text className="text-sm font-bold text-foreground">
              ₩{(v_8c0b26.product.price * v_8c0b26.quantity).toLocaleString()}
            </Text>
            <Pressable onPress={() => v_af112b(v_8c0b26.product.id)}>
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
        data={v_4622b9}
        renderItem={v_fcf6ec}
        keyExtractor={(v_8c0b26) => v_8c0b26.product.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="text-muted-foreground">장바구니가 비어있습니다.</Text>
          </View>
        }
      />

      {v_4622b9.length > 0 && (
        <View className="px-5 py-4 border-t border-border">
          <View className="flex-row justify-between mb-3">
            <Text className="text-base text-foreground">합계 ({v_63e412()}개)</Text>
            <Text className="text-xl font-bold text-foreground">
              ₩{v_e60156().toLocaleString()}
            </Text>
          </View>
          <Button onPress={() => v_904d46.push("/(user)/purchase")}>
            결제하기
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
