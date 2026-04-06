import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_0e27e2 } from "pvulvehakmpzwkznlnd";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_03e392, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_cf96d1() {
  const v_904d46 = v_d1d90c();
  const { voucherId: v_ba63f8, voucherName: v_ec659d } = v_d1a7ac<{
    voucherId: string;
    voucherName: string;
  }>();
  const [v_980f9f, v_f96885] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_03fe4a = async () => {
    if (!v_980f9f.trim()) {
      v_03e392.alert("입력 오류", "받는 사람의 Telegram ID를 입력해주세요.");
      return;
    }
    if (!v_ba63f8) {
      v_03e392.alert("오류", "선물할 기프티를 선택해주세요.");
      return;
    }

    v_03e392.alert(
      "선물 확인",
      `"${v_ec659d || "기프티"}"를 Telegram ID: ${v_980f9f}에게 선물하시겠습니까?\n\n수수료가 부과될 수 있습니다.`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "선물하기",
          onPress: async () => {
            v_34a50a(true);
            try {
              const v_8f00b9 = await v_0e27e2(v_ba63f8, v_980f9f.trim());
              v_03e392.alert(
                "선물 완료",
                `기프티가 성공적으로 전송되었습니다.${v_8f00b9.fee > 0 ? `\n수수료: ${v_8f00b9.fee}원` : ""}`,
                [{ text: "확인", onPress: () => v_904d46.back() }],
              );
            } catch (v_49263d) {
              v_03e392.alert("선물 실패", v_49263d.body?.error || "다시 시도해주세요.");
            } finally {
              v_34a50a(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="선물하기" />
      <ScrollView className="flex-1 px-6">
        {v_ec659d ? (
          <View className="bg-card border border-border rounded-xl p-4 mt-4">
            <Text className="text-xs text-muted-foreground">선물할 기프티</Text>
            <Text className="text-base font-semibold text-foreground mt-1">
              {v_ec659d}
            </Text>
          </View>
        ) : null}

        <View className="mt-6">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            받는 사람 Telegram ID
          </Text>
          <Input
            placeholder="Telegram 사용자 ID 입력"
            value={v_980f9f}
            onChangeText={v_f96885}
            keyboardType="number-pad"
          />
          <Text className="text-xs text-muted-foreground mt-2">
            받는 사람의 Telegram 숫자 ID를 입력해주세요.
          </Text>
        </View>

        <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6">
          <Text className="text-sm font-medium text-amber-600">⚠️ 주의사항</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            • 선물 후에는 취소할 수 없습니다.{"\n"}
            • 받는 사람이 GiftiHub에 가입되어 있어야 합니다.{"\n"}
            • 수수료가 부과될 수 있습니다.
          </Text>
        </View>

        <Button
          onPress={v_03fe4a}
          disabled={v_683210 || !v_980f9f.trim()}
          className="mt-8"
        >
          {v_683210 ? "전송 중..." : "선물 보내기"}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
