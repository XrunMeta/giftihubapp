import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LOCALE_OPTIONS, useI18n } from "@/context/I18nContext";
import { useRouter } from "expo-router";
import { Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";

type PwStep = "idle" | "otpSent" | "otpVerified";

export default function UserSettingsScreen() {
  const alert = useAlertShim();
  const { locale, setLocale, t } = useI18n();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader
        title={t("settings.title")}
        onBackPress={() => router.navigate("/(user)/mypage")}
      />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 24 }}>
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
