import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/context/I18nContext";
import { useRouter } from "expo-router";
import React from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PatentNoticeScreen() {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={t("patentNotice.pageTitle")} onBackPress={() => router.navigate("/(user)/mypage")} />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 48 }}>
        {}
        <Text className="text-base font-bold text-foreground mb-2">
          {t("patentNotice.heading")}
        </Text>
        <Text className="text-sm text-muted-foreground leading-5 mb-4">
          {t("patentNotice.greeting")}
        </Text>
        <Text className="text-sm text-foreground leading-5 mb-6">
          {t("patentNotice.intro")}
        </Text>

        {}
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-bold text-foreground mb-3">
            {t("patentNotice.section1Title")}
          </Text>
          <Text className="text-sm text-foreground leading-5 mb-4">
            {t("patentNotice.section1Desc")}
          </Text>

          <View className="bg-gray-50 rounded-lg p-3 mb-3">
            <Text className="text-sm font-bold text-primary mb-1">
              {t("patentNotice.patent1No")}
            </Text>
            <Text className="text-xs text-muted-foreground leading-4">
              {t("patentNotice.patent1Name")}
            </Text>
          </View>

          <View className="bg-gray-50 rounded-lg p-3">
            <Text className="text-sm font-bold text-primary mb-1">
              {t("patentNotice.patent2No")}
            </Text>
            <Text className="text-xs text-muted-foreground leading-4">
              {t("patentNotice.patent2Name")}
            </Text>
          </View>
        </View>

        {}
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-bold text-foreground mb-3">
            {t("patentNotice.section2Title")}
          </Text>
          <Text className="text-sm text-foreground leading-5 mb-3">
            {t("patentNotice.section2Body1")}
          </Text>
          <Text className="text-sm text-foreground leading-5">
            {t("patentNotice.section2Body2")}
          </Text>
        </View>

        {}
        <View className="bg-white rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-bold text-foreground mb-3">
            {t("patentNotice.section3Title")}
          </Text>
          <Text className="text-sm text-foreground leading-5 mb-3">
            {t("patentNotice.section3Body")}
          </Text>

          <View className="bg-gray-50 rounded-lg p-3">
            <Text className="text-xs text-muted-foreground mb-1">{t("patentNotice.contactLabel")}</Text>
            <Pressable onPress={() => Linking.openURL("mailto:oth-staff@example.invalid")}>
              <Text className="text-sm font-semibold text-primary underline">
                oth-staff@example.invalid
              </Text>
            </Pressable>
            <Text className="text-xs text-muted-foreground mt-2 leading-4">
              {t("patentNotice.contactNote")}
            </Text>
          </View>
        </View>

        {}
        <Text className="text-sm text-foreground leading-5 mb-2">
          {t("patentNotice.closing1")}
        </Text>
        <Text className="text-sm text-foreground leading-5 mb-2">{t("patentNotice.closing2")}</Text>
        <Text className="text-sm font-semibold text-foreground">{t("patentNotice.closingSign")}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
