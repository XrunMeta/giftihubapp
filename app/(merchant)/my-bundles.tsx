import { ScreenHeader } from "@/components/ScreenHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/I18nContext";
import { resolveImageUrl } from "@/lib/image";
import {
  getBundleSettlementRequests,
  getMyBundles,
  requestBundleSettlement,
  type BundleSettlementRequest,
  type MerchantBundle,
} from "@/services/bundle";
import { Calendar, Package } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Tab = "items" | "requests";

const REQ_STATUS_META: Record<
  string,
  { labelKey: string; pillClass: string; labelClass: string }
> = {
  pending: {
    labelKey: "merchant.bundles.reqStatusPending",
    pillClass: "border border-amber-500/35 bg-amber-500/12",
    labelClass: "text-amber-800",
  },
  approved: {
    labelKey: "merchant.bundles.reqStatusApproved",
    pillClass: "border border-emerald-500/35 bg-emerald-500/12",
    labelClass: "text-emerald-800",
  },
  rejected: {
    labelKey: "merchant.bundles.reqStatusRejected",
    pillClass: "border border-red-500/35 bg-red-500/12",
    labelClass: "text-red-800",
  },
};

const VOUCHER_STATUS_META: Record<string, { labelKey: string; variant: "default" | "secondary" | "destructive" }> = {
  active: { labelKey: "merchant.bundles.voucherActive", variant: "default" },
  used: { labelKey: "merchant.bundles.voucherUsed", variant: "secondary" },
  expired: { labelKey: "merchant.bundles.voucherExpired", variant: "destructive" },
  listed: { labelKey: "merchant.bundles.voucherListed", variant: "secondary" },
};

type SingleItem = {
  voucher_id: string;
  brand: string;
  name: string;
  face_value: number;
  status: string;
  expiry_date: number;
  image_url: string | null;
  thumb_url: string | null;
  brand_logo: string | null;
  item_type: "single";
};

type ListItem = { type: "set"; data: MerchantBundle } | { type: "single"; data: SingleItem };

