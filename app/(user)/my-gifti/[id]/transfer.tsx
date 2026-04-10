import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/I18nContext";
import { transferVoucher } from "@/services/vouchers";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function TransferScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!email) {
      alert(t("myGifti.transfer.alertEmptyTitle"), t("myGifti.transfer.alertEmptyBody"));
      return;
    }
    alert(
      t("myGifti.transfer.confirmTitle"),
      t("myGifti.transfer.confirmBody").replace("{{email}}", email),
      [
      { text: t("myGifti.transfer.cancel"), style: "cancel" },
      {
        text: t("myGifti.transfer.transfer"),
        onPress: async () => {
          setLoading(true);
          try {
            await transferVoucher(id!, email);
            alert(t("myGifti.transfer.doneTitle"), t("myGifti.transfer.doneBody"), [
              { text: t("myGifti.transfer.ok"), onPress: () => router.replace("/(user)/oth-path") },
            ]);
          } catch (err: any) {
            alert(t("myGifti.transfer.failTitle"), err.body?.error || t("myGifti.transfer.failBody"));
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={t("myGifti.transfer.title")} />
      <View className="flex-1 px-5 mt-4">
        <Text className="text-sm font-medium text-foreground mb-1.5">{t("myGifti.transfer.recipientEmail")}</Text>
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="recipient@example.com"
          value={email}
          onChangeText={setEmail}
        />
        <Text className="text-xs text-muted-foreground mt-2">{t("myGifti.transfer.footnote")}</Text>
        <Button onPress={handleTransfer} disabled={loading} className="mt-6">
          {loading ? t("myGifti.transfer.loading") : t("myGifti.transfer.submit")}
        </Button>
      </View>
    </SafeAreaView>
  );
}
