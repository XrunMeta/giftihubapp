import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_122070, v_19b633, v_79c4f2, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";

type PwStep = "idle" | "otpSent" | "otpVerified";

export default function v_18d397() {
  const v_5c50c0 = v_2bd2c5();
  const { t: v_8d41d7 } = v_678659();
  const { user: v_625c74 } = v_5d2c47();

  const [v_31e6dc, v_c3aa7b] = v_5ab095<PwStep>("idle");
  const [v_aa596d, v_f07cc4] = v_5ab095("");
  const [v_9e250d, v_77f83f] = v_5ab095("");
  const [v_ad707a, v_442688] = v_5ab095("");
  const [v_330f05, v_3d8c17] = v_5ab095("");
  const [v_35bf26, v_04e389] = v_5ab095(false);

  const v_fbbcd9 = async () => {
    if (!v_625c74?.email) return;
    v_04e389(true);
    try {
      await v_bc1b24("/oth-path", {
        method: "POST",
        body: JSON.stringify({ email: v_625c74.email }),
      });
      v_c3aa7b("otpSent");
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("settings.profile.failTitle"), String(v_49263d?.body?.error ?? v_49263d?.message ?? v_49263d));
    } finally {
      v_04e389(false);
    }
  };

  const v_b32e65 = async () => {
    if (!v_aa596d.trim() || !v_625c74?.email) return;
    v_04e389(true);
    try {
      const v_8f00b9 = await v_bc1b24<{ token: string }>("/oth-path", {
        method: "POST",
        body: JSON.stringify({ email: v_625c74.email, code: v_aa596d.trim() }),
      });
      v_77f83f(v_8f00b9.token);
      v_c3aa7b("otpVerified");
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("settings.profile.failTitle"), String(v_49263d?.body?.error ?? v_49263d?.message ?? v_49263d));
    } finally {
      v_04e389(false);
    }
  };

  const v_56e3b0 = async () => {
    if (!v_ad707a || !v_330f05) {
      v_5c50c0(v_8d41d7("settings.profile.pwFillTitle"), v_8d41d7("settings.profile.pwFillBody"));
      return;
    }
    if (v_ad707a !== v_330f05) {
      v_5c50c0(v_8d41d7("settings.profile.pwMismatchTitle"), v_8d41d7("settings.profile.pwMismatchBody"));
      return;
    }
    if (v_ad707a.length < 6) {
      v_5c50c0(v_8d41d7("settings.profile.pwShortTitle"), v_8d41d7("settings.profile.pwShortBody"));
      return;
    }
    v_04e389(true);
    try {
      await v_bc1b24("/oth-path", {
        method: "PATCH",
        body: JSON.stringify({ new_password: v_ad707a }),
        headers: { Authorization: `Bearer ${v_9e250d}` },
      });
      v_c3aa7b("idle");
      v_f07cc4("");
      v_77f83f("");
      v_442688("");
      v_3d8c17("");
      v_5c50c0(v_8d41d7("settings.profile.pwSavedTitle"), v_8d41d7("settings.profile.pwSavedBody"));
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("settings.profile.failTitle"), String(v_49263d?.body?.error ?? v_49263d?.message ?? v_49263d));
    } finally {
      v_04e389(false);
    }
  };

  const v_1da962 = () => {
    v_c3aa7b("idle");
    v_f07cc4("");
    v_77f83f("");
    v_442688("");
    v_3d8c17("");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={v_8d41d7("settings.password.title")} showBack />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="bg-white rounded-xl border border-border p-4">
          <Text className="text-sm text-muted-foreground mb-4">
            {v_8d41d7("settings.password.hint")}
          </Text>

          {v_31e6dc === "idle" && (
            <Button onPress={v_fbbcd9} disabled={v_35bf26}>
              <Text className="text-primary-foreground font-semibold">
                {v_35bf26 ? v_8d41d7("settings.profile.saving") : v_8d41d7("settings.password.sendOtp")}
              </Text>
            </Button>
          )}

          {v_31e6dc === "otpSent" && (
            <>
              <Text className="text-xs text-muted-foreground mb-2">
                {v_8d41d7("settings.password.otpSentBody")}
              </Text>
              <TextInput
                value={v_aa596d}
                onChangeText={v_f07cc4}
                className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-3"
                placeholder={v_8d41d7("auth.otpPlaceholder")}
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={6}
              />
              <View className="flex-row gap-2">
                <Button variant="outline" onPress={v_1da962} className="flex-1">
                  <Text className="text-foreground font-semibold">{v_8d41d7("common.cancel")}</Text>
                </Button>
                <Button onPress={v_b32e65} disabled={v_35bf26} className="flex-1">
                  <Text className="text-primary-foreground font-semibold">
                    {v_35bf26 ? v_8d41d7("settings.profile.saving") : v_8d41d7("auth.verifyOtp")}
                  </Text>
                </Button>
              </View>
            </>
          )}

          {v_31e6dc === "otpVerified" && (
            <>
              <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("settings.profile.newPw")}</Text>
              <TextInput
                value={v_ad707a}
                onChangeText={v_442688}
                secureTextEntry
                className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-3"
                placeholderTextColor="#999"
              />
              <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("settings.profile.confirmPw")}</Text>
              <TextInput
                value={v_330f05}
                onChangeText={v_3d8c17}
                secureTextEntry
                className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-4"
                placeholderTextColor="#999"
              />
              <View className="flex-row gap-2">
                <Button variant="outline" onPress={v_1da962} className="flex-1">
                  <Text className="text-foreground font-semibold">{v_8d41d7("common.cancel")}</Text>
                </Button>
                <Button onPress={v_56e3b0} disabled={v_35bf26} className="flex-1">
                  <Text className="text-primary-foreground font-semibold">
                    {v_35bf26 ? v_8d41d7("settings.profile.saving") : v_8d41d7("settings.profile.savePassword")}
                  </Text>
                </Button>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
