import Barcode128 from "@/components/Barcode128";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/context/I18nContext";
import { useDevMode } from "@/hooks/use-dev-mode";
import { resolveImageUrl } from "@/lib/image";
import { getVoucherBarcode, getVoucherDetail, type Voucher } from "@/services/vouchers";
import { format } from "date-fns";
import * as Clipboard from "expo-clipboard";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeftRight, ArrowRight, CheckCircle, Clock, Send, ShoppingBag, Store, XCircle } from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Animated, Image, Pressable, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const REFRESH_SECONDS = 30;

const STATUS_META: Record<
  string,
  { labelKey: string; descKey: string; icon: typeof CheckCircle; color: string }
> = {
  used: {
    labelKey: "myGifti.detail.usedLabel",
    descKey: "myGifti.detail.usedDesc",
    icon: CheckCircle,
    color: "#16a34a",
  },
  cancel_request_pending: {
    labelKey: "myGifti.detail.cancelRequestPendingLabel",
    descKey: "myGifti.detail.cancelRequestPendingDesc",
    icon: Clock,
    color: "#d97706",
  },
  listed: {
    labelKey: "myGifti.detail.listedLabel",
    descKey: "myGifti.detail.listedDesc",
    icon: ShoppingBag,
    color: "#2563eb",
  },
  expired: {
    labelKey: "myGifti.detail.expiredLabel",
    descKey: "myGifti.detail.expiredDesc",
    icon: Clock,
    color: "#ef4444",
  },
  transferred: {
    labelKey: "myGifti.detail.transferredLabel",
    descKey: "myGifti.detail.transferredDesc",
    icon: ArrowRight,
    color: "#16a34a",
  },
  refunded: {
    labelKey: "myGifti.detail.refundedLabel",
    descKey: "myGifti.detail.refundedDesc",
    icon: XCircle,
    color: "#ef4444",
  },
};

