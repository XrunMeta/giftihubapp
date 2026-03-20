import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send, RefreshCw, ArrowLeftRight, XCircle } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { resolveImageUrl } from "@/lib/image";
import { getVoucherDetail, getVoucherBarcode, type Voucher } from "@/services/vouchers";
import { format } from "date-fns";

export default function GiftiDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [barcode, setBarcode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (id) {
      loadVoucher();
      loadBarcode();

      intervalRef.current = setInterval(loadBarcode, 30000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id]);

  const loadVoucher = async () => {
    try {
      const data = await getVoucherDetail(id!);
      setVoucher(data);
    } catch {
      Alert.alert("오류", "기프티 정보를 불러올 수 없습니다.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const loadBarcode = async () => {
    try {
      const res = await getVoucherBarcode(id!);
      setBarcode(res.barcode);
    } catch {

    }
  };

  if (loading || !voucher) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const isActive = voucher.status === "active";

  return (
    <SafeAreaView className="flex-1 bg-background">
      <PageHeader title="기프티 상세" />
      <ScrollView className="flex-1 px-5">
        {}
        <View className="bg-card rounded-xl border border-border p-6 items-center mb-4">
          {barcode ? (
            <View className="items-center">
              <Text className="text-3xl font-mono tracking-widest text-foreground mb-2">
                {barcode}
              </Text>
              <Text className="text-xs text-muted-foreground">30초마다 자동 갱신</Text>
            </View>
          ) : (
            <Text className="text-muted-foreground">바코드를 불러오는 중...</Text>
          )}
        </View>

        {}
        <View className="bg-card rounded-xl border border-border p-4">
          <View className="flex-row justify-between items-start">
            {(() => {
              const imgUri = resolveImageUrl(voucher.thumb_url, voucher.image_url, voucher.brand_logo);
              return imgUri ? (
                <Image source={{ uri: imgUri }} className="w-14 h-14 rounded-lg mr-3" resizeMode="cover" />
              ) : null;
            })()}
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{voucher.brand}</Text>
              <Text className="text-lg font-bold text-foreground mt-0.5">{voucher.name}</Text>
            </View>
            <Badge
              variant={voucher.status === "active" ? "default" : "secondary"}
              label={voucher.status === "active" ? "사용가능" : voucher.status}
            />
          </View>

          <Separator className="my-3" />

          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">액면가</Text>
              <Text className="text-sm font-medium text-foreground">
                ₩{voucher.face_value.toLocaleString()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">만료일</Text>
              <Text className="text-sm font-medium text-foreground">
                {format(new Date(voucher.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">양도 횟수</Text>
              <Text className="text-sm font-medium text-foreground">{voucher.transfer_count}회</Text>
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
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
