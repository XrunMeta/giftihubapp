import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/I18nContext";
import { cancelGiftLink, createGiftLink } from "@/services/vouchers";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Gift, Link2, Share2, XCircle } from "lucide-react-native";
import React, { useState } from "react";
import { Share, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";

const GIFT_BASE_URL = "https://giftihubapi.pages.dev/page/gift";

export default function GiftScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { id, voucherName } = useLocalSearchParams<{ id: string; voucherName: string }>();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [giftCode, setGiftCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await createGiftLink(id!, message || undefined);
      setGiftCode(res.gift_code);
      setExpiresAt(res.expires_at);
    } catch (err: any) {
      alert(t("myGifti.gift.failTitle"), err.body?.error || t("myGifti.gift.failBody"));
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!giftCode) return;
    const url = `${GIFT_BASE_URL}/${giftCode}`;
    const shareMessage = message
      ? `${t("myGifti.gift.shareText")} ${message}\n${url}`
      : `${t("myGifti.gift.shareText")}\n${url}`;
    try {
      await Share.share({ message: shareMessage, url });
    } catch {}
  };

  const handleCancel = () => {
    alert(
      t("myGifti.gift.cancelTitle"),
      t("myGifti.gift.cancelBody"),
      [
        { text: t("myGifti.gift.cancelNo"), style: "cancel" },
        {
          text: t("myGifti.gift.cancelYes"),
          style: "destructive",
          onPress: async () => {
            try {
              await cancelGiftLink(id!);
              setGiftCode(null);
              setExpiresAt(null);
              alert(t("myGifti.gift.cancelDoneTitle"), t("myGifti.gift.cancelDoneBody"));
            } catch (err: any) {
              alert(t("myGifti.gift.failTitle"), err.body?.error || t("myGifti.gift.failBody"));
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={t("myGifti.gift.title")} />
      <View className="flex-1 px-5 mt-4">
        {}
        {voucherName && (
          <View className="bg-card border border-border rounded-xl p-4 mb-4">
            <Text className="text-xs text-muted-foreground">{t("myGifti.gift.voucherLabel")}</Text>
            <Text className="text-base font-semibold text-foreground mt-1">{voucherName}</Text>
          </View>
        )}

        {!giftCode ? (
          <>
            {}
            <Text className="text-sm font-medium text-foreground mb-1.5">
              {t("myGifti.gift.messageLabel")}
            </Text>
            <Input
              placeholder={t("myGifti.gift.messagePlaceholder")}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={3}
              className="min-h-[80px]"
            />
            <Text className="text-xs text-muted-foreground mt-1.5">
              {t("myGifti.gift.messageHint")}
            </Text>

            {}
            <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-4">
              <Text className="text-sm font-medium text-amber-600">{t("myGifti.gift.noticeTitle")}</Text>
              <Text className="text-xs text-muted-foreground mt-1">
                {t("myGifti.gift.notice1")}
                {"\n"}
                {t("myGifti.gift.notice2")}
                {"\n"}
                {t("myGifti.gift.notice3")}
              </Text>
            </View>

            <Button onPress={handleCreate} disabled={loading} className="mt-6">
              <View className="flex-row items-center gap-2">
                <Gift size={16} color="#fff" />
                <Text className="text-sm font-medium text-primary-foreground">
                  {loading ? t("myGifti.gift.creating") : t("myGifti.gift.createBtn")}
                </Text>
              </View>
            </Button>
          </>
        ) : (
          <>
            {}
            <View className="bg-primary/5 border border-primary/30 rounded-xl p-5 items-center">
              <Link2 size={32} color="#CE3630" />
              <Text className="text-lg font-bold text-foreground mt-3">
                {t("myGifti.gift.linkReady")}
              </Text>
              <View className="bg-white border border-border rounded-lg px-4 py-3 mt-3 w-full">
                <Text className="text-center text-base font-mono tracking-widest text-foreground" selectable>
                  {giftCode}
                </Text>
              </View>
              {expiresAt && (
                <Text className="text-xs text-muted-foreground mt-2">
                  {t("myGifti.gift.expiresAt").replace("{{date}}", format(new Date(expiresAt * 1000), "yyyy.MM.dd HH:mm"))}
                </Text>
              )}
            </View>

            <Button onPress={handleShare} className="mt-4">
              <View className="flex-row items-center gap-2">
                <Share2 size={16} color="#fff" />
                <Text className="text-sm font-medium text-primary-foreground">
                  {t("myGifti.gift.shareBtn")}
                </Text>
              </View>
            </Button>

            <Button variant="outline" onPress={handleCancel} className="mt-3">
              <View className="flex-row items-center gap-2">
                <XCircle size={16} color="#ef4444" />
                <Text className="text-sm font-medium text-destructive">
                  {t("myGifti.gift.cancelBtn")}
                </Text>
              </View>
            </Button>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
