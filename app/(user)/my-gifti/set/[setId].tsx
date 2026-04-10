import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/context/I18nContext";
import { resolveImageUrl } from "@/lib/image";
import { cancelListing, createSetListing, findActiveListing, type MyListing } from "@/services/marketplace";
import { getSetDetail, type SetDetail, type Voucher } from "@/services/vouchers";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Package, ShoppingCart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAlertShim } from "@/components/ui/alert-shim";
const STATUS_BADGE_META: Record<string, { labelKey: string; variant: "default" | "secondary" | "destructive" }> = {
  active: { labelKey: "myGifti.list.statusActive", variant: "default" },
  used: { labelKey: "myGifti.list.statusUsed", variant: "secondary" },
  expired: { labelKey: "myGifti.list.statusExpired", variant: "destructive" },
  transferred: { labelKey: "myGifti.list.statusTransferred", variant: "secondary" },
  listed: { labelKey: "myGifti.list.statusListed", variant: "secondary" },
};

export default function SetDetailScreen() {
  const { t } = useI18n();
  const alert = useAlertShim();
  const { setId } = useLocalSearchParams<{ setId: string }>();
  const router = useRouter();
  const [data, setData] = useState<SetDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSellForm, setShowSellForm] = useState(false);
  const [sellingPrice, setSellingPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeListing, setActiveListing] = useState<MyListing | null>(null);
  const [cancellingListing, setCancellingListing] = useState(false);

  const load = async () => {
    if (!setId) return;
    try {
      const res = await getSetDetail(setId);
      setData(res);
      const isListed = res.vouchers.some((v: Voucher) => v.status === "listed") || (res.set as any).status === "listed";
      if (isListed) {
        try {
          const hit = await findActiveListing({ setId });
          setActiveListing(hit);
        } catch {  }
      } else {
        setActiveListing(null);
      }
    } catch {
      alert(t("myGifti.setDetail.loadErrorTitle"), t("myGifti.setDetail.loadErrorBody"));
      router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

  }, [setId]);

  if (loading || !data) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center" edges={["top"]}>
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const { set, vouchers, summary } = data;

  const canSell = summary.all_active && (set as any).status !== 'listed';
  const fee = sellingPrice ? Math.round(Number(sellingPrice) * 0.05) : 0;
  const payout = sellingPrice ? Number(sellingPrice) - fee : 0;

  const handleSell = async () => {
    if (!sellingPrice || Number(sellingPrice) <= 0) {
      alert(t("myGifti.setDetail.alertPriceTitle"), t("myGifti.setDetail.alertPriceBody"));
      return;
    }
    setSubmitting(true);
    try {
      await createSetListing(setId!, Number(sellingPrice));
      alert(t("myGifti.setDetail.successTitle"), t("myGifti.setDetail.successBody"), [
        { text: t("myGifti.setDetail.ok"), onPress: () => router.back() },
      ]);
    } catch (err: any) {
      alert(t("myGifti.setDetail.failTitle"), err.body?.error || t("myGifti.setDetail.failBody"));
    } finally {
      setSubmitting(false);
    }
  };

  const renderVoucherItem = ({ item }: { item: Voucher }) => {
    const meta = STATUS_BADGE_META[item.status] || STATUS_BADGE_META.active;
    const badge = { label: t(meta.labelKey), variant: meta.variant };
    const imgUri = resolveImageUrl(item.thumb_url, item.image_url, item.brand_logo);

    return (
      <Pressable
        className="mx-4 mb-2 bg-card bg-white rounded-xl border border-border p-3 flex-row"
        onPress={() => router.push(`/(user)/oth-path${item.id}`)}
      >
        {imgUri ? (
          <Image source={{ uri: imgUri }} style={{ width: 48, height: 48 }} className="rounded-lg" resizeMode="contain" />
        ) : (
          <View style={{ width: 48, height: 48 }} className="rounded-lg bg-muted items-center justify-center">
            <Text className="text-lg">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{item.brand}</Text>
              <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <Badge variant={badge.variant} label={badge.label} />
          </View>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-sm font-bold text-foreground">
              ₩{item.face_value?.toLocaleString()}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {item.expiry_date ? format(new Date(item.expiry_date * 1000), "yyyy.MM.dd") : "-"}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const listHeader = (
    <>
      {}
      <View className="mx-4 mt-2 mb-3 flex-row items-center">
        <Package size={20} color="#CE3630" />
        <Text className="text-base font-bold text-foreground ml-2">{t("myGifti.setDetail.bundleLabel")}</Text>
      </View>

      {}
      <View className="mx-4 mb-4 bg-card rounded-xl border border-border p-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-muted-foreground">{t("myGifti.setDetail.summaryTotal")}</Text>
          <Text className="text-sm font-medium text-foreground">
            {t("myGifti.setDetail.countUnitFmt").replace("{{count}}", String(summary.total_count))}
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-muted-foreground">{t("myGifti.setDetail.summaryActive")}</Text>
          <Text className="text-sm font-medium" style={{ color: summary.all_active ? "#22c55e" : "#f59e0b" }}>
            {t("myGifti.setDetail.countUnitFmt").replace("{{count}}", String(summary.active_count))}
          </Text>
        </View>
        <Separator className="my-2" />
        <View className="flex-row justify-between">
          <Text className="text-sm font-semibold text-foreground">{t("myGifti.setDetail.totalFace")}</Text>
          <Text className="text-base font-bold text-foreground">
            {({KRW:"₩",USD:"$",IDR:"Rp"} as Record<string,string>)[set.currency] ?? ""}{summary.total_value?.toLocaleString()}
          </Text>
        </View>
      </View>

      {}
      {activeListing && (
        <View className="mx-4 mb-4">
          <Button
            variant="destructive"
            disabled={cancellingListing}
            onPress={() => {
              alert(
                t("userMarketplace.detail.cancelConfirmTitle"),
                t("userMarketplace.detail.cancelConfirmBody"),
                [
                  { text: t("userMarketplace.detail.cancelNo"), style: "cancel" },
                  {
                    text: t("userMarketplace.detail.cancelYes"),
                    style: "destructive",
                    onPress: async () => {
                      setCancellingListing(true);
                      try {
                        await cancelListing(activeListing.id);
                        alert(
                          t("userMarketplace.detail.cancelDoneTitle"),
                          t("userMarketplace.detail.cancelDoneBody"),
                        );
                        await load();
                      } catch (err: any) {
                        alert(
                          t("userMarketplace.detail.cancelFailTitle"),
                          String(err?.message ?? err),
                        );
                      } finally {
                        setCancellingListing(false);
                      }
                    },
                  },
                ],
              );
            }}
          >
            {cancellingListing
              ? t("userMarketplace.detail.cancelling")
              : t("userMarketplace.detail.cancelListing")}
          </Button>
        </View>
      )}

      {}
      {canSell && !showSellForm && (
        <View className="mx-4 mb-4">
          <Button
            onPress={() => {
              setSellingPrice(String(Math.round(summary.total_value * 0.9)));
              setShowSellForm(true);
            }}
          >
            <View className="flex-row items-center justify-center gap-2">
              <ShoppingCart size={16} color="#fff" />
              <Text className="text-primary-foreground font-semibold">{t("myGifti.setDetail.sellButton")}</Text>
            </View>
          </Button>
        </View>
      )}

      {showSellForm && (
        <View className="mx-4 mb-4 bg-card rounded-xl border border-primary/30 p-4">
          <Text className="text-sm font-semibold text-foreground mb-2">{t("myGifti.setDetail.sellPriceTitle")}</Text>
          <TextInput
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base"
            keyboardType="numeric"
            placeholder={t("myGifti.setDetail.sellPricePh")}
            value={sellingPrice}
            onChangeText={setSellingPrice}
            placeholderTextColor="#999"
          />
          <View className="mt-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-muted-foreground">{t("myGifti.setDetail.totalFace")}</Text>
              <Text className="text-xs text-foreground">{({KRW:"₩",USD:"$",IDR:"Rp"} as Record<string,string>)[set.currency] ?? ""}{summary.total_value?.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-muted-foreground">{t("myGifti.setDetail.feeLabel")}</Text>
              <Text className="text-xs text-foreground">₩{fee.toLocaleString()}</Text>
            </View>
            <Separator className="my-1.5" />
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-foreground">{t("myGifti.setDetail.payoutLabel")}</Text>
              <Text className="text-sm font-bold text-primary">₩{payout.toLocaleString()}</Text>
            </View>
          </View>
          <View className="flex-row gap-2 mt-3">
            <Pressable
              className="flex-1 py-2.5 rounded-lg bg-secondary items-center"
              onPress={() => setShowSellForm(false)}
            >
              <Text className="text-sm font-medium text-muted-foreground">{t("myGifti.setDetail.cancel")}</Text>
            </Pressable>
            <Pressable
              className="flex-1 py-2.5 rounded-lg bg-primary items-center"
              onPress={handleSell}
              disabled={submitting}
            >
              <Text className="text-sm font-semibold text-primary-foreground">
                {submitting ? t("myGifti.setDetail.submitting") : t("myGifti.setDetail.submitSell")}
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {(set as any).status === 'listed' && (
        <View className="mx-4 mb-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30 p-3">
          <Text className="text-sm font-semibold text-yellow-600 text-center">{t("myGifti.setDetail.listedBanner")}</Text>
        </View>
      )}

      {}
      <View className="mx-4 mb-2 flex-row items-center">
        <Text className="text-sm font-semibold text-foreground">{t("myGifti.setDetail.listHeader")}</Text>
        <Text className="text-xs text-muted-foreground ml-2">
          {t("myGifti.setDetail.listCountFmt").replace("{{count}}", String(vouchers.length))}
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={t("myGifti.setDetail.title")} />
      <FlatList
        style={{ flex: 1 }}
        data={vouchers}
        renderItem={renderVoucherItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        contentContainerStyle={{ paddingBottom: 8 }}
      />
    </SafeAreaView>
  );
}
