import v_a3453e, { v_c4deb2, v_5ab095, v_e662ae, v_de06a3 } from "bapkr";
import { v_3094a2, v_19b633, v_cf9c33, v_122070, v_39a996, v_03e392, v_a2349e, v_e45a99 } from "rcmrninabrnb";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_8d40c5, v_4e6e5f } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_7ef52a } from "splenmyqnym";
import v_c21f17 from "mxokdmnphhuxdntzxetlxyw";
import { v_50a647, v_eaee10, type v_7fb3de } from "pvulvehakmpzwkznlnd";
import { v_db3cc6 } from "dyunzbus";

const v_35c58e = 30;

export default function v_b89029() {
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const { width: v_bcfa24 } = v_e45a99();
  const [v_3e4b5d, v_ff27e3] = v_5ab095<v_7fb3de | null>(null);
  const [v_e4a44d, v_32538e] = v_5ab095<string | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const v_3ac63b = v_e662ae<ReturnType<typeof setInterval> | null>(null);
  const v_f1ce90 = v_e662ae(new v_a2349e.Value(1)).current;

  const v_1d79df = v_de06a3(() => {
    v_f1ce90.setValue(1);
    v_a2349e.timing(v_f1ce90, {
      toValue: 0,
      duration: v_35c58e * 1000,
      useNativeDriver: false,
    }).start();
  }, [v_f1ce90]);

  const v_4fd68b = v_de06a3(async () => {
    try {
      const v_8f00b9 = await v_eaee10(v_389afb!);
      v_32538e(v_8f00b9.barcode);
      v_1d79df();
    } catch {

    }
  }, [v_389afb, v_1d79df]);

  v_c4deb2(() => {
    if (v_389afb) {
      (async () => {
        try {
          const v_8f00b9 = await v_50a647(v_389afb);
          v_ff27e3(v_8f00b9.voucher);
        } catch {
          v_03e392.alert("오류", "기프티 정보를 불러올 수 없습니다.");
          v_904d46.back();
        } finally {
          v_34a50a(false);
        }
      })();
      v_4fd68b();
      v_3ac63b.current = setInterval(v_4fd68b, v_35c58e * 1000);
    }
    return () => {
      if (v_3ac63b.current) clearInterval(v_3ac63b.current);
    };
  }, [v_389afb]);

  if (v_683210 || !v_3e4b5d) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const v_26dce6 = v_3e4b5d.status === "active";
  const v_2d5007 = v_bcfa24 - 80; 
  const v_74f4a3 = v_7ef52a(v_3e4b5d.thumb_url, v_3e4b5d.image_url, v_3e4b5d.brand_logo);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="기프티 상세" />
      <ScrollView className="flex-1 px-5">
        {}
        <View className="bg-card rounded-xl border border-border overflow-hidden mb-4">
          <View className="p-5 items-center">
            {v_e4a44d ? (
              <View className="items-center">
                <Barcode128 value={v_e4a44d} width={v_2d5007} height={64} />
                <Text className="text-base font-mono tracking-[6px] text-foreground mt-3">
                  {v_e4a44d}
                </Text>
              </View>
            ) : (
              <View className="h-16 items-center justify-center">
                <ActivityIndicator size="small" color="#CE3630" />
                <Text className="text-xs text-muted-foreground mt-2">바코드 로딩중...</Text>
              </View>
            )}
          </View>
          {}
          <View className="h-1 bg-muted">
            <Animated.View
              style={{
                height: 4,
                backgroundColor: "#CE3630",
                borderRadius: 2,
                width: v_f1ce90.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              }}
            />
          </View>
        </View>

        {}
        <View className="bg-card rounded-xl border border-border p-4">
          <View className="flex-row justify-between items-start">
            {v_74f4a3 ? (
              <Image source={{ uri: v_74f4a3 }} className="w-14 h-14 rounded-lg mr-3" resizeMode="cover" />
            ) : null}
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
                ₩{v_3e4b5d.face_value?.toLocaleString() ?? "0"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">만료일</Text>
              <Text className="text-sm font-medium text-foreground">
                {v_3e4b5d.expiry_date
                  ? v_db3cc6(new Date(v_3e4b5d.expiry_date * 1000), "yyyy.MM.dd")
                  : "-"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">양도 횟수</Text>
              <Text className="text-sm font-medium text-foreground">{v_3e4b5d.transfer_count ?? 0}회</Text>
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
