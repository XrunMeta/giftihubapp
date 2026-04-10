import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LOCALE_OPTIONS, useI18n } from "@/context/I18nContext";
import { getMe, updateProfile } from "@/services/account";
import { Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function UserSettingsScreen() {
  const alert = useAlertShim();
  const { locale, setLocale, t } = useI18n();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [hasPassword, setHasPassword] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [savingName, setSavingName] = useState(false);
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

  const savePassword = async () => {
    if (!currentPw || !newPw || !confirmPw) {
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
      await updateProfile({ current_password: currentPw, new_password: newPw });
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      alert(t("settings.profile.pwSavedTitle"), t("settings.profile.pwSavedBody"));
    } catch (err: any) {
      alert(t("settings.profile.failTitle"), String(err?.body?.error ?? err?.message ?? err));
    } finally {
      setSavingPw(false);
    }
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
        {hasPassword && (
          <View className="bg-white rounded-xl border border-border p-4 mb-6">
            <Text className="text-sm font-semibold text-foreground mb-3">{t("settings.profile.pwTitle")}</Text>
            <Text className="text-xs text-muted-foreground mb-1">{t("settings.profile.currentPw")}</Text>
            <TextInput
              value={currentPw}
              onChangeText={setCurrentPw}
              secureTextEntry
              className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-3"
              placeholderTextColor="#999"
            />
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
            <Button onPress={savePassword} disabled={savingPw}>
              <Text className="text-primary-foreground font-semibold">
                {savingPw ? t("settings.profile.saving") : t("settings.profile.savePassword")}
              </Text>
            </Button>
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