export default function GiftiDetailScreen() {
  const { t } = useI18n();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const isDevMode = useDevMode();
  const { width: screenWidth } = useWindowDimensions();
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [barcode, setBarcode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnim = useRef(new Animated.Value(1)).current;

  const syncProgressBar = useCallback((expiresIn: number) => {
    const ratio = Math.max(0, Math.min(1, expiresIn / REFRESH_SECONDS));
    progressAnim.stopAnimation(() => {
      progressAnim.setValue(ratio);
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: expiresIn * 1000,
        useNativeDriver: false,
      }).start();
    });
  }, [progressAnim]);

  const loadBarcode = useCallback(async () => {
    try {
      const res = await getVoucherBarcode(id!);
      setBarcode(res.barcode);
      syncProgressBar(res.expires_in);
    } catch (err: any) {
      if (err.status === 409) {

        setBarcode(null);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setVoucher((prev) => prev ? { ...prev, status: "used" } : prev);
      }
    }
  }, [id, syncProgressBar]);

  useFocusEffect(
   useCallback(() => {
    if (id) {
      (async () => {
        try {
          const res = await getVoucherDetail(id);
          const v = res.voucher;
          setVoucher(v);

          if (v.status === "active") {
            loadBarcode();
            intervalRef.current = setInterval(loadBarcode, 5000);
          }
        } catch {
          Alert.alert(t("myGifti.detail.loadErrorTitle"), t("myGifti.detail.loadErrorBody"));
          router.back();
        } finally {
          setLoading(false);
        }
      })();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id, loadBarcode, t]));

  if (loading || !voucher) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const isActive = voucher.status === "active";
  const barcodeWidth = screenWidth - 80;
  const imgUri = resolveImageUrl(voucher.thumb_url, voucher.image_url, voucher.brand_logo);
  const displayStatus = voucher.status === "used" && voucher.cancel_request_pending
    ? "cancel_request_pending"
    : voucher.status;
  const statusMeta = STATUS_META[displayStatus];
  const statusInfo = statusMeta
    ? {
        label: t(statusMeta.labelKey),
        description: t(statusMeta.descKey),
        icon: statusMeta.icon,
        color: statusMeta.color,
      }
    : null;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <PageHeader title={t("myGifti.detail.title")} />
      <ScrollView className="flex-1 px-5">
        {}
        {isActive ? (
          <View className="bg-card bg-white rounded-xl border border-border overflow-hidden mb-4">
            <View className="p-5 items-center">
              {barcode ? (
                <View className="items-center">
                  <Barcode128 value={barcode} width={barcodeWidth} height={64} />
                  <View className="flex-row items-center mt-3">
                    <Text className="text-base font-mono tracking-[6px] text-foreground">
                      {barcode}
                    </Text>
                    {isDevMode && (
                      <TouchableOpacity
                        onPress={() => {
                          Clipboard.setStringAsync(barcode!);
                          Alert.alert(t("myGifti.detail.copyTitle"), barcode!);
                        }}
                        className="ml-2 px-2 py-1 bg-muted rounded"
                      >
                        <Text className="text-xs text-muted-foreground">{t("myGifti.detail.copyBtn")}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {}
                  <View className="mt-4 p-3 bg-white rounded-lg">
                    <QRCode value={barcode} size={120} />
                  </View>
                  <Text className="text-xs text-muted-foreground mt-2">{t("myGifti.detail.scanHint")}</Text>
                </View>
              ) : (
                <View className="h-16 items-center justify-center">
                  <ActivityIndicator size="small" color="#CE3630" />
                  <Text className="text-xs text-muted-foreground mt-2">{t("myGifti.detail.barcodeLoading")}</Text>
                </View>
              )}
            </View>
            {}
            <View className="h-1 bg-muted">
              <Animated.View
                style={{
                  height: 4,
                  backgroundColor: "#CE3630",
                  borderRadius: 2,
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                }}
              />
            </View>
          </View>
        ) : statusInfo ? (

          (() => {
            const StatusIcon = statusInfo.icon;
            return (
          <View
            className="rounded-xl border overflow-hidden mb-4"
            style={{ borderColor: statusInfo.color + "40", backgroundColor: statusInfo.color + "08" }}
          >
            <View className="p-5 items-center">
              <StatusIcon size={36} color={statusInfo.color} />
              <Text className="text-lg font-bold mt-2" style={{ color: statusInfo.color }}>
                {statusInfo.label}
              </Text>
              <Text className="text-sm text-muted-foreground mt-1 text-center">
                {statusInfo.description}
              </Text>
              {voucher.updated_at ? (
                <Text className="text-xs text-muted-foreground mt-2">
                  {format(new Date(voucher.updated_at * 1000), "yyyy.MM.dd HH:mm")}
                </Text>
              ) : null}
              {voucher.status === "used" && voucher.receipt_code && (
                <View className="mt-3 p-3 bg-white rounded-lg border border-border">
                  <Text className="text-xs text-muted-foreground mb-1">
                    {t("myGifti.detail.receiptCode")}
                  </Text>
                  <Text className="text-base font-mono tracking-wider text-foreground">
                    {voucher.receipt_code}
                  </Text>
                </View>
              )}
            </View>
          </View>
            );
          })()
        ) : null}

        {voucher.status === "used" && (
          voucher.cancel_request_pending ? (
            <View className="mt-4 mb-4 flex-row items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-xl py-3 px-4">
              <Clock size={16} color="#d97706" />
              <Text className="text-sm font-medium text-amber-600">
                {t('myGifti.detail.cancelRequestPendingLabel')}
              </Text>
            </View>
          ) : (
            <Pressable
              className="mt-4 flex-row items-center justify-center gap-2 bg-white border border-destructive rounded-xl py-3 px-4"
              onPress={() => router.push({
                pathname: `/(user)/oth-path${voucher.id}/cancel-request` as any,
                params: { receipt_code: voucher.receipt_code ?? '' },
              })}
            >
              <XCircle size={16} color="#ef4444" />
              <Text className="text-sm font-medium text-destructive">
                {t('myGifti.detail.cancelRequest')}
              </Text>
            </Pressable>
          )
        )}

        {}
        <View className="bg-card rounded-xl border border-border p-4">
          <View className="flex-row justify-between items-start">
            {imgUri ? (
              <Image source={{ uri: imgUri }} className="w-14 h-14 rounded-lg mr-3" resizeMode="contain" />
            ) : null}
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{voucher.brand}</Text>
              <Text className="text-lg font-bold text-foreground mt-0.5">{voucher.name}</Text>
            </View>
            <Badge
              variant={
                isActive
                  ? "default"
                  : voucher.status === "expired"
                    ? "destructive"
                    : voucher.status === "listed"
                      ? "info"
                      : voucher.status === "transferred"
                        ? "success"
                        : "secondary"
              }
              label={statusInfo?.label ?? (isActive ? t("myGifti.list.statusActive") : voucher.status)}
            />
          </View>

          <Separator className="my-3" />

          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{t("myGifti.detail.faceValue")}</Text>
              <Text className="text-sm font-medium text-foreground">
                ₩{voucher.face_value?.toLocaleString() ?? "0"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{t("myGifti.detail.expiryDate")}</Text>
              <Text className="text-sm font-medium text-foreground">
                {voucher.expiry_date
                  ? format(new Date(voucher.expiry_date * 1000), "yyyy.MM.dd")
                  : "-"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{t("myGifti.detail.transferCount")}</Text>
              <Text className="text-sm font-medium text-foreground">
                {t("myGifti.detail.transferCountFmt").replace("{{count}}", String(voucher.transfer_count ?? 0))}
              </Text>
            </View>
          </View>
        </View>

        {}
        {isActive && (
          <View className="gap-3 mt-4 mb-6">
            <View className="flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 flex-row gap-2 bg-white"
                onPress={() => router.push(`/(user)/oth-path${id}/transfer`)}
              >
                <Send size={16} color="#0a0a0a" />
                <Text className="text-sm font-medium text-foreground">{t("myGifti.detail.actionTransfer")}</Text>
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex-row gap-2 bg-white"
                onPress={() => router.push(`/(user)/oth-path${id}/refund`)}
              >
                <ArrowLeftRight size={16} color="#0a0a0a" />
                <Text className="text-sm font-medium text-foreground">{t("myGifti.detail.actionRefund")}</Text>
              </Button>
            </View>
            <Button
              variant="outline"
              className="flex-row gap-2 bg-white"
              onPress={() => router.push({ pathname: "/(user)/oth-path", params: { voucherId: id } })}
            >
              <Store size={16} color="#0a0a0a" />
              <Text className="text-sm font-medium text-foreground">{t("myGifti.detail.sellOnMarketplace")}</Text>
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
