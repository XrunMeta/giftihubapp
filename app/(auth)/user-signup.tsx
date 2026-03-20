import v_a3453e, { v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_e767d1, v_326be8, v_122070, v_03e392 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_6ba87b } from "sfwajsimhnkrpbm";

export default function v_7a7473() {
  const v_904d46 = v_d1d90c();
  const { login: v_182fdb } = v_5d2c47();
  const [v_1833e7, v_318f24] = v_5ab095("");
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_adc076, v_52b279] = v_5ab095("");
  const [v_0b3ebe, v_241a35] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_47ed2f = async () => {
    if (!v_1833e7 || !v_e0c7e8 || !v_adc076) {
      v_03e392.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }
    if (v_adc076 !== v_0b3ebe) {
      v_03e392.alert("입력 오류", "비밀번호가 일치하지 않습니다.");
      return;
    }
    v_34a50a(true);
    try {
      const v_8f00b9 = await v_6ba87b(v_e0c7e8, v_adc076, v_1833e7);
      await v_182fdb(v_8f00b9.token, v_8f00b9.user);
      v_03e392.alert("회원가입 완료", "회원가입이 완료되었습니다!", [
        { text: "확인", onPress: () => v_904d46.replace("/(user)/store") },
      ]);
    } catch (v_49263d) {
      v_03e392.alert("가입 실패", v_49263d.body?.error || "다시 시도해주세요.");
    } finally {
      v_34a50a(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="사용자 회원가입" />
      <KeyboardAvoidingView
        behavior={v_326be8.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          <View className="gap-4 mt-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">이름</Text>
              <Input placeholder="홍길동" value={v_1833e7} onChangeText={v_318f24} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">이메일</Text>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="email@example.com"
                value={v_e0c7e8}
                onChangeText={v_fedf34}
              />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">비밀번호</Text>
              <Input secureTextEntry placeholder="8자 이상" value={v_adc076} onChangeText={v_52b279} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">비밀번호 확인</Text>
              <Input secureTextEntry placeholder="비밀번호 재입력" value={v_0b3ebe} onChangeText={v_241a35} />
            </View>
          </View>

          <Button onPress={v_47ed2f} disabled={v_683210} className="mt-8">
            {v_683210 ? "가입 중..." : "가입하기"}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
