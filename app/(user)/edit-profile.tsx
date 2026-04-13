import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { getMe, updateProfile } from "@/services/account";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";

export default function EditProfileScreen() {
  const router = useRouter();
  const alert = useAlertShim();
  const { t } = useI18n();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    getMe()
      .then((res) => {
        setName(res.user.name ?? "");
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={t("settings.profile.title")} onBackPress={() => router.navigate("/(user)/mypage")} />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="bg-white rounded-xl border border-border p-4">
          <Text className="text-sm text-muted-foreground mb-3">{t("settings.profile.hint")}</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}
