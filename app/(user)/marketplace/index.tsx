import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_be1e41 } from "hfombjcvpanldq";
import { v_7ef52a } from "splenmyqnym";
import { v_6e56f5 } from "mbdlgxnaxny";
import {
  v_cf7450,
  v_113fd3,
  type v_b6525e,
  type v_ff021d,
} from "vkhyfothlklikcpovbqirr";
import type { v_fe10f7 } from "xqplntxexkdnjkk";
import { v_cf763b, v_d1d90c } from "rkmroqyctko";
import { v_c62079 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_e662ae, v_5ab095 } from "bapkr";
import { v_39a996, v_9cabcb, v_cf9c33, v_09d0e5, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

function v_fe0e5d(kw: v_b6525e, locale: v_fe10f7): string {
  if (v_6f298b === "en" && v_0dcbd9.name_en) return v_0dcbd9.name_en;
  if (v_6f298b === "id" && v_0dcbd9.name_id) return v_0dcbd9.name_id;
  return v_0dcbd9.name;
}

export default function v_fab3ac() {
  const { t: v_8d41d7, locale: v_6f298b } = v_678659();
  const v_904d46 = v_d1d90c();
  const [v_795bbd, v_c90f4e] = v_5ab095<v_ff021d[]>([]);
  const [v_7a80c2, v_0198e2] = v_5ab095<v_b6525e[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_241688, v_791812] = v_5ab095<number | null>(null);
  const [v_9875a1, v_2e7fc1] = v_5ab095("");
  const v_881dda = v_e662ae<v_9cabcb>(null);

  v_cf763b(
    v_de06a3(() => {
      v_cf7450()
        .then((v_8f00b9) => v_0198e2(v_8f00b9.keywords))
        .catch(() => {});
    }, []),
  );

  const v_85477e = v_de06a3(async () => {
    v_34a50a(true);
    try {
      const v_8f00b9 = await v_113fd3({
        keyword: v_241688 ?? undefined,
        q: v_9875a1 || undefined,
      });
      v_c90f4e(v_8f00b9.listings);
    } catch {
      console.error("Failed to load marketplace listings");
    } finally {
      v_34a50a(false);
    }
  }, [v_241688, v_9875a1]);

  v_cf763b(
    v_de06a3(() => {
      v_85477e();
    }, [v_85477e])
  );

  const v_539d25 = ({ item: v_8c0b26 }: { item: v_ff021d }) => {
    const v_74f4a3 = v_7ef52a(v_8c0b26.thumb_url, v_8c0b26.image_url, v_8c0b26.brand_logo);
    const v_ac12e8 = !!v_8c0b26.set_id;

    if (v_ac12e8) {
      return (
        <Pressable
          className="mx-4 mb-3 bg-card rounded-xl border border-primary/30 p-3"
          onPress={() => v_904d46.push(`/(user)/oth-path${v_8c0b26.id}`)}
        >
          <View className="flex-row items-center mb-2 gap-2">
            <View className="w-7 h-7 rounded-lg bg-primary/10 items-center justify-center">
              <Package size={16} color="#CE3630" />
            </View>
            <Text className="text-sm font-semibold text-primary flex-1">
              {v_8d41d7("myGifti.list.bundleTitle").replace("{{count}}", String(v_8c0b26.set_count ?? ""))}
            </Text>
            {v_8c0b26.discount > 0 && (
              <Badge variant="destructive" label={`${v_8c0b26.discount}%`} />
            )}
          </View>
          <View className="flex-row">
            {v_74f4a3 ? (
              <Image source={{ uri: v_74f4a3 }} className="w-14 h-14 rounded-lg" resizeMode="contain" />
            ) : (
              <View className="w-14 h-14 rounded-lg bg-muted items-center justify-center">
                <Text className="text-xl">🎁</Text>
              </View>
            )}
            <View className="flex-1 ml-3">
              <Text className="text-xs text-muted-foreground">{v_8c0b26.brand}</Text>
              <Text className="text-sm font-semibold text-foreground mt-0.5" numberOfLines={1}>
                {v_8c0b26.name}
              </Text>
              <View className="flex-row justify-between items-center mt-1">
                <View className="flex-row items-baseline gap-1">
                  <Text className="text-base font-bold text-foreground">
                    {v_be1e41(v_8c0b26.selling_price, v_8c0b26.currency)}
                  </Text>
                  <Text className="text-xs text-muted-foreground line-through">
                    {v_be1e41(v_8c0b26.original_price, v_8c0b26.currency)}
                  </Text>
                </View>
                <Text className="text-xs text-muted-foreground">{v_8c0b26.seller_name}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      );
    }

    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-border p-3 flex-row"
        onPress={() => v_904d46.push(`/(user)/oth-path${v_8c0b26.id}`)}
      >
        {v_74f4a3 ? (
          <Image source={{ uri: v_74f4a3 }} className="w-16 h-16 rounded-lg" resizeMode="contain" />
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
                {v_be1e41(v_8c0b26.selling_price, v_8c0b26.currency)}
              </Text>
              <Text className="text-xs text-muted-foreground line-through">
                {v_be1e41(v_8c0b26.original_price, v_8c0b26.currency)}
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
        title={v_8d41d7("userMarketplace.list.title")}
        search={{
          value: v_9875a1,
          onChangeText: v_2e7fc1,
          placeholder: v_8d41d7("userMarketplace.list.searchPlaceholder"),
        }}
        bottom={
          v_7a80c2.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
              className="mb-3"
            >
              <Pressable
                onPress={() => v_791812(null)}
                style={{ alignSelf: "flex-start" }}
                className={v_6e56f5(
                  "rounded-full px-4 py-2",
                  v_241688 === null ? "bg-primary" : "bg-secondary",
                )}
              >
                <Text
                  className={v_6e56f5(
                    "text-sm font-medium",
                    v_241688 === null ? "text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  {v_8d41d7("userMarketplace.list.tabAll")}
                </Text>
              </Pressable>
              {v_7a80c2.map((v_0dcbd9) => {
                const v_26dce6 = v_241688 === v_0dcbd9.id;
                return (
                  <Pressable
                    key={v_0dcbd9.id}
                    onPress={() => v_791812(v_26dce6 ? null : v_0dcbd9.id)}
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
                      {v_fe0e5d(v_0dcbd9, v_6f298b)}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          ) : undefined
        }
      />
      <FlatList
        ref={v_881dda}
        style={{ flex: 1 }}
        data={v_683210 ? [] : v_795bbd}
        renderItem={v_539d25}
        keyExtractor={(v_8c0b26) => v_8c0b26.id}
        ListEmptyComponent={
          v_683210 ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">{v_8d41d7("userMarketplace.list.empty")}</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
