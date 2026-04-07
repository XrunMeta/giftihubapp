import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RefundScreen() {
  const { t } = useI18n();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRefund = () => {
    Alert.alert(
      t("myGifti.refund.confirmTitle"),
      t("myGifti.refund.confirmBody"),
      [
        { text: t("myGifti.refund.cancel"), style: "cancel" },
        {
          text: t("myGifti.refund.request"),
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await apiFetch(`/oth-path${id}/refund`, { method: "POST" });
              Alert.alert(t("myGifti.refund.doneTitle"), t("myGifti.refund.doneBody"), [
                { text: t("myGifti.refund.ok"), onPress: () => router.back() },
              ]);
            } catch (err: any) {
              Alert.alert(t("myGifti.refund.failTitle"), err.body?.error || t("myGifti.refund.failBody"));
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={t("myGifti.refund.title")} />
      <View className="flex-1 px-5 mt-4">
        <View className="bg-card rounded-xl border border-border p-4">
          <Text className="text-sm text-foreground leading-5">
            {t("myGifti.refund.bullet1")}
            {"\n"}
            {t("myGifti.refund.bullet2")}
            {"\n"}
            {t("myGifti.refund.bullet3")}
            {"\n"}
            {t("myGifti.refund.bullet4")}
          </Text>
        </View>

        <Button
          variant="destructive"
          onPress={handleRefund}
          disabled={loading}
          className="mt-6"
        >
          {loading ? t("myGifti.refund.loading") : t("myGifti.refund.submit")}
        </Button>
      </View>
    </SafeAreaView>
  );
}
