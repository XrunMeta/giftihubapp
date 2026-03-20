import v_a3453e, { v_c4deb2, v_5ab095, v_e662ae } from "bapkr";
import { v_3094a2, v_19b633, v_cf9c33, v_122070, v_39a996, v_03e392 } from "rcmrninabrnb";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_8d40c5, v_2d13e9, v_4e6e5f, v_dc4a73 } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_7ef52a } from "splenmyqnym";
import { v_50a647, v_eaee10, type v_7fb3de } from "pvulvehakmpzwkznlnd";
import { v_db3cc6 } from "dyunzbus";

export default function v_b89029() {
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const [v_3e4b5d, v_ff27e3] = v_5ab095<v_7fb3de | null>(null);
  const [v_e4a44d, v_32538e] = v_5ab095<string | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const v_3ac63b = v_e662ae<ReturnType<typeof setInterval> | null>(null);

  v_c4deb2(() => {
    if (v_389afb) {
      v_127ddc();
      v_4fd68b();

      v_3ac63b.current = setInterval(v_4fd68b, 30000);
    }
    return () => {
      if (v_3ac63b.current) clearInterval(v_3ac63b.current);
    };
  }, [v_389afb]);

  const v_127ddc = async () => {
    try {
      const v_8f00b9 = await v_50a647(v_389afb!);
      v_ff27e3(v_8f00b9.voucher);
    } catch {
      v_03e392.alert("오류", "기프티 정보를 불러올 수 없습니다.");
      v_904d46.back();
    } finally {
      v_34a50a(false);
    }
  };

  const v_4fd68b = async () => {
    try {
      const v_8f00b9 = await v_eaee10(v_389afb!);
      v_32538e(v_8f00b9.barcode);
    } catch {

    }
  };

  if (v_683210 || !v_3e4b5d) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const v_26dce6 = v_3e4b5d.status === "active";

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="기프티 상세" />
      <ScrollView className="flex-1 px-5">
        {}
        <View className="bg-card rounded-xl border border-border p-6 items-center mb-4">
          {v_e4a44d ? (
            <View className="items-center">
              <Text className="text-3xl font-mono tracking-widest text-foreground mb-2">
                {v_e4a44d}
              </Text>
              <Text className="text-xs text-muted-foreground">30초마다 자동 갱신</Text>
            </View>
          ) : (
            <Text className="text-muted-foreground">바코드를 불러오는 중...</Text>
          )}
        </View>

        {}
        <View className="bg-card rounded-xl border border-border p-4">
          <View className="flex-row justify-between items-start">
            {(() => {
              const v_74f4a3 = v_7ef52a(v_3e4b5d.thumb_url, v_3e4b5d.image_url, v_3e4b5d.brand_logo);
              return v_74f4a3 ? (
                <Image source={{ uri: v_74f4a3 }} className="w-14 h-14 rounded-lg mr-3" resizeMode="cover" />
              ) : null;
            })()}
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{v_3e4b5d.brand}</Text>
              <Text className="text-lg font-bold text-foreground mt-0.5">{v_3e4b5d.name}</Text>
            </View>
            <Badge
              variant={v_3e4b5d.status === "active" ? "default" : "secondary"}
              label={v_3e4b5d.status === "active" ? "사용가능" : v_3e4b5d.status}
            />
          </View>

          <Separator className="my-3" />

          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">액면가</Text>
              <Text className="text-sm font-medium text-foreground">
                ₩{v_3e4b5d.face_value.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">만료일</Text>
              <Text className="text-sm font-medium text-foreground">
                {v_db3cc6(new Date(v_3e4b5d.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">양도 횟수</Text>
              <Text className="text-sm font-medium text-foreground">{v_3e4b5d.transfer_count}회</Text>
            </View>
          </View>
        </View>

        {}
        {v_26dce6 && (
          <View className="gap-3 mt-4 mb-6">
            <View className="flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 flex-row gap-2"
                onPress={() => v_904d46.push(`/(user)/oth-path${v_389afb}/transfer`)}
              >
                <Send size={16} color="#0a0a0a" />
                <Text className="text-sm font-medium text-foreground">양도</Text>
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex-row gap-2"
                onPress={() => v_904d46.push(`/(user)/oth-path${v_389afb}/refund`)}
              >
                <ArrowLeftRight size={16} color="#0a0a0a" />
                <Text className="text-sm font-medium text-foreground">환불</Text>
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
