import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/I18nContext";
import { giftVoucher } from "@/services/vouchers";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
export default function SendGiftScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const router = useRouter();
  const { voucherId, voucherName } = useLocalSearchParams<{
    voucherId: string;
    voucherName: string;
  }>();
  const [telegramId, setTelegramId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendGift = async () => {
    if (!telegramId.trim()) {
      alert(t("userSendGift.errTelegramTitle"), t("userSendGift.errTelegramBody"));
      return;
    }
    if (!voucherId) {
      alert(t("userSendGift.errVoucherTitle"), t("userSendGift.errVoucherBody"));
      return;
    }

    alert(
      t("userSendGift.confirmTitle"),
      t("userSendGift.confirmBody")
        .replace("{{name}}", voucherName || t("userSendGift.defaultGiftName"))
        .replace("{{id}}", telegramId),
      [
        { text: t("userSendGift.cancel"), style: "cancel" },
        {
          text: t("userSendGift.send"),
          onPress: async () => {
            setLoading(true);
            try {
              const res = await giftVoucher(voucherId, telegramId.trim());
              alert(
                t("userSendGift.successTitle"),
                `${t("userSendGift.successBody")}${res.fee > 0 ? t("userSendGift.successFee").replace("{{fee}}", String(res.fee)) : ""}`,
                [{ text: t("userSendGift.ok"), onPress: () => router.back() }],
              );
            } catch (err: any) {
              alert(t("userSendGift.failTitle"), err.body?.error || t("userSendGift.failBody"));
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
      <PageHeader title={t("userSendGift.title")} />
      <ScrollView className="flex-1 px-6">
        {voucherName ? (
          <View className="bg-card border border-border rounded-xl p-4 mt-4">
            <Text className="text-xs text-muted-foreground">{t("userSendGift.voucherLabel")}</Text>
            <Text className="text-base font-semibold text-foreground mt-1">
              {voucherName}
            </Text>
          </View>
        ) : null}

        <View className="mt-6">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            {t("userSendGift.telegramLabel")}
          </Text>
          <Input
            placeholder={t("userSendGift.telegramPh")}
            value={telegramId}
            onChangeText={setTelegramId}
            keyboardType="number-pad"
          />
          <Text className="text-xs text-muted-foreground mt-2">{t("userSendGift.telegramHint")}</Text>
        </View>

        <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6">
          <Text className="text-sm font-medium text-amber-600">{t("userSendGift.noticeTitle")}</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            {t("userSendGift.notice1")}
            {"\n"}
            {t("userSendGift.notice2")}
            {"\n"}
            {t("userSendGift.notice3")}
          </Text>
        </View>

        <Button
          onPress={handleSendGift}
          disabled={loading || !telegramId.trim()}
          className="mt-8"
        >
          {loading ? t("userSendGift.sending") : t("userSendGift.submit")}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
