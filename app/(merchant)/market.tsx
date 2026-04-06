import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_7ef52a } from "splenmyqnym";
import { v_6e56f5 } from "mbdlgxnaxny";
import {
  v_113fd3,
  type v_ff021d,
} from "vkhyfothlklikcpovbqirr";
import { v_cf763b, v_d1d90c } from "rkmroqyctko";
import { v_c62079 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_e662ae, v_5ab095 } from "bapkr";
import { v_39a996, v_9cabcb, v_cf9c33, v_09d0e5, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_0de24e() {
  const { t: v_8d41d7 } = v_678659();
  const v_904d46 = v_d1d90c();
  const v_dde291 = [
    { key: "all", label: v_8d41d7("merchant.market.tabAll") },
    { key: "set", label: v_8d41d7("merchant.market.tabSet") },
  ];
  const [v_795bbd, v_c90f4e] = v_5ab095<v_ff021d[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_ac1d22, v_02dd63] = v_5ab095("all");
  const [v_9875a1, v_2e7fc1] = v_5ab095("");
  const v_881dda = v_e662ae<v_9cabcb>(null);

  const v_85477e = v_de06a3(async () => {
    v_34a50a(true);
    try {
      const v_8f00b9 = await v_113fd3({ q: v_9875a1 || undefined });
      let v_4622b9 = v_8f00b9.listings;
      if (v_ac1d22 === "set") {
        v_4622b9 = v_4622b9.filter((v_1614db) => !!v_1614db.set_id);
      }
      v_c90f4e(v_4622b9);
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

  const v_c6acff = (item: v_ff021d) => {
    v_904d46.push({
      pathname: "/(merchant)/market-detail",
      params: { id: v_8c0b26.id },
    });
  };

  const v_539d25 = ({ item: v_8c0b26 }: { item: v_ff021d }) => {
    const v_74f4a3 = v_7ef52a(v_8c0b26.thumb_url, v_8c0b26.image_url, v_8c0b26.brand_logo);
    const v_46383f = !!(v_8c0b26 as any).set_id;
    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-border p-3 flex-row"
        onPress={() => v_c6acff(v_8c0b26)}
      >
        {v_74f4a3 ? (
          <Image source={{ uri: v_74f4a3 }} className="w-16 h-16 rounded-lg" resizeMode="contain" />
        ) : (
          <View className="w-16 h-16 rounded-lg bg-muted items-center justify-center">
            {v_46383f ? <Package size={24} color="#CE3630" /> : <Text className="text-2xl">🎁</Text>}
          </View>
        )}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <View className="flex-row items-center gap-1">
                <Text className="text-xs text-muted-foreground">{v_8c0b26.brand}</Text>
                {v_46383f && (
                  <View className="bg-primary/10 rounded px-1.5 py-0.5">
                    <Text className="text-[10px] font-medium text-primary">{v_8d41d7("merchant.market.bundleTag")}</Text>
                  </View>
                )}
              </View>
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader
        elevated
        title={v_8d41d7("merchant.market.title")}
        search={{ value: v_9875a1, onChangeText: v_2e7fc1, placeholder: v_8d41d7("merchant.market.searchPlaceholder") }}
        bottom={
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
        }
      />
      <FlatList
        ref={v_881dda}
        style={{ flex: 1 }}
        data={v_683210 ? [] : v_795bbd}
        renderItem={v_539d25}
        keyExtractor={(v_8c0b26) => v_8c0b26.id}
        contentContainerStyle={{ paddingBottom: 0 }}
        ListEmptyComponent={
          v_683210 ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">{v_8d41d7("merchant.market.empty")}</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
