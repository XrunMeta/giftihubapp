import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollableTabs } from "@/components/ui/scrollable-tabs";
import { Badge } from "@/components/ui/badge";
import { resolveImageUrl } from "@/lib/image";
import { getMyVouchers, type Voucher, type VoucherStatus } from "@/services/vouchers";
import { format } from "date-fns";

const TABS = [
  { key: "all", label: "전체" },
  { key: "active", label: "사용가능" },
  { key: "listed", label: "판매중" },
  { key: "used", label: "사용완료" },
  { key: "expired", label: "기간만료" },
  { key: "transferred", label: "양도됨" },
];

const STATUS_BADGE: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  active: { label: "사용가능", variant: "default" },
  listed: { label: "판매중", variant: "secondary" },
  used: { label: "사용완료", variant: "secondary" },
  expired: { label: "만료", variant: "destructive" },
  transferred: { label: "양도됨", variant: "secondary" },
};

export default function MyGiftiScreen() {
  const router = useRouter();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const loadVouchers = useCallback(async () => {
    setLoading(true);
    try {
      const status = activeTab === "all" ? undefined : (activeTab as VoucherStatus);
      const res = await getMyVouchers(status);
      setVouchers(res.vouchers);
    } catch (err) {
      console.error("Failed to load vouchers:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadVouchers();
  }, [loadVouchers]);

  const renderVoucher = ({ item }: { item: Voucher }) => {
    const badge = STATUS_BADGE[item.status] || STATUS_BADGE.active;
    const imgUri = resolveImageUrl(item.thumb_url, item.image_url, item.brand_logo);
    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-border p-3 flex-row"
        onPress={() => router.push(`/(user)/oth-path${item.id}`)}
      >
        {imgUri ? (
          <Image source={{ uri: imgUri }} className="w-16 h-16 rounded-lg" resizeMode="cover" />
        ) : (
          <View className="w-16 h-16 rounded-lg bg-muted items-center justify-center">
            <Text className="text-2xl">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{item.brand}</Text>
              <Text className="text-base font-semibold text-foreground mt-0.5" numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <Badge variant={badge.variant} label={badge.label} />
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-base font-bold text-foreground">
              ₩{item.face_value.toLocaleString()}
            </Text>
            <Text className="text-xs text-muted-foreground">
              만료: {format(new Date(item.expiry_date * 1000), "yyyy.MM.dd")}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">내 기프티</Text>
      </View>

      <ScrollableTabs tabs={TABS} activeTab={activeTab} onTabPress={setActiveTab} className="mb-3" />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={vouchers}
          renderItem={renderVoucher}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-muted-foreground">기프티가 없습니다.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
