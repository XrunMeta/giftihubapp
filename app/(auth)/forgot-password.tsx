import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_de06a3, v_c4deb2, v_e662ae, v_5ab095 } from "bapkr";
import { v_e767d1, v_326be8, v_122070, v_19b633, v_79c4f2, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";

export default function v_040c8f() {
  const v_904d46 = v_d1d90c();
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const { login: v_182fdb } = v_5d2c47();

  const [v_729796, v_fd7d1f] = v_5ab095<1 | 2>(1);
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_c99bd2, v_537cbb] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);
  const [v_6b5f5e, v_f269b4] = v_5ab095(0);
  const v_1e1f71 = v_e662ae<ReturnType<typeof setInterval> | null>(null);
  const v_756f7e = v_e662ae<v_79c4f2>(null);

  v_c4deb2(() => {
    if (v_6b5f5e <= 0) {
      if (v_1e1f71.current) clearInterval(v_1e1f71.current);
      return;
    }
    v_1e1f71.current = setInterval(() => {
      v_f269b4((v_ba2215) => {
        if (v_ba2215 <= 1) {
          if (v_1e1f71.current) clearInterval(v_1e1f71.current);
          return 0;
        }
        return v_ba2215 - 1;
      });
    }, 1000);
    return () => {
      if (v_1e1f71.current) clearInterval(v_1e1f71.current);
    };
  }, [v_6b5f5e]);

  const v_894a7c = v_de06a3(async () => {
    if (!v_e0c7e8.trim()) {
      v_5c50c0(v_8d41d7("auth.login.alertInputTitle"), v_8d41d7("auth.forgotPasswordEmailRequired"));
      return;
    }
    v_34a50a(true);
    try {
      await v_bc1b24("/oth-path", {
        method: "POST",
        body: JSON.stringify({ email: v_e0c7e8.trim() }),
        skipAuth: true,
      });
      v_fd7d1f(2);
      v_f269b4(60);
      setTimeout(() => v_756f7e.current?.focus(), 300);
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("settings.profile.failTitle"), v_49263d?.body?.error || v_8d41d7("auth.forgotPasswordFail"));
    } finally {
      v_34a50a(false);
    }
  }, [v_e0c7e8, v_5c50c0, v_8d41d7]);

  const v_7188c4 = v_de06a3(async () => {
    if (v_c99bd2.length !== 6) return;
    v_34a50a(true);
    try {
      const v_8f00b9 = await v_bc1b24<{ token: string; user: { id: string; name: string; role: "user" | "merchant" } }>(
        "/oth-path",
        {
          method: "POST",
          body: JSON.stringify({ email: v_e0c7e8.trim(), code: v_c99bd2 }),
          skipAuth: true,
        },
      );
      await v_182fdb(v_8f00b9.token, v_8f00b9.user);
      const v_8f5693 = v_8f00b9.user.role === "merchant" ? "/(merchant)" : "/(user)/store";
      v_904d46.replace(v_8f5693);
    } catch (v_49263d) {
      const v_4d33b2 = v_49263d?.body as { error?: string; remaining_attempts?: number } | null;
      const v_badeaf = v_4d33b2?.error || v_8d41d7("auth.verifyOtpFail");
      const v_916658 = v_4d33b2?.remaining_attempts;
      const v_3cfdfc = v_916658 != null ? `${v_badeaf} (${v_8d41d7("auth.remainingAttempts").replace("{{count}}", String(v_916658))})` : v_badeaf;
      v_5c50c0(v_8d41d7("settings.profile.failTitle"), v_3cfdfc);
    } finally {
      v_34a50a(false);
    }
  }, [v_c99bd2, v_e0c7e8, v_5c50c0, v_8d41d7, v_182fdb, v_904d46]);

  const v_cf9840 = v_de06a3(async () => {
    if (v_6b5f5e > 0) return;
    v_34a50a(true);
    try {
      await v_bc1b24("/oth-path", {
        method: "POST",
        body: JSON.stringify({ email: v_e0c7e8.trim() }),
        skipAuth: true,
      });
      v_f269b4(60);
      v_537cbb("");
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("settings.profile.failTitle"), v_49263d?.body?.error || v_8d41d7("auth.forgotPasswordFail"));
    } finally {
      v_34a50a(false);
    }
  }, [v_6b5f5e, v_e0c7e8, v_5c50c0, v_8d41d7]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <PageHeader title={v_8d41d7("auth.forgotPasswordTitle")} fallbackHref="/(auth)/login" />
      <KeyboardAvoidingView
        behavior={v_326be8.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          {v_729796 === 1 && (
            <View className="mt-4">
              <Text className="text-sm text-muted-foreground mb-4">{v_8d41d7("auth.forgotPasswordHint")}</Text>
              <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("auth.login.email")}</Text>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={v_8d41d7("auth.login.emailPh")}
                value={v_e0c7e8}
                onChangeText={v_fedf34}
                editable={!v_683210}
              />
              <Button onPress={v_894a7c} disabled={v_683210} className="mt-4">
                {v_683210 ? v_8d41d7("settings.profile.saving") : v_8d41d7("auth.sendOtp")}
              </Button>
            </View>
          )}

          {v_729796 === 2 && (
            <View className="mt-4">
              <Text className="text-sm text-muted-foreground mb-4">
                {v_8d41d7("auth.otpSent").replace("{{email}}", v_e0c7e8.trim())}
              </Text>
              <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("auth.otpPlaceholder")}</Text>
              <TextInput
                ref={v_756f7e}
                keyboardType="number-pad"
                maxLength={6}
                value={v_c99bd2}
                onChangeText={v_537cbb}
                className="bg-white border border-border rounded-lg px-4 py-3 text-foreground text-2xl text-center tracking-[12px] font-mono"
                placeholderTextColor="#999"
                placeholder="000000"
                editable={!v_683210}
              />
              <Button onPress={v_7188c4} disabled={v_683210 || v_c99bd2.length !== 6} className="mt-4">
                {v_683210 ? v_8d41d7("settings.profile.saving") : v_8d41d7("auth.verifyOtp")}
              </Button>

              <View className="mt-4 items-center">
                {v_6b5f5e > 0 ? (
                  <Text className="text-sm text-muted-foreground">
                    {v_8d41d7("auth.resendWait").replace("{{seconds}}", String(v_6b5f5e))}
                  </Text>
                ) : (
                  <Text className="text-sm text-primary" onPress={v_cf9840}>
                    {v_8d41d7("auth.resendOtp")}
                  </Text>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
