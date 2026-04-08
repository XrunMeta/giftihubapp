import { ScreenHeader } from "@/components/ScreenHeader";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { format } from "date-fns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UsedVoucherItem = {
  transaction_id: string;
  voucher_id: string;
  receipt_code: string;
  brand: string;
  name: string;
  amount: number;
  face_value: number;
  used_at: number;
  cancelable: boolean;
  cancel_window_remaining_sec: number;
  status: "used" | "cancelled" | "request_pending";
  cancellation_request_id: string | null;
};

type UsedVouchersResponse = {
  items: UsedVoucherItem[];
  total: number;
  page: number;
  limit: number;
};

const LIMIT = 20;

const REASON_CODES = [
  "customer_request",
  "merchant_error",
  "other",
] as const;
type ReasonCode = (typeof REASON_CODES)[number];

export default function MerchantHistoryScreen() {
  const { t } = useI18n();

  const [codeSuffix, setCodeSuffix] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [items, setItems] = useState<UsedVoucherItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [allSelected, setAllSelected] = useState(false);

  const [modalItem, setModalItem] = useState<UsedVoucherItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchItems = useCallback(
    async (p: number, reset = false, query = searchQuery) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      try {
        let url = `/oth-path?page=${p}&limit=${LIMIT}`;
        if (query) url += `&code_suffix=${encodeURIComponent(query)}`;
        const res = await apiFetch<UsedVouchersResponse>(url);
        const newItems = res.items ?? [];
        setItems((prev) => (reset ? newItems : [...prev, ...newItems]));
        setHasMore(newItems.length === LIMIT);
        setPage(p);
        if (reset) {
          setSelected(new Set());
          setAllSelected(false);
        }
      } catch {

      } finally {
        setLoading(false);
        setRefreshing(false);
        loadingRef.current = false;
      }
    },
    [searchQuery],
  );

  useEffect(() => {
    fetchItems(1, true);
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetchItems(1, true, codeSuffix);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchItems(1, true, codeSuffix);
  };

  const handleEndReached = () => {
    if (!loadingRef.current && hasMore) {
      fetchItems(page + 1, false, codeSuffix);
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setAllSelected(false);
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
      setAllSelected(false);
    } else {
      setSelected(new Set(items.map((i) => i.transaction_id)));
      setAllSelected(true);
    }
  };

  const handleSettlementRequest = async () => {
    try {
      const body: Record<string, unknown> = {};
      if (!allSelected) {
        body.transaction_ids = Array.from(selected);
      }
      await apiFetch("/oth-path", {
        method: "POST",
        body: JSON.stringify(body),
      });
      Alert.alert(
        t("merchant.history.settlementRequest"),
        t("merchant.history.settlementDone"),
      );
      setSelected(new Set());
      setAllSelected(false);
    } catch {
      Alert.alert(t("merchant.history.settlementRequest"), t("merchant.history.settlementFail"));
    }
  };

  const pickReasonCode = (): Promise<ReasonCode | null> =>
    new Promise((resolve) => {
      Alert.alert(
        t("merchant.history.cancelReasonTitle"),
        undefined,
        [
          {
            text: t("merchant.history.reasonCustomer"),
            onPress: () => resolve("customer_request"),
          },
          {
            text: t("merchant.history.reasonMerchant"),
            onPress: () => resolve("merchant_error"),
          },
          {
            text: t("merchant.history.reasonOther"),
            onPress: () => resolve("other"),
          },
          {
            text: t("merchant.history.cancelBtn"),
            style: "cancel",
            onPress: () => resolve(null),
          },
        ],
      );
    });

  const handleCancelDirect = async (item: UsedVoucherItem) => {
    const reason = await pickReasonCode();
    if (!reason) return;
    setActionLoading(true);
    try {
      await apiFetch(
        `/oth-path${item.voucher_id}/cancel`,
        {
          method: "POST",
          body: JSON.stringify({ reason_code: reason }),
        },
      );
      setModalItem(null);
      fetchItems(1, true, codeSuffix);
    } catch {
      Alert.alert(t("merchant.history.cancelDirect"), t("merchant.history.actionFail"));
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelRequest = async (item: UsedVoucherItem) => {
    const reason = await pickReasonCode();
    if (!reason) return;
    setActionLoading(true);
    try {
      await apiFetch("/oth-path", {
        method: "POST",
        body: JSON.stringify({
          voucher_id: item.voucher_id,
          transaction_id: item.transaction_id,
          reason_code: reason,
        }),
      });
      setModalItem(null);
      fetchItems(1, true, codeSuffix);
    } catch {
      Alert.alert(t("merchant.history.cancelRequest"), t("merchant.history.actionFail"));
    } finally {
      setActionLoading(false);
    }
  };

  const statusLabel = (status: UsedVoucherItem["status"]) => {
    if (status === "used") return t("merchant.history.statusUsed");
    if (status === "cancelled") return t("merchant.history.statusCancelled");
    return t("merchant.history.statusPending");
  };

  const statusColor = (status: UsedVoucherItem["status"]) => {
    if (status === "used") return "#16a34a";
    if (status === "cancelled") return "#ef4444";
    return "#f59e0b";
  };

  const renderItem = ({ item }: { item: UsedVoucherItem }) => {
    const isChecked = selected.has(item.transaction_id);
    return (
      <TouchableOpacity
        onPress={() => setModalItem(item)}
        className="mx-4 mb-2 bg-card rounded-xl border border-border p-4"
        activeOpacity={0.8}
      >
        <View className="flex-row items-center gap-3">
          {}
          <TouchableOpacity
            onPress={() => toggleSelect(item.transaction_id)}
            className={`w-5 h-5 rounded border-2 items-center justify-center ${
              isChecked ? "bg-primary border-primary" : "border-border bg-white"
            }`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {isChecked && (
              <Text className="text-white text-xs font-bold">✓</Text>
            )}
          </TouchableOpacity>

          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">{item.brand}</Text>
                <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-xs text-muted-foreground font-mono mt-0.5">
                  {item.receipt_code}
                </Text>
              </View>
              <View className="items-end ml-2">
                <Text className="text-base font-bold text-primary">
                  ₩{item.amount?.toLocaleString()}
                </Text>
                <Text className="text-xs text-muted-foreground mt-0.5">
                  {format(new Date(item.used_at * 1000), "MM.dd HH:mm")}
                </Text>
                <View
                  className="mt-1 px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: statusColor(item.status) + "20" }}
                >
                  <Text
                    className="text-xs font-medium"
                    style={{ color: statusColor(item.status) }}
                  >
                    {statusLabel(item.status)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const selectedCount = allSelected ? items.length : selected.size;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={t("merchant.history.title")} />

      {}
      <View className="flex-row mx-4 mt-3 mb-2 gap-2">
        <TextInput
          className="flex-1 bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground"
          placeholder={t("merchant.history.codeSuffixPlaceholder")}
          placeholderTextColor="#a1a1aa"
          value={codeSuffix}
          onChangeText={setCodeSuffix}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="characters"
        />
        <TouchableOpacity
          onPress={handleSearch}
          className="bg-primary px-4 rounded-lg items-center justify-center"
        >
          <Text className="text-primary-foreground text-sm font-medium">
            {t("merchant.history.search")}
          </Text>
        </TouchableOpacity>
      </View>

      {}
      {items.length > 0 && (
        <TouchableOpacity
          onPress={toggleAll}
          className="flex-row items-center mx-4 mb-2 gap-2"
        >
          <View
            className={`w-5 h-5 rounded border-2 items-center justify-center ${
              allSelected ? "bg-primary border-primary" : "border-border bg-white"
            }`}
          >
            {allSelected && (
              <Text className="text-white text-xs font-bold">✓</Text>
            )}
          </View>
          <Text className="text-sm text-muted-foreground">
            {t("merchant.history.selectAll")}
          </Text>
        </TouchableOpacity>
      )}

      {}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={items}
          keyExtractor={(item) => item.transaction_id}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          contentContainerStyle={{ paddingBottom: selectedCount > 0 ? 80 : 16 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">{t("merchant.history.empty")}</Text>
            </View>
          }
          ListFooterComponent={
            hasMore && items.length > 0 ? (
              <ActivityIndicator size="small" color="#CE3630" style={{ paddingVertical: 8 }} />
            ) : null
          }
        />
      )}

      {}
      {selectedCount > 0 && (
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-2 bg-gray-50 border-t border-border">
          <TouchableOpacity
            onPress={handleSettlementRequest}
            className="bg-primary rounded-xl py-4 items-center"
          >
            <Text className="text-primary-foreground font-semibold text-base">
              {t("merchant.history.settlementRequest")} ({selectedCount}건)
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {}
      <Modal
        visible={!!modalItem}
        transparent
        animationType="slide"
        onRequestClose={() => setModalItem(null)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-card rounded-t-2xl px-5 pt-5 pb-8">
            {modalItem && (
              <>
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-bold text-foreground">
                    {modalItem.name}
                  </Text>
                  <TouchableOpacity onPress={() => setModalItem(null)}>
                    <Text className="text-muted-foreground text-base">✕</Text>
                  </TouchableOpacity>
                </View>

                <View className="gap-3">
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted-foreground">브랜드</Text>
                    <Text className="text-sm font-medium text-foreground">{modalItem.brand}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted-foreground">금액</Text>
                    <Text className="text-sm font-medium text-foreground">
                      ₩{modalItem.amount?.toLocaleString()}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted-foreground">액면가</Text>
                    <Text className="text-sm font-medium text-foreground">
                      ₩{modalItem.face_value?.toLocaleString()}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted-foreground">일시</Text>
                    <Text className="text-sm font-medium text-foreground">
                      {format(new Date(modalItem.used_at * 1000), "yyyy.MM.dd HH:mm")}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-muted-foreground">상태</Text>
                    <View
                      className="px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: statusColor(modalItem.status) + "20" }}
                    >
                      <Text
                        className="text-xs font-medium"
                        style={{ color: statusColor(modalItem.status) }}
                      >
                        {statusLabel(modalItem.status)}
                      </Text>
                    </View>
                  </View>
                </View>

                {}
                <View className="mt-4 p-3 bg-white rounded-lg border border-border">
                  <Text className="text-xs text-muted-foreground mb-1">
                    {t("merchant.history.receiptCode")}
                  </Text>
                  <Text className="text-base font-mono tracking-wider text-foreground">
                    {modalItem.receipt_code}
                  </Text>
                </View>

                {}
                {modalItem.status === "used" && (
                  <View className="mt-5 gap-3">
                    {modalItem.cancelable ? (
                      <TouchableOpacity
                        onPress={() => handleCancelDirect(modalItem)}
                        disabled={actionLoading}
                        className="bg-destructive rounded-xl py-4 items-center"
                      >
                        {actionLoading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Text className="text-white font-semibold text-base">
                            {t("merchant.history.cancelDirect")}
                          </Text>
                        )}
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleCancelRequest(modalItem)}
                        disabled={actionLoading}
                        className="border border-destructive rounded-xl py-4 items-center"
                      >
                        {actionLoading ? (
                          <ActivityIndicator size="small" color="#ef4444" />
                        ) : (
                          <Text className="text-destructive font-semibold text-base">
                            {t("merchant.history.cancelRequest")}
                          </Text>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
