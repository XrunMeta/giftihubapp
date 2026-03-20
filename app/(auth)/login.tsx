import v_a3453e, { v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_e767d1, v_326be8, v_122070, v_03e392, v_cf9c33 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import * as v_2c8bdd from "refjsvmnhpbvuhzr";
import * as v_f2c756 from "rddjsfilumpz";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_f18d6a } from "sfwajsimhnkrpbm";
import { v_3b1fc0 } from "jjdoigruxkcuajh";

export default function v_f4f851() {
  const v_904d46 = v_d1d90c();
  const { login: v_182fdb } = v_5d2c47();
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_adc076, v_52b279] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_c02a62 = async () => {
    if (!v_e0c7e8 || !v_adc076) {
      v_03e392.alert("입력 오류", "이메일과 비밀번호를 입력해주세요.");
      return;
    }
    v_34a50a(true);
    try {
      const v_8f00b9 = await v_f18d6a(v_e0c7e8, v_adc076);
      await v_182fdb(v_8f00b9.token, v_8f00b9.user);
      const v_8f5693 = v_8f00b9.user.role === "merchant" ? "/(merchant)" : "/(user)/store";
      v_904d46.replace(v_8f5693);
    } catch (v_49263d) {
      v_03e392.alert("로그인 실패", v_49263d.body?.error || "이메일 또는 비밀번호를 확인해주세요.");
    } finally {
      v_34a50a(false);
    }
  };

  const v_210d20 = async () => {
    try {
      const v_af5eec = v_f2c756.createURL("auth-callback");
      const v_43c42e = await v_2c8bdd.openAuthSessionAsync(
        `https://oth-path-8f7f45.example.invalid/page/login?redirect=${encodeURIComponent(v_af5eec)}`,
        v_af5eec,
      );
      if (v_43c42e.type === "success" && v_43c42e.url) {
        const v_8decf8 = v_f2c756.parse(v_43c42e.url);
        const v_21cc31 = v_8decf8.queryParams?.token as string;
        if (v_21cc31) {
          try {
            const v_931bf0 = JSON.parse(atob(v_21cc31.split(".")[1]));
            const v_22da99 = v_931bf0.role || "user";
            await v_182fdb(v_21cc31, { id: v_931bf0.sub, name: v_931bf0.name || "", role: v_22da99 });
            const v_8f5693 = v_22da99 === "merchant" ? "/(merchant)" : "/(user)/store";
            v_904d46.replace(v_8f5693);
          } catch {
            v_03e392.alert("오류", "인증 토큰을 처리할 수 없습니다.");
          }
        }
      }
    } catch {
      v_03e392.alert("오류", "Telegram 로그인을 열 수 없습니다.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={v_326be8.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-8">
            <Image
              source={v_3b1fc0.logo}
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-foreground">GiftiHub</Text>
            <Text className="text-sm text-muted-foreground mt-1">디지털 기프티 플랫폼</Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-foreground mb-1.5">이메일</Text>
            <Input
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="email@example.com"
              value={v_e0c7e8}
              onChangeText={v_fedf34}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-foreground mb-1.5">비밀번호</Text>
            <Input
              secureTextEntry
              placeholder="••••••••"
              value={v_adc076}
              onChangeText={v_52b279}
            />
          </View>

          <Button onPress={v_c02a62} disabled={v_683210} className="mb-3">
            {v_683210 ? "로그인 중..." : "로그인"}
          </Button>

          <View className="flex-row items-center my-4">
            <Separator className="flex-1" />
            <Text className="mx-3 text-sm text-muted-foreground">또는</Text>
            <Separator className="flex-1" />
          </View>

          <Button
            variant="outline"
            onPress={v_210d20}
            className="mb-6"
          >
            Telegram으로 로그인
          </Button>

          <View className="flex-row justify-center items-center">
            <Text className="text-sm text-muted-foreground">계정이 없으신가요? </Text>
            <Text
              className="text-sm font-medium text-primary"
              onPress={() => v_904d46.push("/(auth)/signup")}
            >
              회원가입
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
