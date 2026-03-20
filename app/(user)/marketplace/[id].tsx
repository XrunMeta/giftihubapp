import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_cf9c33, v_122070, v_39a996, v_03e392 } from "rcmrninabrnb";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_7ef52a } from "splenmyqnym";
import { v_eeb70f, type v_ff021d } from "vkhyfothlklikcpovbqirr";
import { v_db3cc6 } from "dyunzbus";

export default function v_9c78c5() {
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
      v_03e392.alert("오류", "상품 정보를 불러올 수 없습니다.");
      v_904d46.back();
    } finally {
      v_34a50a(false);
    }
  };

  if (v_683210 || !v_a8fb42) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="중고 상세" />
      <ScrollView className="flex-1 px-5">
        {(() => {
          const v_74f4a3 = v_7ef52a(v_a8fb42.image_url, v_a8fb42.brand_logo);
          return v_74f4a3 ? (
            <Image source={{ uri: v_74f4a3 }} className="w-full h-48 rounded-xl mt-2" resizeMode="cover" />
          ) : (
            <View className="w-full h-36 rounded-xl mt-2 bg-muted items-center justify-center">
              <Text className="text-4xl">🎁</Text>
            </View>
          );
        })()}
        <View className="bg-card rounded-xl border border-border p-5 mt-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{v_a8fb42.brand}</Text>
              <Text className="text-xl font-bold text-foreground mt-1">{v_a8fb42.name}</Text>
            </View>
            {v_a8fb42.discount > 0 && (
              <Badge variant="destructive" label={`${v_a8fb42.discount}% OFF`} />
            )}
          </View>

          <Separator className="my-4" />

          <View className="gap-2.5">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">원가</Text>
              <Text className="text-sm text-muted-foreground line-through">
                ₩{v_a8fb42.original_price.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base font-semibold text-foreground">판매가</Text>
              <Text className="text-xl font-bold text-primary">
                ₩{v_a8fb42.selling_price.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">만료일</Text>
              <Text className="text-sm text-foreground">
                {v_db3cc6(new Date(v_a8fb42.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">판매자</Text>
              <Text className="text-sm text-foreground">{v_a8fb42.seller_name}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-5 py-4 border-t border-border">
        <Button
          onPress={() =>
            v_904d46.push({
              pathname: "/(user)/oth-path",
              params: { listingId: v_a8fb42.id },
            })
          }
        >
          구매하기
        </Button>
      </View>
    </SafeAreaView>
  );
}
