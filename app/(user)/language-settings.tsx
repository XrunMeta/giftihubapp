import { PageHeader } from "@/components/PageHeader";
import { LOCALE_OPTIONS, useI18n } from "@/context/I18nContext";
import { Check } from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageSettingsScreen() {
  const { locale, setLocale, t } = useI18n();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={t("settings.language")} showBack />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
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
