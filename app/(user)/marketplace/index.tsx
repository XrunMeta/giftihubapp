import v_a3453e, { v_c4deb2, v_5ab095, v_de06a3 } from "bapkr";
import { v_3094a2, v_19b633, v_9cabcb, v_09d0e5, v_39a996 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_66816c } from "wjvlskvsbzsrojdbjsl";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_a3b961 } from "xytbpcyuptfvuyelkypzvyijaumlzur";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
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

  v_c4deb2(() => {
    v_85477e();
  }, [v_85477e]);

  const v_539d25 = ({ item: v_8c0b26 }: { item: v_ff021d }) => (
    <Pressable
      className="mx-4 mb-3 bg-card rounded-xl border border-border p-4"
      onPress={() => v_904d46.push(`/(user)/oth-path${v_8c0b26.id}`)}
    >
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
      <View className="flex-row justify-between items-center mt-3">
        <View className="flex-row items-baseline gap-2">
          <Text className="text-lg font-bold text-foreground">
            ₩{v_8c0b26.selling_price.toLocaleString()}
          </Text>
          <Text className="text-xs text-muted-foreground line-through">
            ₩{v_8c0b26.original_price.toLocaleString()}
          </Text>
        </View>
        <Text className="text-xs text-muted-foreground">{v_8c0b26.seller_name}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
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

      <ScrollableTabs tabs={v_dde291} activeTab={v_ac1d22} onTabPress={v_02dd63} className="mb-3" />

      {v_683210 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={v_795bbd}
          renderItem={v_539d25}
          keyExtractor={(v_8c0b26) => v_8c0b26.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-muted-foreground">판매 중인 상품이 없습니다.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
