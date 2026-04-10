import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_48dd6f, v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_7ef860, v_5a0760 } from "eqrxxpgqjbwbqqqhvy";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_3ebb07 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_09d0e5, v_122070, v_19b633, v_79c4f2, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";

type PwStep = "idle" | "otpSent" | "otpVerified";

export default function v_b0ed53() {
  const v_5c50c0 = v_2bd2c5();
  const { locale: v_6f298b, setLocale: v_1e48df, t: v_8d41d7 } = v_678659();
  const { user: v_625c74, updateUser: v_19fcbf } = v_5d2c47();
  const [v_1833e7, v_318f24] = v_5ab095(v_625c74?.name ?? "");
  const [v_a2ffce, v_86a808] = v_5ab095(false);
  const [v_4270b4, v_08365d] = v_5ab095(false);

  const [v_31e6dc, v_c3aa7b] = v_5ab095<PwStep>("idle");
  const [v_aa596d, v_f07cc4] = v_5ab095("");
  const [v_9e250d, v_77f83f] = v_5ab095("");
  const [v_ad707a, v_442688] = v_5ab095("");
  const [v_330f05, v_3d8c17] = v_5ab095("");
  const [v_ff0cf4, v_840016] = v_5ab095(false);

  v_c4deb2(() => {
    v_7ef860()
      .then((v_8f00b9) => {
        v_318f24(v_8f00b9.user.name ?? "");
        v_86a808(!!v_8f00b9.user.has_password);
        if (v_625c74) v_19fcbf({ ...v_625c74, name: v_8f00b9.user.name ?? v_625c74.name });
      })
      .catch(() => {});

  }, []);

  const v_cf7dad = async () => {
    const v_2f361a = v_1833e7.trim();
    if (!v_2f361a) {
      v_5c50c0(v_8d41d7("settings.profile.nameRequiredTitle"), v_8d41d7("settings.profile.nameRequiredBody"));
      return;
    }
    v_08365d(true);
    try {
      await v_5a0760({ name: v_2f361a });
      if (v_625c74) v_19fcbf({ ...v_625c74, name: v_2f361a });
      v_5c50c0(v_8d41d7("settings.profile.savedTitle"), v_8d41d7("settings.profile.savedBody"));
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("settings.profile.failTitle"), String(v_49263d?.body?.error ?? v_49263d?.message ?? v_49263d));
    } finally {
      v_08365d(false);
    }
  };

  const v_fbbcd9 = () => {
    if (!v_625c74?.email) return;
    v_5c50c0(v_8d41d7("settings.password.otpConfirmTitle"), v_8d41d7("settings.password.otpConfirmBody"), [
      { text: v_8d41d7("common.cancel"), style: "cancel" },
      {
        text: v_8d41d7("common.confirm"),
        onPress: async () => {
          try {
            await v_bc1b24("/oth-path", {
              method: "POST",
              body: JSON.stringify({ email: v_625c74.email }),
            });
            v_c3aa7b("otpSent");
          } catch (v_49263d) {
            v_5c50c0(v_8d41d7("settings.profile.failTitle"), String(v_49263d?.body?.error ?? v_49263d?.message ?? v_49263d));
          }
        },
      },
    ]);
  };

  const v_b32e65 = async () => {
    if (!v_aa596d.trim() || !v_625c74?.email) return;
    v_840016(true);
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
      v_840016(false);
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
    v_840016(true);
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
      v_840016(false);
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
      <PageHeader title={v_8d41d7("settings.title")} />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
        {}
        <Text className="text-base font-semibold text-foreground mb-1">{v_8d41d7("settings.profile.title")}</Text>
        <Text className="text-sm text-muted-foreground mb-3">{v_8d41d7("settings.profile.hint")}</Text>
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("settings.profile.nameLabel")}</Text>
          <TextInput
            value={v_1833e7}
            onChangeText={v_318f24}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-3"
            placeholder={v_8d41d7("settings.profile.namePh")}
            placeholderTextColor="#999"
            maxLength={50}
          />
          <Button onPress={v_cf7dad} disabled={v_4270b4}>
            <Text className="text-primary-foreground font-semibold">
              {v_4270b4 ? v_8d41d7("settings.profile.saving") : v_8d41d7("settings.profile.saveName")}
            </Text>
          </Button>
        </View>

        {}
        {v_625c74?.email && (
          <View className="bg-white rounded-xl border border-border p-4 mb-6">
            <Text className="text-sm font-semibold text-foreground mb-3">{v_8d41d7("settings.profile.pwTitle")}</Text>

            {v_31e6dc === "idle" && (
              <Button onPress={v_fbbcd9}>
                <Text className="text-primary-foreground font-semibold">
                  {v_8d41d7("settings.password.change")}
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
                  <Button onPress={v_b32e65} disabled={v_ff0cf4} className="flex-1">
                    <Text className="text-primary-foreground font-semibold">
                      {v_ff0cf4 ? v_8d41d7("settings.profile.saving") : v_8d41d7("auth.verifyOtp")}
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
                  <Button onPress={v_56e3b0} disabled={v_ff0cf4} className="flex-1">
                    <Text className="text-primary-foreground font-semibold">
                      {v_ff0cf4 ? v_8d41d7("settings.profile.saving") : v_8d41d7("settings.profile.savePassword")}
                    </Text>
                  </Button>
                </View>
              </>
            )}
          </View>
        )}

        {}
        <Text className="text-base font-semibold text-foreground mb-1">{v_8d41d7("settings.language")}</Text>
        <Text className="text-sm text-muted-foreground mb-4">{v_8d41d7("settings.languageHint")}</Text>
        <View className="bg-card rounded-xl border border-border overflow-hidden">
          {v_48dd6f.map((v_68b2be, v_a56041) => {
            const v_587413 = v_6f298b === v_68b2be.code;
            return (
              <View key={v_68b2be.code}>
                {v_a56041 > 0 ? <View className="h-px bg-border mx-4" /> : null}
                <Pressable
                  className={`flex-row items-center justify-between px-4 py-4 ${v_587413 ? "bg-primary/5" : ""}`}
                  onPress={() => v_1e48df(v_68b2be.code)}
                >
                  <Text className={`text-base ${v_587413 ? "font-semibold text-primary" : "text-foreground"}`}>
                    {v_68b2be.nativeName}
                  </Text>
                  {v_587413 ? <Check size={22} color="#CE3630" /> : null}
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
