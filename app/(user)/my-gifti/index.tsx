import { ScreenHeader } from "@/components/ScreenHeader";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { resolveImageUrl } from "@/lib/image";
import { cn } from "@/lib/utils";
import { getMyVouchers, type Voucher, type VoucherStatus } from "@/services/vouchers";
import { format } from "date-fns";
import { useFocusEffect, useRouter } from "expo-router";
import { Package } from "lucide-react-native";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SYM: Record<string, string> = { KRW: "₩", USD: "$", IDR: "Rp" };
function fmtPrice(amount: number, currency?: string) {
  const sym = SYM[currency ?? "KRW"] ?? "₩";
  return `${sym}${amount.toLocaleString()}`;
}

const TABS = [
  { key: "all", label: "전체" },
  { key: "active", label: "사용가능" },
  { key: "listed", label: "판매중" },
  { key: "used", label: "사용완료" },
  { key: "expired", label: "기간만료" },
  { key: "transferred", label: "양도됨" },
];

const STATUS_BADGE: Record<string, { label: string; variant: BadgeVariant }> = {
  active: { label: "사용가능", variant: "default" },
  listed: { label: "판매중", variant: "info" },
  used: { label: "사용완료", variant: "secondary" },
  expired: { label: "만료", variant: "destructive" },
  transferred: { label: "양도됨", variant: "success" },
};

export default function MyGiftiScreen() {
  const router = useRouter();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const loadVouchers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const status = activeTab === "all" ? undefined : (activeTab as VoucherStatus);
      const res = await getMyVouchers(status);
      setVouchers(res.vouchers);

      const sets = new Set(res.vouchers.filter((v: Voucher) => v.set_id).map((v: Voucher) => v.set_id));
      setDebugInfo(`총 ${res.vouchers.length}건, 세트 ${sets.size}개, 개별 ${res.vouchers.filter((v: Voucher) => !v.set_id).length}건`);
    } catch (err: any) {
      console.error("Failed to load vouchers:", err);
      const msg = err.status === 401
        ? "로그인이 만료되었습니다. 다시 로그인해주세요."
        : `기프티 목록을 불러올 수 없습니다. (${err.status || err.message || "네트워크 오류"})`;
      setError(msg);
      setDebugInfo(`ERR: status=${err.status}, msg=${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  const loadRef = React.useRef(loadVouchers);
  loadRef.current = loadVouchers;
  useFocusEffect(
    useCallback(() => {
      loadRef.current();
    }, [activeTab])
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
    const first = item.vouchers[0]!;
    const cur = first.base_currency || "KRW";
    const total = item.vouchers.reduce((s, v) => s + (v.face_value_base || v.face_value), 0);
    const restCount = item.vouchers.length - 1;
    const imgUri = resolveImageUrl(first.thumb_url, first.image_url, first.brand_logo);

    const statuses = new Set(item.vouchers.map((v) => v.status));
    const bundleStatus = statuses.size === 1 ? [...statuses][0]! : "mixed";
    const bundleBadge = bundleStatus === "mixed"
      ? { label: "혼합", variant: "secondary" as const }
      : STATUS_BADGE[bundleStatus] ?? { label: bundleStatus, variant: "secondary" as const };

    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-primary/30 p-3"
        onPress={() => router.push(`/(user)/oth-path${item.setId}`)}
      >
        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 rounded-lg bg-primary/10 items-center justify-center mr-2">
            <Package size={18} color="#CE3630" />
          </View>
          <Text className="text-sm font-semibold text-primary">구성 상품 ({item.vouchers.length}건)</Text>
          <View className="flex-1" />
          <Badge
            variant={bundleBadge.variant}
            label={bundleBadge.label}
          />
        </View>
        <View className="flex-row">
          {imgUri ? (
            <Image source={{ uri: imgUri }} className="w-14 h-14 rounded-lg" resizeMode="contain" />
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
                {fmtPrice(total, cur)}
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
              <Text className="text-xs text-muted-foreground">{fmtPrice(v.face_value_base || v.face_value, cur)}</Text>
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
          <Image source={{ uri: imgUri }} className="w-16 h-16 rounded-lg" resizeMode="contain" />
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
              {fmtPrice(item.face_value_base || item.face_value, item.base_currency)}
            </Text>
            <Text className="text-xs text-muted-foreground">
              만료: {format(new Date(item.expiry_date * 1000), "yyyy.MM.dd")}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const listHeader = (
    <ScreenHeader
      elevated
      title="내 기프티"
      subtitle={
        debugInfo ? (
          <Text className="text-xs text-muted-foreground mt-1" selectable>
            {debugInfo}
          </Text>
        ) : undefined
      }
      bottom={
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
          className="mb-3"
        >
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={{ alignSelf: "flex-start" }}
                className={cn(
                  "rounded-full px-4 py-2",
                  isActive ? "bg-primary" : "bg-secondary",
                )}
              >
                <Text
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      }
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <FlatList
        data={loading ? [] : grouped}
        renderItem={({ item }) =>
          item.type === "bundle"
            ? renderBundleCard(item)
            : renderVoucher({ item: item.voucher })
        }
        keyExtractor={(item) =>
          item.type === "bundle" ? `set-${item.setId}` : item.voucher.id
        }
        ListHeaderComponent={listHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          loading ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : error ? (
            <View className="items-center py-20 px-6">
              <Text className="text-destructive text-center">{error}</Text>
              <Text className="text-xs text-muted-foreground mt-2" onPress={loadVouchers}>
                탭하여 다시 시도
              </Text>
            </View>
          ) : (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">기프티가 없습니다.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
