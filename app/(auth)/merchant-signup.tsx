import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_6ba87b } from "sfwajsimhnkrpbm";
import { v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_03e392, v_e767d1, v_326be8, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_73ba8c() {
  const v_904d46 = v_d1d90c();
  const { t: v_8d41d7 } = v_678659();
  const { login: v_182fdb } = v_5d2c47();
  const [v_1833e7, v_318f24] = v_5ab095("");
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_adc076, v_52b279] = v_5ab095("");
  const [v_a0729e, v_459e0a] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_47ed2f = async () => {
    if (!v_1833e7 || !v_e0c7e8 || !v_adc076 || !v_a0729e) {
      v_03e392.alert(v_8d41d7("auth.merchantSignup.alertFieldTitle"), v_8d41d7("auth.merchantSignup.alertFieldBody"));
      return;
    }
    v_34a50a(true);
    try {
      const v_8f00b9 = await v_6ba87b(v_e0c7e8, v_adc076, `${v_a0729e} (${v_1833e7})`);
      await v_182fdb(v_8f00b9.token, v_8f00b9.user);
      v_03e392.alert(v_8d41d7("auth.merchantSignup.alertSuccessTitle"), v_8d41d7("auth.merchantSignup.alertSuccessBody"), [
        { text: v_8d41d7("auth.merchantSignup.ok"), onPress: () => v_904d46.replace("/(merchant)") },
      ]);
    } catch (v_49263d) {
      v_03e392.alert(v_8d41d7("auth.merchantSignup.alertFailTitle"), v_49263d.body?.error || v_8d41d7("auth.merchantSignup.alertFailBody"));
    } finally {
      v_34a50a(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={v_8d41d7("auth.merchantSignup.title")} />
      <KeyboardAvoidingView
        behavior={v_326be8.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          <View className="gap-4 mt-4">
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("auth.merchantSignup.businessName")}</Text>
              <Input placeholder={v_8d41d7("auth.merchantSignup.businessNamePh")} value={v_a0729e} onChangeText={v_459e0a} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("auth.merchantSignup.ownerName")}</Text>
              <Input placeholder={v_8d41d7("auth.merchantSignup.ownerNamePh")} value={v_1833e7} onChangeText={v_318f24} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("auth.merchantSignup.email")}</Text>
              <Input keyboardType="email-address" autoCapitalize="none" placeholder={v_8d41d7("auth.merchantSignup.emailPh")} value={v_e0c7e8} onChangeText={v_fedf34} />
            </View>
            <View>
              <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("auth.merchantSignup.password")}</Text>
              <Input secureTextEntry placeholder={v_8d41d7("auth.merchantSignup.passwordPh")} value={v_adc076} onChangeText={v_52b279} />
            </View>
          </View>

          <Button onPress={v_47ed2f} disabled={v_683210} className="mt-8">
            {v_683210 ? v_8d41d7("auth.merchantSignup.submitting") : v_8d41d7("auth.merchantSignup.submit")}
          </Button>

          <Text className="text-xs text-muted-foreground text-center mt-4">
            {v_8d41d7("auth.merchantSignup.footnote")}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
