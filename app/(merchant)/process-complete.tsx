import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/I18nContext";
import { useRouter } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProcessCompleteScreen() {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6" edges={["top"]}>
      <CheckCircle size={80} color="#22c55e" />
      <Text className="text-2xl font-bold text-foreground mt-6">{t("merchant.processComplete.title")}</Text>
      <Text className="text-sm text-muted-foreground mt-2 text-center">
        {t("merchant.processComplete.body")}
      </Text>
      <Button className="w-full mt-8" onPress={() => router.replace("/(merchant)")}>
        {t("merchant.processComplete.home")}
      </Button>
    </SafeAreaView>
  );
}
