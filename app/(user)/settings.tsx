import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LOCALE_OPTIONS, useI18n } from "@/context/I18nContext";
import { getMe, updateProfile } from "@/services/account";
import { apiFetch } from "@/services/api";
import { Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";

type PwStep = "idle" | "otpSent" | "otpVerified";

export default function UserSettingsScreen() {
  const alert = useAlertShim();
  const { locale, setLocale, t } = useI18n();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [hasPassword, setHasPassword] = useState(false);
  const [savingName, setSavingName] = useState(false);

  const [pwStep, setPwStep] = useState<PwStep>("idle");
  const [otpCode, setOtpCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  useEffect(() => {
    getMe()
      .then((res) => {
        setName(res.user.name ?? "");
        setHasPassword(!!res.user.has_password);
        if (user) updateUser({ ...user, name: res.user.name ?? user.name });
      })
      .catch(() => {});

  }, []);

  const saveName = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      alert(t("settings.profile.nameRequiredTitle"), t("settings.profile.nameRequiredBody"));
      return;
    }
    setSavingName(true);
    try {
      await updateProfile({ name: trimmed });
      if (user) updateUser({ ...user, name: trimmed });
      alert(t("settings.profile.savedTitle"), t("settings.profile.savedBody"));
    } catch (err: any) {
      alert(t("settings.profile.failTitle"), String(err?.body?.error ?? err?.message ?? err));
    } finally {
      setSavingName(false);
    }
  };

  const startOtpFlow = () => {
    if (!user?.email) return;
    alert(t("settings.password.otpConfirmTitle"), t("settings.password.otpConfirmBody"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.confirm"),
        onPress: async () => {
          try {
            await apiFetch("/oth-path", {
              method: "POST",
              body: JSON.stringify({ email: user.email }),
            });
            setPwStep("otpSent");
          } catch (err: any) {
            alert(t("settings.profile.failTitle"), String(err?.body?.error ?? err?.message ?? err));
          }
        },
      },
    ]);
  };

  const verifyOtp = async () => {
    if (!otpCode.trim() || !user?.email) return;
    setSavingPw(true);
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
      setSavingPw(false);
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
    setSavingPw(true);
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
      setSavingPw(false);
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
      <PageHeader title={t("settings.title")} />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
        {}
        <Text className="text-base font-semibold text-foreground mb-1">{t("settings.profile.title")}</Text>
        <Text className="text-sm text-muted-foreground mb-3">{t("settings.profile.hint")}</Text>
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-xs text-muted-foreground mb-1">{t("settings.profile.nameLabel")}</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-3"
            placeholder={t("settings.profile.namePh")}
            placeholderTextColor="#999"
            maxLength={50}
          />
          <Button onPress={saveName} disabled={savingName}>
            <Text className="text-primary-foreground font-semibold">
              {savingName ? t("settings.profile.saving") : t("settings.profile.saveName")}
            </Text>
          </Button>
        </View>

        {}
        {user?.email && (
          <View className="bg-white rounded-xl border border-border p-4 mb-6">
            <Text className="text-sm font-semibold text-foreground mb-3">{t("settings.profile.pwTitle")}</Text>

            {pwStep === "idle" && (
              <Button onPress={startOtpFlow}>
                <Text className="text-primary-foreground font-semibold">
                  {t("settings.password.change")}
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
                  <Button onPress={verifyOtp} disabled={savingPw} className="flex-1">
                    <Text className="text-primary-foreground font-semibold">
                      {savingPw ? t("settings.profile.saving") : t("auth.verifyOtp")}
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
                  <Button onPress={saveNewPassword} disabled={savingPw} className="flex-1">
                    <Text className="text-primary-foreground font-semibold">
                      {savingPw ? t("settings.profile.saving") : t("settings.profile.savePassword")}
                    </Text>
                  </Button>
                </View>
              </>
            )}
          </View>
        )}

        {}
        <Text className="text-base font-semibold text-foreground mb-1">{t("settings.language")}</Text>
        <Text className="text-sm text-muted-foreground mb-4">{t("settings.languageHint")}</Text>
        <View className="bg-card rounded-xl border border-border overflow-hidden">
          {LOCALE_OPTIONS.map((opt, index) => {
            const selected = locale === opt.code;
            return (
              <View key={opt.code}>
                {index > 0 ? <View className="h-px bg-border mx-4" /> : null}
                <Pressable
                  className={`flex-row items-center justify-between px-4 py-4 ${selected ? "bg-primary/5" : ""}`}
                  onPress={() => setLocale(opt.code)}
                >
                  <Text className={`text-base ${selected ? "font-semibold text-primary" : "text-foreground"}`}>
                    {opt.nativeName}
                  </Text>
                  {selected ? <Check size={22} color="#CE3630" /> : null}
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
