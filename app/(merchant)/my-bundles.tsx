import { ScreenHeader } from "@/components/ScreenHeader";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/context/I18nContext";
import { resolveImageUrl } from "@/lib/image";
import {
  getBundleSettlementRequests,
  getMyBundles,
  requestBundleSettlement,
  type BundleSettlementRequest,
  type MerchantBundle,
} from "@/services/bundle";
import { Package } from "lucide-react-native";
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

const REQ_STATUS_META: Record<string, { labelKey: string; color: string }> = {
  pending: { labelKey: "merchant.bundles.reqStatusPending", color: "text-yellow-600" },
  approved: { labelKey: "merchant.bundles.reqStatusApproved", color: "text-green-600" },
  rejected: { labelKey: "merchant.bundles.reqStatusRejected", color: "text-red-600" },
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
      return (
        <View className="mx-4 mb-2 bg-card rounded-xl border border-primary/30 px-4 py-3">
          <View className="flex-row items-center mb-2">
            <View className="w-7 h-7 rounded-lg bg-primary/10 items-center justify-center mr-2">
              <Package size={14} color="#CE3630" />
            </View>
            <Text className="text-xs font-semibold text-primary">
              {t("merchant.bundles.bundleBadge").replace(/\{\{count\}\}/g, String(b.voucher_count))}
            </Text>
          </View>
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-3">
              <Text className="text-sm font-semibold text-foreground">{b.set_name}</Text>
              <Text className="text-xs text-muted-foreground mt-0.5">
                {t("merchant.bundles.statusPrefix")} {b.statuses}
              </Text>
            </View>
            <Text className="text-base font-bold text-foreground">
              ₩{b.total_face_value.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleRequestSettlement(b)}
            className="mt-2 bg-primary rounded-lg py-2"
          >
            <Text className="text-center text-sm font-semibold text-primary-foreground">{t("merchant.bundles.requestBtn")}</Text>
          </TouchableOpacity>
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
    const status = reqMeta
      ? { label: t(reqMeta.labelKey), color: reqMeta.color }
      : { label: item.status, color: "text-foreground" };
    const date = new Date(item.created_at * 1000);
    const dateStr = `${date.getMonth() + 1}.${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

    return (
      <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xs text-muted-foreground">{dateStr}</Text>
          <Text className={`text-xs font-semibold ${status.color}`}>{status.label}</Text>
        </View>
        <Separator className="mb-2" />
        <View className="flex-row justify-between">
          <View>
            <Text className="text-xs text-muted-foreground">{t("merchant.bundles.purchasePrice")}</Text>
            <Text className="text-sm font-medium text-foreground">
              ₩{item.purchase_price.toLocaleString()}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-muted-foreground">{t("merchant.bundles.fee")}</Text>
            <Text className="text-sm font-medium text-red-500">
              -₩{item.fee_amount.toLocaleString()}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-muted-foreground">{t("merchant.bundles.payout")}</Text>
            <Text className="text-sm font-bold text-primary">
              ₩{item.net_amount.toLocaleString()}
            </Text>
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
                  className={`text-center text-sm font-medium ${tab === subTab ? "text-primary-foreground" : "text-foreground"
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
