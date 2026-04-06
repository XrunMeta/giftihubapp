import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { resolveImageUrl } from "@/lib/image";
import { createSetListing } from "@/services/marketplace";
import { getSetDetail, type SetDetail, type Voucher } from "@/services/vouchers";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Package, ShoppingCart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Pressable, Text, TextInput, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const STATUS_BADGE: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  active: { label: "사용가능", variant: "default" },
  used: { label: "사용완료", variant: "secondary" },
  expired: { label: "만료", variant: "destructive" },
  transferred: { label: "양도됨", variant: "secondary" },
  listed: { label: "판매중", variant: "secondary" },
};

export default function SetDetailScreen() {
  const { setId } = useLocalSearchParams<{ setId: string }>();
  const router = useRouter();
  const [data, setData] = useState<SetDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSellForm, setShowSellForm] = useState(false);
  const [sellingPrice, setSellingPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!setId) return;
    (async () => {
      try {
        const res = await getSetDetail(setId);
        setData(res);
      } catch {
        Alert.alert("오류", "구성상품 정보를 불러올 수 없습니다.");
        router.back();
      } finally {
        setLoading(false);
      }
    })();
  }, [setId]);

  if (loading || !data) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
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
      Alert.alert("입력 오류", "판매가를 입력해주세요.");
      return;
    }
    setSubmitting(true);
    try {
      await createSetListing(setId!, Number(sellingPrice));
      Alert.alert("등록 완료", "중고마켓에 구성상품이 등록되었습니다.", [
        { text: "확인", onPress: () => router.back() },
      ]);
    } catch (err: any) {
      Alert.alert("등록 실패", err.body?.error || "다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderVoucherItem = ({ item }: { item: Voucher }) => {
    const badge = STATUS_BADGE[item.status] || STATUS_BADGE.active;
    const imgUri = resolveImageUrl(item.thumb_url, item.image_url, item.brand_logo);

    return (
      <Pressable
        className="mx-4 mb-2 bg-card rounded-xl border border-border p-3 flex-row"
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
      <View className="mx-4 mb-4 bg-card rounded-xl border border-border overflow-hidden">
        <View className="p-5 items-center">
          <View className="flex-row items-center mb-3">
            <Package size={20} color="#CE3630" />
            <Text className="text-base font-bold text-foreground ml-2">구성상품</Text>
          </View>
          <View className="p-3 bg-white rounded-lg">
            <QRCode value={`gifti-set:${setId}`} size={160} />
          </View>
          <Text className="text-xs text-muted-foreground mt-2">상점에서 스캔하여 유효성 확인</Text>
        </View>
      </View>

      {}
      <View className="mx-4 mb-4 bg-card rounded-xl border border-border p-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-muted-foreground">총 구성</Text>
          <Text className="text-sm font-medium text-foreground">{summary.total_count}건</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-muted-foreground">사용 가능</Text>
          <Text className="text-sm font-medium" style={{ color: summary.all_active ? "#22c55e" : "#f59e0b" }}>
            {summary.active_count}건
          </Text>
        </View>
        <Separator className="my-2" />
        <View className="flex-row justify-between">
          <Text className="text-sm font-semibold text-foreground">총 액면가</Text>
          <Text className="text-base font-bold text-foreground">
            ₩{summary.total_value?.toLocaleString()}
          </Text>
        </View>
      </View>

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
              <Text className="text-primary-foreground font-semibold">중고마켓에 판매하기</Text>
            </View>
          </Button>
        </View>
      )}

      {showSellForm && (
        <View className="mx-4 mb-4 bg-card rounded-xl border border-primary/30 p-4">
          <Text className="text-sm font-semibold text-foreground mb-2">판매가 설정 (KRW)</Text>
          <TextInput
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base"
            keyboardType="numeric"
            placeholder="판매 금액 입력"
            value={sellingPrice}
            onChangeText={setSellingPrice}
            placeholderTextColor="#999"
          />
          <View className="mt-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-muted-foreground">총 액면가</Text>
              <Text className="text-xs text-foreground">₩{summary.total_value?.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-muted-foreground">수수료 (5%)</Text>
              <Text className="text-xs text-foreground">₩{fee.toLocaleString()}</Text>
            </View>
            <Separator className="my-1.5" />
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-foreground">정산 예정금액</Text>
              <Text className="text-sm font-bold text-primary">₩{payout.toLocaleString()}</Text>
            </View>
          </View>
          <View className="flex-row gap-2 mt-3">
            <Pressable
              className="flex-1 py-2.5 rounded-lg bg-secondary items-center"
              onPress={() => setShowSellForm(false)}
            >
              <Text className="text-sm font-medium text-muted-foreground">취소</Text>
            </Pressable>
            <Pressable
              className="flex-1 py-2.5 rounded-lg bg-primary items-center"
              onPress={handleSell}
              disabled={submitting}
            >
              <Text className="text-sm font-semibold text-primary-foreground">
                {submitting ? "등록 중..." : "판매 등록"}
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {(set as any).status === 'listed' && (
        <View className="mx-4 mb-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30 p-3">
          <Text className="text-sm font-semibold text-yellow-600 text-center">현재 중고마켓에 판매 중입니다</Text>
        </View>
      )}

      {}
      <View className="mx-4 mb-2 flex-row items-center">
        <Text className="text-sm font-semibold text-foreground">구성 상품 목록</Text>
        <Text className="text-xs text-muted-foreground ml-2">({vouchers.length}건)</Text>
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="구성상품 상세" />
      <FlatList
        data={vouchers}
        renderItem={renderVoucherItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
