import { v_4c40b6 } from "eroshpxpcrjekpsjrhbenwagema";
import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_e81ec9, v_665284, type v_678322 } from "vhkgxwheyyipiczd";
import { v_cf763b, v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_de06a3, v_5ab095 } from "bapkr";
import { v_39a996, v_9cabcb, v_cf9c33, v_09d0e5, v_19b633, v_e45a99, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

const v_928ad6 = { KRW: "₩", USD: "$", IDR: "Rp" };

const v_d6d33d = 12;
const v_656abc = 12;

export default function v_ec75dd() {
  const v_904d46 = v_d1d90c();
  const { width: v_06db8f } = v_e45a99();
  const v_7d15a0 =
    (v_06db8f - v_d6d33d * 2 - v_656abc) / 2;

  const [v_67dde1, v_9ad464] = v_5ab095<v_678322[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_9875a1, v_2e7fc1] = v_5ab095("");

  v_cf763b(
    v_de06a3(() => {
      v_58a9a8();
    }, [])
  );

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
        style={{ width: v_7d15a0, marginBottom: 12 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
        onPress={() => v_904d46.push(`/(user)/store/${v_8c0b26.id}`)}
      >
        <View className="w-full h-32 bg-gray-100 p-3">
          {v_74f4a3 ? (
            <Image
              source={{ uri: v_74f4a3 }}
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
            {v_8c0b26.brand_name}
          </Text>
          <Text className="text-sm font-medium text-foreground" numberOfLines={2}>
            {v_8c0b26.name}
          </Text>
          <View className="flex-row items-center  mt-1 gap-1.5">
            {v_e567dc ? (
              <Text className="text-base font-bold text-foreground">
                {v_928ad6[v_8c0b26.flexible_currency ?? "KRW"] ?? "₩"}{(v_8c0b26.flexible_min ?? 0).toLocaleString()}~
              </Text>
            ) : (
              <>
                {v_3ae14a > 0 && (

                  <Text className="text-base font-bold text-red-500">{v_3ae14a}%</Text>
                )}
                <Text className="text-base font-bold text-foreground">
                  {v_928ad6[v_8c0b26.display_currency] ?? "₩"}{(v_8c0b26.price ?? 0).toLocaleString()}
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
        search={{ value: v_9875a1, onChangeText: v_2e7fc1 }}
      />

      <FlatList
        style={{ flex: 1 }}
        data={v_e4cf17}
        renderItem={v_a66479}
        keyExtractor={(v_8c0b26) => v_8c0b26.id}
        numColumns={2}
        columnWrapperStyle={{ gap: v_656abc }}
        contentContainerStyle={{ paddingHorizontal: v_d6d33d, paddingBottom: 20 }}
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
