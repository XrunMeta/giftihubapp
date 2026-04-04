import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, Animated, useWindowDimensions, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send, ArrowLeftRight, ShoppingBag, CheckCircle, Clock, ArrowRight, XCircle, Store } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { resolveImageUrl } from "@/lib/image";
import Barcode128 from "@/components/Barcode128";
import QRCode from "react-native-qrcode-svg";
import { getVoucherDetail, getVoucherBarcode, type Voucher } from "@/services/vouchers";
import { format } from "date-fns";
import { useDevMode } from "@/hooks/use-dev-mode";

const REFRESH_SECONDS = 30;

const STATUS_INFO: Record<string, { label: string; icon: typeof CheckCircle; color: string; description: string }> = {
  used: {
    label: "사용완료",
    icon: CheckCircle,
    color: "#16a34a",
    description: "이 기프티는 사용이 완료되었습니다.",
  },
  listed: {
    label: "판매중",
    icon: ShoppingBag,
    color: "#f59e0b",
    description: "이 기프티는 중고마켓에 등록되어 판매중입니다.",
  },
  expired: {
    label: "기간만료",
    icon: Clock,
    color: "#ef4444",
    description: "이 기프티의 유효기간이 만료되었습니다.",
  },
  transferred: {
    label: "양도됨",
    icon: ArrowRight,
    color: "#6366f1",
    description: "이 기프티는 다른 사용자에게 양도되었습니다.",
  },
  refunded: {
    label: "환불됨",
    icon: XCircle,
    color: "#ef4444",
    description: "이 기프티는 환불 처리되었습니다.",
  },
};

export default function GiftiDetailScreen() {
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

  useEffect(() => {
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
          Alert.alert("오류", "기프티 정보를 불러올 수 없습니다.");
          router.back();
        } finally {
          setLoading(false);
        }
      })();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id]);

  if (loading || !voucher) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const isActive = voucher.status === "active";
  const barcodeWidth = screenWidth - 80;
  const imgUri = resolveImageUrl(voucher.thumb_url, voucher.image_url, voucher.brand_logo);
  const statusInfo = STATUS_INFO[voucher.status];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="기프티 상세" />
      <ScrollView className="flex-1 px-5">
        {}
        {isActive ? (
          <View className="bg-card rounded-xl border border-border overflow-hidden mb-4">
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
                          Alert.alert("복사됨", barcode!);
                        }}
                        className="ml-2 px-2 py-1 bg-muted rounded"
                      >
                        <Text className="text-xs text-muted-foreground">복사</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {}
                  <View className="mt-4 p-3 bg-white rounded-lg">
                    <QRCode value={barcode} size={120} />
                  </View>
                  <Text className="text-xs text-muted-foreground mt-2">휴대폰 카메라로 스캔</Text>
                </View>
              ) : (
                <View className="h-16 items-center justify-center">
                  <ActivityIndicator size="small" color="#CE3630" />
                  <Text className="text-xs text-muted-foreground mt-2">바코드 로딩중...</Text>
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

          <View
            className="rounded-xl border overflow-hidden mb-4"
            style={{ borderColor: statusInfo.color + "40", backgroundColor: statusInfo.color + "08" }}
          >
            <View className="p-5 items-center">
              <statusInfo.icon size={36} color={statusInfo.color} />
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
            </View>
          </View>
        ) : null}

        {}
        <View className="bg-card rounded-xl border border-border p-4">
          <View className="flex-row justify-between items-start">
            {imgUri ? (
              <Image source={{ uri: imgUri }} className="w-14 h-14 rounded-lg mr-3" resizeMode="cover" />
            ) : null}
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{voucher.brand}</Text>
              <Text className="text-lg font-bold text-foreground mt-0.5">{voucher.name}</Text>
            </View>
            <Badge
              variant={isActive ? "default" : voucher.status === "expired" ? "destructive" : "secondary"}
              label={statusInfo?.label ?? voucher.status}
            />
          </View>

          <Separator className="my-3" />

          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">액면가</Text>
              <Text className="text-sm font-medium text-foreground">
                ₩{voucher.face_value?.toLocaleString() ?? "0"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">만료일</Text>
              <Text className="text-sm font-medium text-foreground">
                {voucher.expiry_date
                  ? format(new Date(voucher.expiry_date * 1000), "yyyy.MM.dd")
                  : "-"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">양도 횟수</Text>
              <Text className="text-sm font-medium text-foreground">{voucher.transfer_count ?? 0}회</Text>
            </View>
          </View>
        </View>

        {}
        {isActive && (
          <View className="gap-3 mt-4 mb-6">
            <View className="flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 flex-row gap-2"
                onPress={() => router.push(`/(user)/oth-path${id}/transfer`)}
              >
                <Send size={16} color="#0a0a0a" />
                <Text className="text-sm font-medium text-foreground">양도</Text>
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex-row gap-2"
                onPress={() => router.push(`/(user)/oth-path${id}/refund`)}
              >
                <ArrowLeftRight size={16} color="#0a0a0a" />
                <Text className="text-sm font-medium text-foreground">환불</Text>
              </Button>
            </View>
            <Button
              variant="outline"
              className="flex-row gap-2"
              onPress={() => router.push({ pathname: "/(user)/oth-path", params: { voucherId: id } })}
            >
              <Store size={16} color="#0a0a0a" />
              <Text className="text-sm font-medium text-foreground">중고마켓에 판매</Text>
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
