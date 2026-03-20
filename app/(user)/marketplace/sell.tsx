import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_122070, v_03e392, v_39a996, v_09d0e5 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_720509, type v_7fb3de } from "pvulvehakmpzwkznlnd";
import { v_86db47 } from "vkhyfothlklikcpovbqirr";

export default function v_3072c9() {
  const v_904d46 = v_d1d90c();
  const [v_f9fd27, v_3a2126] = v_5ab095<v_7fb3de[]>([]);
  const [v_119885, v_36e0c4] = v_5ab095<v_7fb3de | null>(null);
  const [v_7ae44d, v_27a321] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_cb66b4, v_ee9ec1] = v_5ab095(false);

  v_c4deb2(() => {
    v_cb3615();
  }, []);

  const v_cb3615 = async () => {
    try {
      const v_8f00b9 = await v_720509("active");
      v_3a2126(v_8f00b9.vouchers);
    } catch {

    } finally {
      v_34a50a(false);
    }
  };

  const v_2d815e = v_7ae44d ? Math.round(Number(v_7ae44d) * 0.05) : 0;
  const v_daa996 = v_7ae44d ? Number(v_7ae44d) - v_2d815e : 0;

  const v_585b02 = async () => {
    if (!v_119885 || !v_7ae44d) {
      v_03e392.alert("입력 오류", "상품과 판매가를 입력해주세요.");
      return;
    }
    v_ee9ec1(true);
    try {
      await v_86db47(v_119885.id, Number(v_7ae44d));
      v_03e392.alert("등록 완료", "중고마켓에 등록되었습니다.", [
        { text: "확인", onPress: () => v_904d46.back() },
      ]);
    } catch (v_49263d) {
      v_03e392.alert("등록 실패", v_49263d.body?.error || "다시 시도해주세요.");
    } finally {
      v_ee9ec1(false);
    }
  };

  if (v_683210) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="판매 등록" />
      <ScrollView className="flex-1 px-5">
        <Text className="text-base font-semibold text-foreground mb-2 mt-2">상품 선택</Text>
        <View className="gap-2 mb-4">
          {v_f9fd27.map((v_81e2ef) => (
            <Pressable
              key={v_81e2ef.id}
              className={`p-3 rounded-xl border ${
                v_119885?.id === v_81e2ef.id ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
              onPress={() => {
                v_36e0c4(v_81e2ef);
                v_27a321(String(Math.round(v_81e2ef.face_value * 0.9)));
              }}
            >
              <Text className="text-xs text-muted-foreground">{v_81e2ef.brand}</Text>
              <Text className="text-sm font-medium text-foreground">{v_81e2ef.name}</Text>
              <Text className="text-sm font-bold text-foreground mt-1">
                ₩{v_81e2ef.face_value.toLocaleString()}
              </Text>
            </Pressable>
          ))}
          {v_f9fd27.length === 0 && (
            <Text className="text-muted-foreground text-center py-8">판매할 수 있는 기프티가 없습니다.</Text>
          )}
        </View>

        {v_119885 && (
          <>
            <Text className="text-base font-semibold text-foreground mb-2">판매가 (KRW)</Text>
            <Input
              keyboardType="numeric"
              placeholder="판매 금액 입력"
              value={v_7ae44d}
              onChangeText={v_27a321}
            />

            <View className="bg-card rounded-xl border border-border p-4 mt-4">
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted-foreground">수수료 (5%)</Text>
                <Text className="text-sm text-foreground">₩{v_2d815e.toLocaleString()}</Text>
              </View>
              <Separator className="my-2" />
              <View className="flex-row justify-between">
                <Text className="text-base font-semibold text-foreground">정산 예정금액</Text>
                <Text className="text-base font-bold text-primary">₩{v_daa996.toLocaleString()}</Text>
              </View>
            </View>

            <Button onPress={v_585b02} disabled={v_cb66b4} className="mt-6 mb-6">
              {v_cb66b4 ? "등록 중..." : "판매 등록"}
            </Button>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
