import { v_3b1fc0 } from "jjdoigruxkcuajh";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_f589a4 } from "wplnrzxbcvjvxjmndcjr";
import { v_a42750, v_e48e3a, v_2737f4, v_665fe7, v_c9e410, v_99916a, v_d28c4c, v_331b40 } from "tlrvzsbmctdavs";
import { v_f18d6a } from "sfwajsimhnkrpbm";
import * as v_f2c756 from "rddjsfilumpz";
import { v_d1d90c } from "rkmroqyctko";
import * as v_2c8bdd from "refjsvmnhpbvuhzr";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_03e392, v_cf9c33, v_e767d1, v_326be8, v_09d0e5, v_122070, v_79139e, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_f4f851() {
  const v_904d46 = v_d1d90c();
  const { login: v_182fdb } = v_5d2c47();
  const v_1d0b37 = v_f589a4();
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_adc076, v_52b279] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);
  const [v_a964a4, v_325cf5] = v_5ab095(true);
  const [v_b7fbdb, v_907ac3] = v_5ab095<"local" | "remote">(v_665fe7());

  v_c4deb2(() => {
    (async () => {
      const v_39de0e = await v_2737f4();
      if (v_39de0e) v_fedf34(v_39de0e);
      const v_efe339 = await v_e48e3a();
      v_325cf5(v_efe339);
    })();
  }, []);

  const v_c02a62 = async () => {
    if (!v_e0c7e8 || !v_adc076) {
      v_03e392.alert("입력 오류", "이메일과 비밀번호를 입력해주세요.");
      return;
    }
    v_34a50a(true);
    try {
      const v_8f00b9 = await v_f18d6a(v_e0c7e8, v_adc076);
      await v_99916a(v_a964a4);
      if (v_a964a4) {
        await v_d28c4c(v_e0c7e8);
      } else {
        await v_c9e410();
      }
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
            await v_99916a(v_a964a4);
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={v_326be8.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: "space-between" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-start mb-8 flex-grow-1">
            <Image
              source={v_3b1fc0.logo}
              className="w-[140px] h-[60px]"
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-foreground">GiftHub에 오신 것을{"\n"}
              환영합니다
            </Text>
            <Text className="text-sm text-muted-foreground mt-1">디지털 기프티 플랫폼</Text>
          </View>

          <View >
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

            <View className="mb-4">
              <Text className="text-sm font-medium text-foreground mb-1.5">비밀번호</Text>
              <Input
                secureTextEntry
                placeholder="••••••••"
                value={v_adc076}
                onChangeText={v_52b279}
              />
            </View>

            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-sm text-muted-foreground">로그인 유지</Text>
              <Switch
                value={v_a964a4}
                onValueChange={v_325cf5}
                trackColor={{ false: "#d4d4d4", true: "#CE3630" }}
                thumbColor="#ffffff"
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

            {v_1d0b37 && (
              <View className="mt-6 border border-dashed border-muted-foreground/30 rounded-xl p-3">
                {}
                <View className="flex-row gap-2 mb-2">
                  <Pressable
                    className={`flex-1 rounded-lg px-3 py-2 items-center ${v_b7fbdb === "local" ? "bg-amber-500" : "bg-secondary/50"}`}
                    onPress={async () => { await v_331b40("local"); v_907ac3("local"); }}
                  >
                    <Text className={`text-xs font-bold ${v_b7fbdb === "local" ? "text-white" : "text-muted-foreground"}`}>LOCAL</Text>
                  </Pressable>
                  <Pressable
                    className={`flex-1 rounded-lg px-3 py-2 items-center ${v_b7fbdb === "remote" ? "bg-green-500" : "bg-secondary/50"}`}
                    onPress={async () => { await v_331b40("remote"); v_907ac3("remote"); }}
                  >
                    <Text className={`text-xs font-bold ${v_b7fbdb === "remote" ? "text-white" : "text-muted-foreground"}`}>REMOTE</Text>
                  </Pressable>
                </View>
                <Text className="text-xs font-mono text-center text-muted-foreground mb-2" selectable>
                  {v_a42750()}
                </Text>

                <Text className="text-xs text-muted-foreground text-center mb-2">DEV 빠른 로그인</Text>
                <View className="flex-row gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onPress={() => { v_fedf34("email@example.com"); v_52b279("1234"); }}
                  >
                    <Text className="text-sm font-medium text-foreground">사용자</Text>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onPress={() => { v_fedf34("oth-test@example.invalid"); v_52b279("1234"); }}
                  >
                    <Text className="text-sm font-medium text-foreground">상점</Text>
                  </Button>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
