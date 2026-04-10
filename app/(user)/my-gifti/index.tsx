import { ScreenHeader } from "@/components/ScreenHeader";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { useI18n } from "@/context/I18nContext";
import { resolveImageUrl } from "@/lib/image";
import { cn } from "@/lib/utils";
import type { Locale } from "@/locales/types";
import { getKeywords, type Keyword } from "@/services/marketplace";
import { getMyVouchers, type Voucher, type VoucherStatus } from "@/services/vouchers";
import { format } from "date-fns";
import { useFocusEffect, useRouter } from "expo-router";
import { Package } from "lucide-react-native";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { formatPrice as fmtPrice } from "@/lib/currency";

function kwLabel(kw: Keyword, locale: Locale): string {
  if (locale === "en" && kw.name_en) return kw.name_en;
  if (locale === "id" && kw.name_id) return kw.name_id;
  return kw.name;
}

const TAB_KEYS: { key: string; labelKey: string }[] = [
  { key: "all", labelKey: "myGifti.list.tabAll" },
  { key: "active", labelKey: "myGifti.list.tabActive" },
  { key: "gifted", labelKey: "myGifti.list.tabGifted" },
  { key: "listed", labelKey: "myGifti.list.tabListed" },
  { key: "used", labelKey: "myGifti.list.tabUsed" },
  { key: "expired", labelKey: "myGifti.list.tabExpired" },
  { key: "transferred", labelKey: "myGifti.list.tabTransferred" },
];

const STATUS_BADGE_META: Record<string, { labelKey: string; variant: BadgeVariant }> = {
  active: { labelKey: "myGifti.list.statusActive", variant: "default" },
  listed: { labelKey: "myGifti.list.statusListed", variant: "info" },
  used: { labelKey: "myGifti.list.statusUsed", variant: "secondary" },
  expired: { labelKey: "myGifti.list.statusExpired", variant: "destructive" },
  gifted: { labelKey: "myGifti.list.statusGifted", variant: "info" },
  transferred: { labelKey: "myGifti.list.statusTransferred", variant: "success" },
  cancel_request_pending: { labelKey: "myGifti.detail.cancelRequestPendingLabel", variant: "warning" },
};

function statusBadge(t: (path: string) => string, status: string, cancelPending?: boolean) {
  if (status === "used" && cancelPending) {
    const m = STATUS_BADGE_META.cancel_request_pending;
    return { label: t(m.labelKey), variant: m.variant };
  }
  const m = STATUS_BADGE_META[status] ?? STATUS_BADGE_META.active;
  return { label: t(m.labelKey), variant: m.variant };
}

