import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_03e392, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_46bddf() {
  const v_904d46 = v_d1d90c();
  const [v_e4a44d, v_32538e] = v_5ab095("");
  const [v_f63e09, v_1cbe59] = v_5ab095("");
  const [v_44f343, v_2f2a15] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_8075e9 = async () => {
    if (!v_e4a44d.trim() || !v_f63e09.trim()) {
      v_03e392.alert("입력 오류", "바코드와 금액을 모두 입력해주세요.");
      return;
    }
    const v_844935 = parseFloat(v_f63e09);
    if (isNaN(v_844935) || v_844935 <= 0) {
      v_03e392.alert("입력 오류", "올바른 금액을 입력해주세요.");
      return;
    }

    v_34a50a(true);
    try {
      await v_bc1b24("/oth-path", {
        method: "POST",
        body: JSON.stringify({
          barcode: v_e4a44d.trim(),
          amount: v_844935,
          memo: v_44f343.trim() || undefined,
        }),
      });
      v_03e392.alert("기록 완료", "결제가 기록되었습니다.", [
        { text: "확인", onPress: () => v_904d46.back() },
      ]);
    } catch (v_49263d) {
      v_03e392.alert("기록 실패", v_49263d.body?.error || "다시 시도해주세요.");
    } finally {
      v_34a50a(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="결제 기록" />
      <ScrollView className="flex-1 px-6">
        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            바코드 번호
          </Text>
          <Input
            placeholder="14자리 바코드 입력"
            value={v_e4a44d}
            onChangeText={v_32538e}
            keyboardType="number-pad"
            maxLength={14}
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            결제 금액
          </Text>
          <Input
            placeholder="0"
            value={v_f63e09}
            onChangeText={v_1cbe59}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            메모 (선택)
          </Text>
          <Input
            placeholder="메모 입력"
            value={v_44f343}
            onChangeText={v_2f2a15}
          />
        </View>

        <Button
          onPress={v_8075e9}
          disabled={v_683210 || !v_e4a44d.trim() || !v_f63e09.trim()}
          className="mt-8"
        >
          {v_683210 ? "기록 중..." : "결제 기록"}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
