import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_be1e41 } from "hfombjcvpanldq";
import { v_7ef52a } from "splenmyqnym";
import { v_eeb70f, type v_ff021d } from "vkhyfothlklikcpovbqirr";
import { v_db3cc6 } from "dyunzbus";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_c62079 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_39a996, v_cf9c33, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
export default function v_271810() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const [v_a8fb42, v_ce7034] = v_5ab095<v_ff021d | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);

  v_c4deb2(() => {
    if (v_389afb) v_58b8a9();
  }, [v_389afb]);

  const v_58b8a9 = async () => {
    try {
      const v_8f00b9 = await v_eeb70f(v_389afb!);
      v_ce7034(v_8f00b9.listing);
    } catch {
      v_5c50c0(v_8d41d7("merchant.marketDetail.loadErrorTitle"), v_8d41d7("merchant.marketDetail.loadErrorBody"));
      v_904d46.back();
    } finally {
      v_34a50a(false);
    }
  };

  if (v_683210 || !v_a8fb42) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center" edges={["top"]}>
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const v_46383f = !!(v_a8fb42 as any).set_id;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader
        title={v_8d41d7("merchant.marketDetail.title")}
        onBackPress={() => v_904d46.navigate("/(merchant)/market")}
      />
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 0 }}>
        {(() => {
          const v_74f4a3 = v_7ef52a(v_a8fb42.image_url, v_a8fb42.brand_logo);
          return v_74f4a3 ? (
            <Image source={{ uri: v_74f4a3 }} className="w-full h-48 rounded-xl mt-2" resizeMode="contain" />
          ) : (
            <View className="w-full h-36 rounded-xl mt-2 bg-muted items-center justify-center">
              {v_46383f ? <Package size={40} color="#CE3630" /> : <Text className="text-4xl">🎁</Text>}
            </View>
          );
        })()}
        <View className="bg-card rounded-xl border border-border p-5 mt-3 ">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-xs text-muted-foreground">{v_a8fb42.brand}</Text>
                {v_46383f && (
                  <View className="bg-primary/10 rounded px-1.5 py-0.5">
                    <Text className="text-[10px] font-medium text-primary">{v_8d41d7("merchant.market.bundleTag")}</Text>
                  </View>
                )}
              </View>
              <Text className="text-xl font-bold text-foreground mt-1">{v_a8fb42.name}</Text>
            </View>
            {v_a8fb42.discount > 0 && (
              <Badge variant="destructive" label={`${v_a8fb42.discount}% OFF`} />
            )}
          </View>

          <Separator className="my-4" />

          <View className="gap-2.5">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{v_8d41d7("merchant.marketDetail.originalPrice")}</Text>
              <Text className="text-sm text-muted-foreground line-through">
                {v_be1e41(v_a8fb42.original_price, v_a8fb42.currency)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base font-semibold text-foreground">{v_8d41d7("merchant.marketDetail.salePrice")}</Text>
              <Text className="text-xl font-bold text-primary">
                {v_be1e41(v_a8fb42.selling_price, v_a8fb42.currency)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{v_8d41d7("merchant.marketDetail.expiry")}</Text>
              <Text className="text-sm text-foreground">
                {v_db3cc6(new Date(v_a8fb42.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{v_8d41d7("merchant.marketDetail.seller")}</Text>
              <Text className="text-sm text-foreground">{v_a8fb42.seller_name}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-5 pt-3 pb-2 border-t border-border bg-white">
        <Button
          onPress={() =>
            v_904d46.push({
              pathname: "/(merchant)/market-purchase",
              params: { listingId: v_a8fb42.id },
            })
          }
        >
          {v_8d41d7("merchant.marketDetail.purchase")}
        </Button>
      </View>
    </SafeAreaView>
  );
}
