import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";

type PwStep = "idle" | "otpSent" | "otpVerified";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const alert = useAlertShim();
  const { t } = useI18n();
  const { user } = useAuth();

  const [pwStep, setPwStep] = useState<PwStep>("idle");
  const [otpCode, setOtpCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [saving, setSaving] = useState(false);

  const startOtpFlow = async () => {
    if (!user?.email) return;
    setSaving(true);
    try {
      await apiFetch("/oth-path", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
      });
      setPwStep("otpSent");
    } catch (err: any) {
      alert(t("settings.profile.failTitle"), String(err?.body?.error ?? err?.message ?? err));
    } finally {
      setSaving(false);
    }
  };

  const verifyOtp = async () => {
    if (!otpCode.trim() || !user?.email) return;
    setSaving(true);
    try {
      const res = await apiFetch<{ token: string }>("/oth-path", {
        method: "POST",
        body: JSON.stringify({ email: user.email, code: otpCode.trim() }),
      });
      setResetToken(res.token);
      setPwStep("otpVerified");
    } catch (err: any) {
      alert(t("settings.profile.failTitle"), String(err?.body?.error ?? err?.message ?? err));
    } finally {
      setSaving(false);
    }
  };

  const saveNewPassword = async () => {
    if (!newPw || !confirmPw) {
      alert(t("settings.profile.pwFillTitle"), t("settings.profile.pwFillBody"));
      return;
    }
    if (newPw !== confirmPw) {
      alert(t("settings.profile.pwMismatchTitle"), t("settings.profile.pwMismatchBody"));
      return;
    }
    if (newPw.length < 6) {
      alert(t("settings.profile.pwShortTitle"), t("settings.profile.pwShortBody"));
      return;
    }
    setSaving(true);
    try {
      await apiFetch("/oth-path", {
        method: "PATCH",
        body: JSON.stringify({ new_password: newPw }),
        headers: { Authorization: `Bearer ${resetToken}` },
      });
      setPwStep("idle");
      setOtpCode("");
      setResetToken("");
      setNewPw("");
      setConfirmPw("");
      alert(t("settings.profile.pwSavedTitle"), t("settings.profile.pwSavedBody"));
    } catch (err: any) {
      alert(t("settings.profile.failTitle"), String(err?.body?.error ?? err?.message ?? err));
    } finally {
      setSaving(false);
    }
  };

  const cancelPwFlow = () => {
    setPwStep("idle");
    setOtpCode("");
    setResetToken("");
    setNewPw("");
    setConfirmPw("");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={t("settings.password.title")} onBackPress={() => router.navigate("/(user)/mypage")} />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="bg-white rounded-xl border border-border p-4">
          <Text className="text-sm text-muted-foreground mb-4">
            {t("settings.password.hint")}
          </Text>

          {pwStep === "idle" && (
            <Button onPress={startOtpFlow} disabled={saving}>
              <Text className="text-primary-foreground font-semibold">
                {saving ? t("settings.profile.saving") : t("settings.password.sendOtp")}
              </Text>
            </Button>
          )}

          {pwStep === "otpSent" && (
            <>
              <Text className="text-xs text-muted-foreground mb-2">
                {t("settings.password.otpSentBody")}
              </Text>
              <TextInput
                value={otpCode}
                onChangeText={setOtpCode}
                className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-3"
                placeholder={t("auth.otpPlaceholder")}
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={6}
              />
              <View className="flex-row gap-2">
                <Button variant="outline" onPress={cancelPwFlow} className="flex-1">
                  <Text className="text-foreground font-semibold">{t("common.cancel")}</Text>
                </Button>
                <Button onPress={verifyOtp} disabled={saving} className="flex-1">
                  <Text className="text-primary-foreground font-semibold">
                    {saving ? t("settings.profile.saving") : t("auth.verifyOtp")}
                  </Text>
                </Button>
              </View>
            </>
          )}

          {pwStep === "otpVerified" && (
            <>
              <Text className="text-xs text-muted-foreground mb-1">{t("settings.profile.newPw")}</Text>
              <TextInput
                value={newPw}
                onChangeText={setNewPw}
                secureTextEntry
                className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-3"
                placeholderTextColor="#999"
              />
              <Text className="text-xs text-muted-foreground mb-1">{t("settings.profile.confirmPw")}</Text>
              <TextInput
                value={confirmPw}
                onChangeText={setConfirmPw}
                secureTextEntry
                className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-4"
                placeholderTextColor="#999"
              />
              <View className="flex-row gap-2">
                <Button variant="outline" onPress={cancelPwFlow} className="flex-1">
                  <Text className="text-foreground font-semibold">{t("common.cancel")}</Text>
                </Button>
                <Button onPress={saveNewPassword} disabled={saving} className="flex-1">
                  <Text className="text-primary-foreground font-semibold">
                    {saving ? t("settings.profile.saving") : t("settings.profile.savePassword")}
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
