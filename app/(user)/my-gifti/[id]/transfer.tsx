import v_a3453e, { v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_03e392 } from "rcmrninabrnb";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_2b01b0 } from "pvulvehakmpzwkznlnd";

export default function v_7f792b() {
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_eb5366 = async () => {
    if (!v_e0c7e8) {
      v_03e392.alert("입력 오류", "수신자 이메일을 입력해주세요.");
      return;
    }
    v_03e392.alert("양도 확인", `${v_e0c7e8}에게 기프티를 양도하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      {
        text: "양도",
        onPress: async () => {
          v_34a50a(true);
          try {
            await v_2b01b0(v_389afb!, v_e0c7e8);
            v_03e392.alert("완료", "기프티가 양도되었습니다.", [
              { text: "확인", onPress: () => v_904d46.back() },
            ]);
          } catch (v_49263d) {
            v_03e392.alert("실패", v_49263d.body?.error || "양도에 실패했습니다.");
          } finally {
            v_34a50a(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="기프티 양도" />
      <View className="flex-1 px-5 mt-4">
        <Text className="text-sm font-medium text-foreground mb-1.5">수신자 이메일</Text>
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="recipient@example.com"
          value={v_e0c7e8}
          onChangeText={v_fedf34}
        />
        <Text className="text-xs text-muted-foreground mt-2">
          양도 후에는 취소할 수 없습니다.
        </Text>
        <Button onPress={v_eb5366} disabled={v_683210} className="mt-6">
          {v_683210 ? "양도 중..." : "양도하기"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
