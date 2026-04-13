import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function RecordPaymentScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const router = useRouter();
  const [barcode, setBarcode] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecord = async () => {
    if (!barcode.trim() || !amount.trim()) {
      alert(t("merchant.record.alertMissingTitle"), t("merchant.record.alertMissingBody"));
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert(t("merchant.record.alertAmountTitle"), t("merchant.record.alertAmountBody"));
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/oth-path", {
        method: "POST",
        body: JSON.stringify({
          barcode: barcode.trim(),
          amount: numAmount,
          memo: memo.trim() || undefined,
        }),
      });
      alert(t("merchant.record.successTitle"), t("merchant.record.successBody"), [
        { text: t("merchant.record.ok"), onPress: () => router.back() },
      ]);
    } catch (err: any) {
      alert(t("merchant.record.failTitle"), err.body?.error || t("merchant.record.failBody"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <PageHeader title={t("merchant.record.title")} />
      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 0 }}>
        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">{t("merchant.record.barcode")}</Text>
          <Input
            placeholder={t("merchant.record.barcodePh")}
            value={barcode}
            onChangeText={setBarcode}
            keyboardType="number-pad"
            maxLength={14}
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">{t("merchant.record.amount")}</Text>
          <Input
            placeholder={t("merchant.record.amountPh")}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">{t("merchant.record.memo")}</Text>
          <Input placeholder={t("merchant.record.memoPh")} value={memo} onChangeText={setMemo} />
        </View>

        <Button
          onPress={handleRecord}
          disabled={loading || !barcode.trim() || !amount.trim()}
          className="mt-8"
        >
          {loading ? t("merchant.record.submitting") : t("merchant.record.submit")}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
