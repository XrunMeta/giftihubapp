import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_0ddfa5 } from "pntqqtrakxjzccfwvrxdnuch";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_db3cc6 } from "dyunzbus";
import v_a3453e, { v_de06a3, v_c4deb2, v_e662ae, v_5ab095 } from "bapkr";
import {
  v_39a996,
  v_03e392,
  v_9cabcb,
  v_aa7413,
  v_19b633,
  v_4623af,
  v_3094a2,
} from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

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

const v_b69110 = 20;

const v_a3c4f5 = [
  "customer_request",
  "merchant_error",
  "other",
] as const;
type ReasonCode = (typeof v_a3c4f5)[number];

export default function v_ca8e36() {
  const { t: v_8d41d7 } = v_678659();

  const [v_1e43c9, v_e4a227] = v_5ab095("");
  const [v_5d756f, v_a563de] = v_5ab095("");

  const [v_4622b9, v_fa923c] = v_5ab095<UsedVoucherItem[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_612e9f, v_575aad] = v_5ab095(false);
  const [v_2365e9, v_bf9d67] = v_5ab095(1);
  const [v_6bbe19, v_1454f0] = v_5ab095(true);
  const v_b167b5 = v_e662ae(false);

  const [v_587413, v_2122dd] = v_5ab095<Set<string>>(new Set());
  const [v_5476b4, v_171edc] = v_5ab095(false);

  const [v_6f1aa4, v_1a6aaa] = v_5ab095<UsedVoucherItem | null>(null);
  const [v_bf3cca, v_47aa89] = v_5ab095(false);

  const v_d3789a = v_de06a3(
    async (v_e2a85c, v_487a25 = false, v_7c5791 = v_5d756f) => {
      if (v_b167b5.current) return;
      v_b167b5.current = true;
      try {
        let v_f71b56 = `/oth-path?page=${v_e2a85c}&limit=${v_b69110}`;
        if (v_7c5791) v_f71b56 += `&code_suffix=${encodeURIComponent(v_7c5791)}`;
        const v_8f00b9 = await v_bc1b24<UsedVouchersResponse>(v_f71b56);
        const v_b93b94 = v_8f00b9.items ?? [];
        v_fa923c((v_ba2215) => (v_487a25 ? v_b93b94 : [...v_ba2215, ...v_b93b94]));
        v_1454f0(v_b93b94.length === v_b69110);
        v_bf9d67(v_e2a85c);
        if (v_487a25) {
          v_2122dd(new Set());
          v_171edc(false);
        }
      } catch {

      } finally {
        v_34a50a(false);
        v_575aad(false);
        v_b167b5.current = false;
      }
    },
    [v_5d756f],
  );

  v_c4deb2(() => {
    v_d3789a(1, true);
  }, []);

  const v_5e757d = () => {
    v_34a50a(true);
    v_d3789a(1, true, v_1e43c9);
  };

  const v_f616ba = () => {
    v_575aad(true);
    v_d3789a(1, true, v_1e43c9);
  };

  const v_98107c = () => {
    if (!v_b167b5.current && v_6bbe19) {
      v_d3789a(v_2365e9 + 1, false, v_1e43c9);
    }
  };

  const v_9873ff = (v_389afb) => {
    v_2122dd((v_ba2215) => {
      const v_a448ad = new Set(v_ba2215);
      if (v_a448ad.has(v_389afb)) v_a448ad.delete(v_389afb);
      else v_a448ad.add(v_389afb);
      return v_a448ad;
    });
    v_171edc(false);
  };

  const v_0217e6 = () => {
    if (v_5476b4) {
      v_2122dd(new Set());
      v_171edc(false);
    } else {
      v_2122dd(new Set(v_4622b9.map((v_ebec57) => v_ebec57.transaction_id)));
      v_171edc(true);
    }
  };

  const v_ee0050 = async () => {
    try {
      const v_4d33b2 = {};
      if (!v_5476b4) {
        v_4d33b2.transaction_ids = Array.from(v_587413);
      }
      await v_bc1b24("/oth-path", {
        method: "POST",
        body: JSON.stringify(v_4d33b2),
      });
      v_03e392.alert(
        v_8d41d7("merchant.history.settlementRequest"),
        v_8d41d7("merchant.history.settlementDone"),
      );
      v_2122dd(new Set());
      v_171edc(false);
    } catch {
      v_03e392.alert(v_8d41d7("merchant.history.settlementRequest"), v_8d41d7("merchant.history.settlementFail"));
    }
  };

  const v_b1c4ed = (): Promise<ReasonCode | null> =>
    new Promise((v_6f7712) => {
      v_03e392.alert(
        v_8d41d7("merchant.history.cancelReasonTitle"),
        undefined,
        [
          {
            text: v_8d41d7("merchant.history.reasonCustomer"),
            onPress: () => v_6f7712("customer_request"),
          },
          {
            text: v_8d41d7("merchant.history.reasonMerchant"),
            onPress: () => v_6f7712("merchant_error"),
          },
          {
            text: v_8d41d7("merchant.history.reasonOther"),
            onPress: () => v_6f7712("other"),
          },
          {
            text: v_8d41d7("merchant.history.cancelBtn"),
            style: "cancel",
            onPress: () => v_6f7712(null),
          },
        ],
      );
    });

  const v_9589d4 = async (v_8c0b26) => {
    const v_58ca36 = await v_b1c4ed();
    if (!v_58ca36) return;
    v_47aa89(true);
    try {
      await v_bc1b24(
        `/oth-path${v_8c0b26.voucher_id}/cancel`,
        {
          method: "POST",
          body: JSON.stringify({ reason_code: v_58ca36 }),
        },
      );
      v_1a6aaa(null);
      v_d3789a(1, true, v_1e43c9);
    } catch {
      v_03e392.alert(v_8d41d7("merchant.history.cancelDirect"), v_8d41d7("merchant.history.actionFail"));
    } finally {
      v_47aa89(false);
    }
  };

  const v_b9c704 = async (v_8c0b26) => {
    const v_58ca36 = await v_b1c4ed();
    if (!v_58ca36) return;
    v_47aa89(true);
    try {
      await v_bc1b24("/oth-path", {
        method: "POST",
        body: JSON.stringify({
          voucher_id: v_8c0b26.voucher_id,
          transaction_id: v_8c0b26.transaction_id,
          reason_code: v_58ca36,
        }),
      });
      v_1a6aaa(null);
      v_d3789a(1, true, v_1e43c9);
    } catch {
      v_03e392.alert(v_8d41d7("merchant.history.cancelRequest"), v_8d41d7("merchant.history.actionFail"));
    } finally {
      v_47aa89(false);
    }
  };

  const v_c4180e = (v_d308b5) => {
    if (v_d308b5 === "used") return v_8d41d7("merchant.history.statusUsed");
    if (v_d308b5 === "cancelled") return v_8d41d7("merchant.history.statusCancelled");
    return v_8d41d7("merchant.history.statusPending");
  };

  const v_dd5e8b = (v_d308b5) => {
    if (v_d308b5 === "used") return "#16a34a";
    if (v_d308b5 === "cancelled") return "#ef4444";
    return "#f59e0b";
  };

  const v_fcf6ec = ({ item: v_8c0b26 }: { item: UsedVoucherItem }) => {
    const v_05e77d = v_587413.has(v_8c0b26.transaction_id);
    return (
      <TouchableOpacity
        onPress={() => v_1a6aaa(v_8c0b26)}
        className="mx-4 mb-2 bg-card rounded-xl border border-border p-4"
        activeOpacity={0.8}
      >
        <View className="flex-row items-center gap-3">
          {}
          <Checkbox
            checked={v_05e77d}
            onPress={() => v_9873ff(v_8c0b26.transaction_id)}
          />

          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">{v_8c0b26.brand}</Text>
                <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
                  {v_8c0b26.name}
                </Text>
                <Text className="text-xs text-muted-foreground font-mono mt-0.5">
                  {v_8c0b26.receipt_code}
                </Text>
              </View>
              <View className="items-end ml-2">
                <Text className="text-base font-bold text-primary">
                  ₩{v_8c0b26.amount?.toLocaleString()}
                </Text>
                <Text className="text-xs text-muted-foreground mt-0.5">
                  {v_db3cc6(new Date(v_8c0b26.used_at * 1000), "MM.dd HH:mm")}
                </Text>
                <View
                  className="mt-1 px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: v_dd5e8b(v_8c0b26.status) + "20" }}
                >
                  <Text
                    className="text-xs font-medium"
                    style={{ color: v_dd5e8b(v_8c0b26.status) }}
                  >
                    {v_c4180e(v_8c0b26.status)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const v_a75897 = v_5476b4 ? v_4622b9.length : v_587413.size;

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={v_8d41d7("merchant.history.title")} />

      {}
      <View className="flex-row mx-4 mb-2 gap-2">
        <Input
          className="flex-1 bg-card"
          placeholder={v_8d41d7("merchant.history.codeSuffixPlaceholder")}
          placeholderTextColor="#a1a1aa"
          value={v_1e43c9}
          onChangeText={v_e4a227}
          onSubmitEditing={v_5e757d}
          returnKeyType="search"
          autoCapitalize="characters"
        />
        <Button onPress={v_5e757d} className="shrink-0 px-4">
          {v_8d41d7("merchant.history.search")}
        </Button>
      </View>

      {}
      {v_4622b9.length > 0 && (
        <TouchableOpacity
          onPress={v_0217e6}
          className="mx-4 mb-2 flex-row items-center gap-3 rounded-lg py-1 active:opacity-70"
          accessibilityRole="checkbox"
          accessibilityState={{ checked: v_5476b4 }}
        >
          <Checkbox checked={v_5476b4} />
          <Text className="text-sm font-medium text-foreground">
            {v_8d41d7("merchant.history.selectAll")}
          </Text>
        </TouchableOpacity>
      )}

      {}
      {v_683210 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={v_4622b9}
          keyExtractor={(v_8c0b26) => v_8c0b26.transaction_id}
          renderItem={v_fcf6ec}
          onEndReached={v_98107c}
          onEndReachedThreshold={0.3}
          onRefresh={v_f616ba}
          refreshing={v_612e9f}
          contentContainerStyle={{ paddingBottom: v_a75897 > 0 ? 80 : 16 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">{v_8d41d7("merchant.history.empty")}</Text>
            </View>
          }
          ListFooterComponent={
            v_6bbe19 && v_4622b9.length > 0 ? (
              <ActivityIndicator size="small" color="#CE3630" style={{ paddingVertical: 8 }} />
            ) : null
          }
        />
      )}

      {}
      {v_a75897 > 0 && (
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-2 bg-gray-50 border-t border-border">
          <TouchableOpacity
            onPress={v_ee0050}
            className="bg-primary rounded-xl py-4 items-center"
          >
            <Text className="text-primary-foreground font-semibold text-base">
              {v_8d41d7("merchant.history.settlementRequest")} ({v_a75897}건)
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {}
      <Modal
        visible={!!v_6f1aa4}
        transparent
        animationType="slide"
        onRequestClose={() => v_1a6aaa(null)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-card rounded-t-2xl px-5 pt-5 pb-8">
            {v_6f1aa4 && (
              <>
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-bold text-foreground">
                    {v_6f1aa4.name}
                  </Text>
                  <TouchableOpacity onPress={() => v_1a6aaa(null)}>
                    <Text className="text-muted-foreground text-base">✕</Text>
                  </TouchableOpacity>
                </View>

                <View className="gap-3">
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted-foreground">브랜드</Text>
                    <Text className="text-sm font-medium text-foreground">{v_6f1aa4.brand}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted-foreground">금액</Text>
                    <Text className="text-sm font-medium text-foreground">
                      ₩{v_6f1aa4.amount?.toLocaleString()}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted-foreground">액면가</Text>
                    <Text className="text-sm font-medium text-foreground">
                      ₩{v_6f1aa4.face_value?.toLocaleString()}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-muted-foreground">일시</Text>
                    <Text className="text-sm font-medium text-foreground">
                      {v_db3cc6(new Date(v_6f1aa4.used_at * 1000), "yyyy.MM.dd HH:mm")}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm text-muted-foreground">상태</Text>
                    <View
                      className="px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: v_dd5e8b(v_6f1aa4.status) + "20" }}
                    >
                      <Text
                        className="text-xs font-medium"
                        style={{ color: v_dd5e8b(v_6f1aa4.status) }}
                      >
                        {v_c4180e(v_6f1aa4.status)}
                      </Text>
                    </View>
                  </View>
                </View>

                {}
                <View className="mt-4 p-3 bg-white rounded-lg border border-border">
                  <Text className="text-xs text-muted-foreground mb-1">
                    {v_8d41d7("merchant.history.receiptCode")}
                  </Text>
                  <Text className="text-base font-mono tracking-wider text-foreground">
                    {v_6f1aa4.receipt_code}
                  </Text>
                </View>

                {}
                {v_6f1aa4.status === "used" && (
                  <View className="mt-5 gap-3">
                    {v_6f1aa4.cancelable ? (
                      <TouchableOpacity
                        onPress={() => v_9589d4(v_6f1aa4)}
                        disabled={v_bf3cca}
                        className="bg-destructive rounded-xl py-4 items-center"
                      >
                        {v_bf3cca ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Text className="text-white font-semibold text-base">
                            {v_8d41d7("merchant.history.cancelDirect")}
                          </Text>
                        )}
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => v_b9c704(v_6f1aa4)}
                        disabled={v_bf3cca}
                        className="border border-destructive rounded-xl py-4 items-center"
                      >
                        {v_bf3cca ? (
                          <ActivityIndicator size="small" color="#ef4444" />
                        ) : (
                          <Text className="text-destructive font-semibold text-base">
                            {v_8d41d7("merchant.history.cancelRequest")}
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