export default function MyGiftiScreen() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const tabs = useMemo(
    () => TAB_KEYS.map((row) => ({ key: row.key, label: t(row.labelKey) })),
    [t],
  );
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [activeKeyword, setActiveKeyword] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      getKeywords()
        .then((res) => setKeywords(res.keywords))
        .catch(() => {});
    }, []),
  );

  const loadVouchers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const status = activeTab === "all" ? undefined : (activeTab as VoucherStatus);
      const res = await getMyVouchers(status, activeKeyword ?? undefined);
      setVouchers(res.vouchers);
      const sets = new Set(res.vouchers.filter((v: Voucher) => v.set_id).map((v: Voucher) => v.set_id));
      setDebugInfo(
        t("myGifti.list.debugSummary")
          .replace("{{vouchers}}", String(res.vouchers.length))
          .replace("{{sets}}", String(sets.size))
          .replace("{{singles}}", String(res.vouchers.filter((v: Voucher) => !v.set_id).length)),
      );
    } catch (err: any) {
      console.error("Failed to load vouchers:", err);
      if (err.status === 401) {
        setError(t("myGifti.list.errUnauthorized"));
      } else {
        const detail = String(err.status ?? err.message ?? t("myGifti.list.networkError"));
        setError(`${t("myGifti.list.errLoadPrefix")} ${t("myGifti.list.errLoadDetail").replace("{{detail}}", detail)}`);
      }
      setDebugInfo(
        t("myGifti.list.debugErr")
          .replace("{{status}}", String(err.status ?? ""))
          .replace("{{msg}}", String(err.message ?? "")),
      );
    } finally {
      setLoading(false);
    }
  }, [activeTab, activeKeyword, t]);

  const loadRef = React.useRef(loadVouchers);
  loadRef.current = loadVouchers;
  useFocusEffect(
    useCallback(() => {
      loadRef.current();
    }, [activeTab, activeKeyword]),
  );

  type ListItem = { type: "single"; voucher: Voucher } | { type: "bundle"; setId: string; vouchers: Voucher[] };

  const grouped = useMemo<ListItem[]>(() => {
    const setMap = new Map<string, Voucher[]>();
    for (const v of vouchers) {
      if (v.set_id) {
        const arr = setMap.get(v.set_id);
        if (arr) arr.push(v);
        else setMap.set(v.set_id, [v]);
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
    const bundleBadge =
      bundleStatus === "mixed"
        ? { label: t("myGifti.list.statusMixed"), variant: "secondary" as const }
        : statusBadge(t, bundleStatus);

    const restPart =
      restCount > 0 ? ` ${t("myGifti.list.restItems").replace("{{count}}", String(restCount))}` : "";

    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-primary/30 p-3"
        onPress={() => router.push(`/(user)/oth-path${item.setId}`)}
      >
        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 rounded-lg bg-primary/10 items-center justify-center">
            <Package size={18} color="#CE3630" />
          </View>
          <Text className="text-sm font-semibold text-primary">
            {t("myGifti.list.bundleTitle").replace("{{count}}", String(item.vouchers.length))}
          </Text>
          <View className="flex-1" />
          <Badge variant={bundleBadge.variant} label={bundleBadge.label} />
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
              {restPart}
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-base font-bold text-foreground">{fmtPrice(total, cur)}</Text>
              <Text className="text-xs text-muted-foreground">
                {t("myGifti.list.expiryPrefix")} {format(new Date(first.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-2 pt-2 border-t border-border">
          {item.vouchers.slice(0, 4).map((v) => (
            <View key={v.id} className="flex-row justify-between">
              <Text className="text-xs text-muted-foreground flex-1" numberOfLines={1}>
                {v.brand} · {v.name}
              </Text>
              <Text className="text-xs text-muted-foreground">{fmtPrice(v.face_value_base || v.face_value, cur)}</Text>
            </View>
          ))}
          {item.vouchers.length > 4 && (
            <Text className="text-xs text-muted-foreground text-center mt-1">
              {t("myGifti.list.bundleMore").replace("{{count}}", String(item.vouchers.length - 4))}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  const renderVoucher = ({ item }: { item: Voucher }) => {
    const badge = statusBadge(t, item.status, !!item.cancel_request_pending);
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
              <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <Badge variant={badge.variant} label={badge.label} />
          </View>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-base font-bold text-foreground">
              {fmtPrice(item.face_value_base || item.face_value, item.base_currency)}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {t("myGifti.list.expiryPrefix")} {format(new Date(item.expiry_date * 1000), "yyyy.MM.dd")}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader
        elevated
        title={t("myGifti.list.title")}
        subtitle={
          debugInfo ? (
            <Text className="text-xs text-muted-foreground mt-1" selectable>
              {debugInfo}
            </Text>
          ) : undefined
        }
        bottom={
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
              className="mb-3"
            >
              {tabs.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                  <Pressable
                    key={tab.key}
                    onPress={() => setActiveTab(tab.key)}
                    style={{ alignSelf: "flex-start" }}
                    className={cn("rounded-full px-4 py-2", isActive ? "bg-primary" : "bg-secondary")}
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
            {keywords.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
                className="mb-3"
              >
                <Pressable
                  onPress={() => setActiveKeyword(null)}
                  style={{ alignSelf: "flex-start" }}
                  className={cn("rounded-full px-3 py-1.5", activeKeyword === null ? "bg-primary" : "bg-secondary")}
                >
                  <Text className={cn("text-xs font-medium", activeKeyword === null ? "text-primary-foreground" : "text-muted-foreground")}>
                    {t("myGifti.list.tabAll")}
                  </Text>
                </Pressable>
                {keywords.map((kw) => {
                  const isActive = activeKeyword === kw.id;
                  return (
                    <Pressable
                      key={kw.id}
                      onPress={() => setActiveKeyword(isActive ? null : kw.id)}
                      style={{ alignSelf: "flex-start" }}
                      className={cn("rounded-full px-3 py-1.5", isActive ? "bg-primary" : "bg-secondary")}
                    >
                      <Text className={cn("text-xs font-medium", isActive ? "text-primary-foreground" : "text-muted-foreground")}>
                        {kwLabel(kw, locale)}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}
          </>
        }
      />
      <FlatList
        style={{ flex: 1 }}
        data={loading ? [] : grouped}
        renderItem={({ item }) =>
          item.type === "bundle" ? renderBundleCard(item) : renderVoucher({ item: item.voucher })
        }
        keyExtractor={(item) => (item.type === "bundle" ? `set-${item.setId}` : item.voucher.id)}
        ListEmptyComponent={
          loading ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : error ? (
            <View className="items-center py-20 px-6">
              <Text className="text-destructive text-center">{error}</Text>
              <Text className="text-xs text-muted-foreground mt-2" onPress={loadVouchers}>
                {t("myGifti.list.tapRetry")}
              </Text>
            </View>
          ) : (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">{t("myGifti.list.empty")}</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
