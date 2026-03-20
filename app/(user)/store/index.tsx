import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_9cabcb, v_09d0e5, v_cf9c33, v_39a996 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_66816c } from "wjvlskvsbzsrojdbjsl";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_665284, v_e81ec9, type v_678322 } from "vhkgxwheyyipiczd";

export default function v_ec75dd() {
  const v_904d46 = v_d1d90c();
  const [v_67dde1, v_9ad464] = v_5ab095<v_678322[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_9875a1, v_2e7fc1] = v_5ab095("");

  v_c4deb2(() => {
    v_58a9a8();
  }, []);

  const v_58a9a8 = async () => {
    try {
      const v_8f00b9 = await v_665284();
      v_9ad464(v_8f00b9.products);
    } catch (v_49263d) {
      console.error("Failed to load products:", v_49263d);
    } finally {
      v_34a50a(false);
    }
  };

  const v_e4cf17 = v_67dde1.filter(
    (v_e2a85c) =>
      v_e2a85c.name.toLowerCase().includes(v_9875a1.toLowerCase()) ||
      v_e2a85c.brand_name.toLowerCase().includes(v_9875a1.toLowerCase()),
  );

  const v_a66479 = ({ item: v_8c0b26 }: { item: v_678322 }) => {
    const v_e567dc = v_8c0b26.product_type === "flexible";
    const v_3ae14a =
      !v_e567dc && v_8c0b26.price > 0 && v_8c0b26.face_value > 0 && v_8c0b26.price < v_8c0b26.face_value
        ? Math.round((1 - v_8c0b26.price / v_8c0b26.face_value) * 100)
        : 0;
    const v_74f4a3 = v_e81ec9(v_8c0b26);

    return (
      <Pressable
        className="flex-1 m-1.5 bg-card rounded-xl border border-border overflow-hidden"
        onPress={() => v_904d46.push(`/(user)/store/${v_8c0b26.id}`)}
      >
        {v_74f4a3 ? (
          <Image
            source={{ uri: v_74f4a3 }}
            className="w-full h-32"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-32 bg-muted items-center justify-center">
            <Text className="text-3xl">🎁</Text>
          </View>
        )}
        <View className="p-3">
          <Text className="text-xs text-muted-foreground" numberOfLines={1}>
            {v_8c0b26.brand_name}
          </Text>
          <Text className="text-sm font-medium text-foreground mt-0.5" numberOfLines={2}>
            {v_8c0b26.name}
          </Text>
          <View className="flex-row items-center mt-2 gap-1.5">
            {v_e567dc ? (
              <Text className="text-sm font-bold text-foreground">
                ₩{(v_8c0b26.flexible_min ?? 0).toLocaleString()}~
              </Text>
            ) : (
              <>
                {v_3ae14a > 0 && (
                  <Badge variant="destructive" label={`${v_3ae14a}%`} />
                )}
                <Text className="text-base font-bold text-foreground">
                  ₩{(v_8c0b26.price ?? 0).toLocaleString()}
                </Text>
              </>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  if (v_683210) {
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
            value={v_9875a1}
            onChangeText={v_2e7fc1}
          />
        </View>
      </View>

      <FlatList
        data={v_e4cf17}
        renderItem={v_a66479}
        keyExtractor={(v_8c0b26) => v_8c0b26.id}
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
