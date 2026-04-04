import v_a3453e, { v_e662ae, v_5ab095, v_de06a3 } from "bapkr";
import { v_3094a2, v_19b633, v_9cabcb, v_09d0e5, v_cf9c33, v_39a996, v_122070 } from "rcmrninabrnb";
import { v_d1d90c, v_cf763b } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_66816c } from "wjvlskvsbzsrojdbjsl";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_6e56f5 } from "mbdlgxnaxny";
import { v_7ef52a } from "splenmyqnym";
import {
  v_113fd3,
  type v_ff021d,
  type v_add689,
} from "vkhyfothlklikcpovbqirr";

const v_dde291 = [
  { key: "all", label: "전체" },
  { key: "food", label: "식품" },
  { key: "culture", label: "문화" },
  { key: "convenience", label: "편의점" },
  { key: "beauty", label: "뷰티" },
  { key: "etc", label: "기타" },
];

export default function v_fab3ac() {
  const v_904d46 = v_d1d90c();
  const [v_795bbd, v_c90f4e] = v_5ab095<v_ff021d[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_ac1d22, v_02dd63] = v_5ab095("all");
  const [v_9875a1, v_2e7fc1] = v_5ab095("");
  const v_881dda = v_e662ae<v_9cabcb>(null);

  const v_85477e = v_de06a3(async () => {
    v_34a50a(true);
    try {
      const v_8b9cd4 = v_ac1d22 === "all" ? undefined : (v_ac1d22 as v_add689);
      const v_8f00b9 = await v_113fd3({ category: v_8b9cd4, q: v_9875a1 || undefined });
      v_c90f4e(v_8f00b9.listings);
    } catch {
      console.error("Failed to load marketplace listings");
    } finally {
      v_34a50a(false);
    }
  }, [v_ac1d22, v_9875a1]);

  v_cf763b(
    v_de06a3(() => {
      v_85477e();
    }, [v_85477e])
  );

  const v_539d25 = ({ item: v_8c0b26 }: { item: v_ff021d }) => {
    const v_74f4a3 = v_7ef52a(v_8c0b26.thumb_url, v_8c0b26.image_url, v_8c0b26.brand_logo);
    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-border p-3 flex-row"
        onPress={() => v_904d46.push(`/(user)/oth-path${v_8c0b26.id}`)}
      >
        {v_74f4a3 ? (
          <Image source={{ uri: v_74f4a3 }} className="w-16 h-16 rounded-lg" resizeMode="cover" />
        ) : (
          <View className="w-16 h-16 rounded-lg bg-muted items-center justify-center">
            <Text className="text-2xl">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{v_8c0b26.brand}</Text>
              <Text className="text-sm font-semibold text-foreground mt-0.5" numberOfLines={1}>
                {v_8c0b26.name}
              </Text>
            </View>
            {v_8c0b26.discount > 0 && (
              <Badge variant="destructive" label={`${v_8c0b26.discount}%`} />
            )}
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-baseline gap-2">
              <Text className="text-base font-bold text-foreground">
                ₩{v_8c0b26.selling_price.toLocaleString()}
              </Text>
              <Text className="text-xs text-muted-foreground line-through">
                ₩{v_8c0b26.original_price.toLocaleString()}
              </Text>
            </View>
            <Text className="text-xs text-muted-foreground">{v_8c0b26.seller_name}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const v_b62866 = (
    <>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">중고마켓</Text>
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
        className="mb-3"
      >
        {v_dde291.map((v_11083e) => {
          const v_26dce6 = v_11083e.key === v_ac1d22;
          return (
            <Pressable
              key={v_11083e.key}
              onPress={() => v_02dd63(v_11083e.key)}
              style={{ alignSelf: "flex-start" }}
              className={v_6e56f5(
                "rounded-full px-4 py-2",
                v_26dce6 ? "bg-primary" : "bg-secondary",
              )}
            >
              <Text
                className={v_6e56f5(
                  "text-sm font-medium",
                  v_26dce6 ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {v_11083e.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <FlatList
        ref={v_881dda}
        data={v_683210 ? [] : v_795bbd}
        renderItem={v_539d25}
        keyExtractor={(v_8c0b26) => v_8c0b26.id}
        ListHeaderComponent={v_b62866}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          v_683210 ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">판매 중인 상품이 없습니다.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