function splitBundleStatusParts(raw: string): string[] {
  return raw
    .split(/[,，/|]\s*|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function MyBundlesScreen() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("items");
  const [bundles, setBundles] = useState<MerchantBundle[]>([]);
  const [singles, setSingles] = useState<SingleItem[]>([]);
  const [requests, setRequests] = useState<BundleSettlementRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      if (tab === "items") {
        const res = await getMyBundles();
        setBundles(res.bundles ?? []);
        setSingles((res as any).singles ?? []);
      } else {
        const res = await getBundleSettlementRequests();
        setRequests(res.requests ?? []);
      }
    } catch {

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [tab]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleRequestSettlement = (bundle: MerchantBundle) => {
    Alert.alert(
      t("merchant.bundles.settlementTitle"),
      `${bundle.set_name}\n${t("merchant.bundles.totalFace")}: ₩${bundle.total_face_value.toLocaleString()}\n${bundle.voucher_count}${t("merchant.bundles.voucherUnit")}\n\n${t("merchant.bundles.askSettlement")}`,
      [
        { text: t("merchant.bundles.cancel"), style: "cancel" },
        {
          text: t("merchant.bundles.request"),
          onPress: async () => {
            try {
              const res = await requestBundleSettlement(bundle.set_id);
              Alert.alert(
                t("merchant.bundles.requestDoneTitle"),
                `${t("merchant.bundles.feeLine")}: ₩${res.fee_amount.toLocaleString()} (${(res.fee_rate * 100).toFixed(1)}%)\n${t("merchant.bundles.netLine")}: ₩${res.net_amount.toLocaleString()}`,
              );
              fetchData();
            } catch (e) {
              Alert.alert(t("merchant.bundles.requestFailTitle"), e instanceof Error ? e.message : t("merchant.bundles.requestFailBody"));
            }
          },
        },
      ],
    );
  };

  const listItems: ListItem[] = [
    ...bundles.map((b): ListItem => ({ type: "set", data: b })),
    ...singles.map((s): ListItem => ({ type: "single", data: s })),
  ];

  const renderItem = ({ item }: { item: ListItem }) => {
    if (item.type === "set") {
      const b = item.data;
      const badgeText = t("merchant.bundles.bundleBadge").replace(/\{\{count\}\}/g, String(b.voucher_count));
      const statusRaw = b.statuses?.trim() ?? "";
      const split = statusRaw ? splitBundleStatusParts(b.statuses) : [];
      const statusParts = statusRaw ? (split.length > 0 ? split : [statusRaw]) : [];
      return (
        <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <View className="flex-row items-center gap-3 border-b border-border bg-primary/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white">
              <Package size={20} color="#CE3630" strokeWidth={2} />
            </View>
            <Text className="min-w-0 flex-1 text-sm font-bold text-primary" numberOfLines={2}>
              {badgeText}
            </Text>
          </View>

          <View className="p-4">
            <Text className="text-lg font-bold leading-snug text-foreground" numberOfLines={2}>
              {b.set_name}
            </Text>
            {b.set_description ? (
              <Text className="mt-1.5 text-xs leading-5 text-muted-foreground" numberOfLines={2}>
                {b.set_description}
              </Text>
            ) : null}
            {statusParts.length > 0 ? (
              <View className="mt-2 flex-row flex-wrap items-center gap-x-2 gap-y-1.5">
                <Text className="shrink-0 text-sm font-medium text-muted-foreground">
                  {t("merchant.bundles.statusPrefix")}
                </Text>
                {statusParts.map((part, idx) => (
                  <Badge key={`${part}-${idx}`} variant="outline" label={part} />
                ))}
              </View>
            ) : null}

            <View className="flex-row items-center justify-between rounded-xl bg-muted/50  py-3">
              <Text className="text-md text-muted-foreground">{t("merchant.bundles.totalFace")}</Text>
              <Text className="text-lg font-bold text-primary">₩{b.total_face_value.toLocaleString()}</Text>
            </View>

            <Button onPress={() => handleRequestSettlement(b)} className="mt-3 w-full">
              {t("merchant.bundles.requestBtn")}
            </Button>
          </View>
        </View>
      );
    }

    const s = item.data;
    const meta = VOUCHER_STATUS_META[s.status] ?? VOUCHER_STATUS_META.active;
    const badge = { label: t(meta.labelKey), variant: meta.variant };
    const imgUri = resolveImageUrl(s.thumb_url, s.image_url, s.brand_logo);
    return (
      <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3 flex-row">
        {imgUri ? (
          <Image source={{ uri: imgUri }} className="w-12 h-12 rounded-lg" resizeMode="contain" />
        ) : (
          <View className="w-12 h-12 rounded-lg bg-muted items-center justify-center">
            <Text className="text-lg">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{s.brand}</Text>
              <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>{s.name}</Text>
            </View>
            <Badge variant={badge.variant} label={badge.label} />
          </View>
          <Text className="text-sm font-bold text-foreground mt-1">
            ₩{s.face_value.toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  const renderRequest = ({ item }: { item: BundleSettlementRequest }) => {
    const reqMeta = REQ_STATUS_META[item.status];
    const statusLabel = reqMeta ? t(reqMeta.labelKey) : item.status;
    const pillClass = reqMeta?.pillClass ?? "border border-border bg-muted";
    const labelClass = reqMeta?.labelClass ?? "text-foreground";
    const date = new Date(item.created_at * 1000);
    const dateStr = `${date.getMonth() + 1}.${String(date.getDate()).padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

    return (
      <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <View className="flex-row items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <View className="flex-row items-center gap-2">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <Calendar size={16} color="#737373" />
            </View>
            <View>
              <Text className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {t("merchant.bundles.requestedAt")}
              </Text>
              <Text className="text-sm font-semibold text-foreground">{dateStr}</Text>
            </View>
          </View>
          <View className={`rounded-full px-2.5 py-1 ${pillClass}`}>
            <Text className={`text-xs font-semibold ${labelClass}`}>{statusLabel}</Text>
          </View>
        </View>

        <View className="p-4 pt-3">
          <View className="flex-row gap-2 rounded-xl bg-muted/50 p-3">
            <View className="min-w-0 flex-1">
              <Text className="text-[11px] text-muted-foreground" numberOfLines={1}>
                {t("merchant.bundles.purchasePrice")}
              </Text>
              <Text className="mt-0.5 text-sm font-semibold text-foreground" numberOfLines={1}>
                ₩{item.purchase_price.toLocaleString()}
              </Text>
            </View>
            <View className="w-px self-stretch bg-border" />
            <View className="min-w-0 flex-1 items-center">
              <Text className="text-[11px] text-muted-foreground" numberOfLines={1}>
                {t("merchant.bundles.fee")}
              </Text>
              <Text className="mt-0.5 text-sm font-semibold text-red-600" numberOfLines={1}>
                −₩{item.fee_amount.toLocaleString()}
              </Text>
            </View>
            <View className="w-px self-stretch bg-border" />
            <View className="min-w-0 flex-1 border-l-2 border-primary/35 pl-2">
              <Text className="text-[11px] text-muted-foreground" numberOfLines={1}>
                {t("merchant.bundles.payout")}
              </Text>
              <Text className="mt-0.5 text-base font-bold text-primary" numberOfLines={1}>
                ₩{item.net_amount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader
        elevated
        title={t("merchant.bundles.title")}
        bottom={
          <View className="flex-row mx-4 mb-3 gap-2">
            {(["items", "requests"] as Tab[]).map((subTab) => (
              <TouchableOpacity
                key={subTab}
                onPress={() => setTab(subTab)}
                className={`flex-1 py-3 rounded-lg border ${tab === subTab ? "bg-primary border-primary" : "bg-card border-border"
                  }`}
              >
                <Text
                  className={`text-center font-medium ${tab === subTab ? "text-primary-foreground" : "text-foreground"
                    }`}
                >
                  {subTab === "items" ? t("merchant.bundles.tabItems") : t("merchant.bundles.tabRequests")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : tab === "items" ? (
        <FlatList
          style={{ flex: 1 }}
          data={listItems}
          keyExtractor={(item) =>
            item.type === "set" ? `set-${item.data.set_id}` : `v-${item.data.voucher_id}`
          }
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 0 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">{t("merchant.bundles.emptyItems")}</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={renderRequest}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 0 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">{t("merchant.bundles.emptyRequests")}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
