import React, { useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, Pressable, Image, ActivityIndicator } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Package } from "lucide-react-native";
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

  useFocusEffect(
    useCallback(() => {
      loadVouchers();
    }, [loadVouchers])
  );

  type ListItem = { type: "single"; voucher: Voucher } | { type: "bundle"; setId: string; vouchers: Voucher[] };

  const grouped = useMemo<ListItem[]>(() => {
    const setMap = new Map<string, Voucher[]>();
    const singles: Voucher[] = [];
    for (const v of vouchers) {
      if (v.set_id) {
        const arr = setMap.get(v.set_id);
        if (arr) arr.push(v);
        else setMap.set(v.set_id, [v]);
      } else {
        singles.push(v);
      }
    }
    const result: ListItem[] = [];
    const seen = new Set<string>();
    for (const v of vouchers) {
      if (v.set_id && !seen.has(v.set_id)) {
        seen.add(v.set_id);
        result.push({ type: "bundle", setId: v.set_id, vouchers: setMap.get(v.set_id)! });
      } else if (!v.set_id) {
        result.push({ type: "single", voucher: v });
      }
    }
    return result;
  }, [vouchers]);

  const renderBundleCard = (item: { setId: string; vouchers: Voucher[] }) => {
    const total = item.vouchers.reduce((s, v) => s + v.face_value, 0);
    const first = item.vouchers[0]!;
    const restCount = item.vouchers.length - 1;
    const allActive = item.vouchers.every((v) => v.status === "active");
    const imgUri = resolveImageUrl(first.thumb_url, first.image_url, first.brand_logo);

    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-primary/30 p-3"
        onPress={() => router.push(`/(user)/oth-path${first.id}`)}
      >
        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 rounded-lg bg-primary/10 items-center justify-center mr-2">
            <Package size={18} color="#CE3630" />
          </View>
          <Text className="text-sm font-semibold text-primary">구성 상품 ({item.vouchers.length}건)</Text>
          <View className="flex-1" />
          <Badge
            variant={allActive ? "default" : "secondary"}
            label={allActive ? "사용가능" : "혼합"}
          />
        </View>
        <View className="flex-row">
          {imgUri ? (
            <Image source={{ uri: imgUri }} className="w-14 h-14 rounded-lg" resizeMode="cover" />
          ) : (
            <View className="w-14 h-14 rounded-lg bg-muted items-center justify-center">
              <Text className="text-xl">🎁</Text>
            </View>
          )}
          <View className="flex-1 ml-3">
            <Text className="text-sm text-foreground font-medium" numberOfLines={1}>
              {first.brand} · {first.name}
              {restCount > 0 ? ` 외 ${restCount}건` : ""}
            </Text>
            <View className="flex-row justify-between items-center mt-1.5">
              <Text className="text-base font-bold text-foreground">
                ₩{total.toLocaleString()}
              </Text>
              <Text className="text-xs text-muted-foreground">
                만료: {format(new Date(first.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
          </View>
        </View>
        {}
        <View className="mt-2 pt-2 border-t border-border">
          {item.vouchers.slice(0, 4).map((v) => (
            <View key={v.id} className="flex-row justify-between py-0.5">
              <Text className="text-xs text-muted-foreground flex-1" numberOfLines={1}>
                {v.brand} · {v.name}
              </Text>
              <Text className="text-xs text-muted-foreground">₩{v.face_value.toLocaleString()}</Text>
            </View>
          ))}
          {item.vouchers.length > 4 && (
            <Text className="text-xs text-muted-foreground text-center mt-1">
              +{item.vouchers.length - 4}건 더보기
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

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
          style={{ flex: 1 }}
          data={grouped}
          renderItem={({ item }) =>
            item.type === "bundle"
              ? renderBundleCard(item)
              : renderVoucher({ item: item.voucher })
          }
          keyExtractor={(item) =>
            item.type === "bundle" ? `set-${item.setId}` : item.voucher.id
          }
          contentContainerStyle={grouped.length === 0 ? { flexGrow: 1, justifyContent: "center" } : { paddingBottom: 20 }}
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
