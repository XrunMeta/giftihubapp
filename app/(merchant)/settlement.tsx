import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_db3cc6 } from "dyunzbus";
import v_a3453e, { v_de06a3, v_c4deb2, v_5ab095 } from "bapkr";
import {
  v_39a996,
  v_9cabcb,
  v_19b633,
  v_4623af,
  v_3094a2,
} from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

type DailyItem = { date: string; count: number; total_amount: number };
type SettlementResponse = {
  daily: DailyItem[];
  summary: { total_count: number; total_amount: number };
};

type HistoryItem = {
  id: string;
  type: string;
  amount: number;
  created_at: number;
  brand: string | null;
  name: string | null;
  face_value: number | null;
  user_name: string | null;
};
type HistoryResponse = {
  history: HistoryItem[];
  total: number;
  page: number;
  limit: number;
};

type SettlementRecord = {
  id: string; period_from: string; period_to: string; type: string;
  total_amount: number; fee_amount: number; net_amount: number;
  status: string; tx_hash: string | null; bank_ref: string | null;
  memo: string | null; item_count: number; created_at: number; settled_at: number | null;
};

type Tab = "settlement" | "history" | "records";
type Period = "7d" | "30d" | "90d";

const v_dcdbc4 = [
  { key: "7d", label: "7일", days: 7 },
  { key: "30d", label: "30일", days: 30 },
  { key: "90d", label: "90일", days: 90 },
];

const v_b69110 = 20;

export default function v_0842da() {
  const [v_11083e, v_94ee83] = v_5ab095<Tab>("settlement");

  const [v_b595e3, v_6231e1] = v_5ab095<SettlementResponse | null>(null);
  const [v_0636ca, v_cc58f1] = v_5ab095(true);
  const [v_783ad3, v_6fa4d3] = v_5ab095<Period>("30d");

  const [v_09072d, v_c718c3] = v_5ab095<HistoryItem[]>([]);
  const [v_c2880b, v_68448d] = v_5ab095(true);
  const [v_854d14, v_3321fd] = v_5ab095(false);
  const [v_d262dd, v_6ac00b] = v_5ab095(1);
  const [v_02e02d, v_7ebb88] = v_5ab095(true);

  const [v_678155, v_9ed182] = v_5ab095<SettlementRecord[]>([]);
  const [v_49133e, v_018923] = v_5ab095(false);
  const [v_ded9f6, v_7bd90a] = v_5ab095<string>("");

  const v_efc1dd = v_de06a3(async () => {
    v_018923(true);
    try {
      const v_24baff = v_ded9f6 ? `?status=${v_ded9f6}` : "";
      const v_9390e8 = await v_bc1b24<{ records: SettlementRecord[] }>(`/oth-path${v_24baff}`);
      v_9ed182(v_9390e8.records);
    } catch { }
    v_018923(false);
  }, [v_ded9f6]);

  v_c4deb2(() => { if (v_11083e === "records") v_efc1dd(); }, [v_11083e, v_ded9f6]);

  const v_77b1a5 = v_de06a3(async (v_e2a85c) => {
    v_cc58f1(true);
    try {
      const v_6a53fd = v_dcdbc4.find((v_62c214) => v_62c214.key === v_e2a85c)!.days;
      const v_a13c2e = Math.floor(Date.now() / 1000) - v_6a53fd * 86400;
      const v_8f00b9 = await v_bc1b24<SettlementResponse>(`/oth-path?from=${v_a13c2e}`);
      v_6231e1(v_8f00b9);
    } catch {

    } finally {
      v_cc58f1(false);
    }
  }, []);

  v_c4deb2(() => {
    if (v_11083e === "settlement") v_77b1a5(v_783ad3);
  }, [v_783ad3, v_11083e, v_77b1a5]);

  const v_337eb3 = v_de06a3(async (v_e2a85c, v_487a25 = false) => {
    try {
      const v_8f00b9 = await v_bc1b24<HistoryResponse>(`/oth-path?page=${v_e2a85c}&limit=${v_b69110}`);
      v_c718c3((v_ba2215) => (v_487a25 ? v_8f00b9.history : [...v_ba2215, ...v_8f00b9.history]));
      v_7ebb88(v_8f00b9.history.length === v_b69110);
      v_6ac00b(v_e2a85c);
    } catch {

    } finally {
      v_68448d(false);
      v_3321fd(false);
    }
  }, []);

  v_c4deb2(() => {
    if (v_11083e === "history") {
      v_68448d(true);
      v_337eb3(1, true);
    }
  }, [v_11083e, v_337eb3]);

  const v_e01a2e = ({ item: v_8c0b26 }: { item: DailyItem }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-sm font-medium text-foreground">{v_8c0b26.date}</Text>
          <Text className="text-xs text-muted-foreground mt-0.5">{v_8c0b26.count}건</Text>
        </View>
        <Text className="text-base font-bold text-foreground">
          ₩{v_8c0b26.total_amount?.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  const v_5e3978 = ({ item: v_8c0b26 }: { item: HistoryItem }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border p-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-xs text-muted-foreground">{v_8c0b26.brand ?? "-"}</Text>
          <Text className="text-base font-semibold text-foreground">
            {v_8c0b26.name ?? "알 수 없음"}
          </Text>
          {v_8c0b26.user_name && (
            <Text className="text-xs text-muted-foreground mt-0.5">
              사용자: {v_8c0b26.user_name}
            </Text>
          )}
        </View>
        <View className="items-end">
          <Text className="text-base font-bold text-primary">
            ₩{v_8c0b26.amount?.toLocaleString()}
          </Text>
          <Text className="text-xs text-muted-foreground mt-1">
            {v_db3cc6(new Date(v_8c0b26.created_at * 1000), "MM.dd HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );

  const v_d8cb4d = {
    pending: "#f59e0b",
    settling: "#3b82f6",
    settled: "#22c55e",
    rejected: "#ef4444",
  };
  const v_e53bff = {
    pending: "대기", settling: "정산중", settled: "완료", rejected: "거절",
  };

  const v_bc6f27 = ({ item: v_8c0b26 }: { item: SettlementRecord }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border p-4">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-xs text-muted-foreground">
            {v_8c0b26.period_from} ~ {v_8c0b26.period_to}
          </Text>
          <Text className="text-sm font-semibold text-foreground mt-0.5">
            {v_8c0b26.type === "bundle" ? "묶음" : "일반"} · {v_8c0b26.item_count}건
          </Text>
        </View>
        <View className="px-2 py-1 rounded-full" style={{ backgroundColor: (v_d8cb4d[v_8c0b26.status] ?? "#737373") + "20" }}>
          <Text className="text-xs font-medium" style={{ color: v_d8cb4d[v_8c0b26.status] ?? "#737373" }}>
            {v_e53bff[v_8c0b26.status] ?? v_8c0b26.status}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-xs text-muted-foreground">총액</Text>
        <Text className="text-xs text-foreground font-medium">₩{v_8c0b26.total_amount?.toLocaleString()}</Text>
      </View>
      <View className="flex-row justify-between mt-0.5">
        <Text className="text-xs text-muted-foreground">수수료</Text>
        <Text className="text-xs text-muted-foreground">-₩{v_8c0b26.fee_amount?.toLocaleString()}</Text>
      </View>
      <View className="flex-row justify-between mt-0.5">
        <Text className="text-xs text-muted-foreground">실수령</Text>
        <Text className="text-sm font-bold text-primary">₩{v_8c0b26.net_amount?.toLocaleString()}</Text>
      </View>
      {(v_8c0b26.tx_hash || v_8c0b26.bank_ref) && (
        <Text className="text-xs text-muted-foreground mt-2" numberOfLines={1}>
          {v_8c0b26.tx_hash ? `TX: ${v_8c0b26.tx_hash}` : `은행: ${v_8c0b26.bank_ref}`}
        </Text>
      )}
    </View>
  );

  const v_61f339 = () => (
    <View className="flex-row mx-4 mb-3 gap-2">
      {(["settlement", "history", "records"] as Tab[]).map((v_8d41d7) => (
        <TouchableOpacity
          key={v_8d41d7}
          onPress={() => v_94ee83(v_8d41d7)}
          className={`flex-1 py-3 rounded-lg border ${v_11083e === v_8d41d7 ? "bg-primary border-primary" : "bg-card border-border"
            }`}
        >
          <Text
            className={`text-center text-sm font-medium ${v_11083e === v_8d41d7 ? "text-primary-foreground" : "text-foreground"
              }`}
          >
            {v_8d41d7 === "settlement" ? "정산 집계" : v_8d41d7 === "history" ? "사용 이력" : "정산현황"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      <ScreenHeader elevated title="정산" bottom={<TabSelector />} />

      {v_11083e === "settlement" ? (
        <>
          {}
          <View className="flex-row mx-4 mb-3 gap-2">
            {v_dcdbc4.map((v_e2a85c) => (
              <TouchableOpacity
                key={v_e2a85c.key}
                onPress={() => v_6fa4d3(v_e2a85c.key)}
                className={`flex-1 py-3 rounded-lg border ${v_783ad3 === v_e2a85c.key ? "bg-primary border-primary" : "bg-card border-border"
                  }`}
              >
                <Text
                  className={`text-center text-sm font-medium ${v_783ad3 === v_e2a85c.key ? "text-primary-foreground" : "text-foreground"
                    }`}
                >
                  {v_e2a85c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {}
          {v_b595e3 && !v_0636ca && (
            <View className="mx-4 mb-3 bg-card rounded-xl border border-border p-4">
              <View className="flex-row justify-between">
                <View className="items-center flex-1">
                  <Text className="text-xs text-muted-foreground">총 건수</Text>
                  <Text className="text-xl font-bold text-foreground mt-1">
                    {v_b595e3.summary.total_count}건
                  </Text>
                </View>
                <Separator orientation="vertical" />
                <View className="items-center flex-1">
                  <Text className="text-xs text-muted-foreground">총 금액</Text>
                  <Text className="text-xl font-bold text-primary mt-1">
                    ₩{v_b595e3.summary.total_amount?.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {v_0636ca ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : (
            <FlatList
              data={v_b595e3?.daily ?? []}
              keyExtractor={(v_8c0b26) => v_8c0b26.date}
              renderItem={v_e01a2e}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-muted-foreground">정산 내역이 없습니다.</Text>
                </View>
              }
            />
          )}
        </>
      ) : v_11083e === "history" ? (
        v_c2880b ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#CE3630" />
          </View>
        ) : (
          <FlatList
            data={v_09072d}
            keyExtractor={(v_8c0b26) => v_8c0b26.id}
            renderItem={v_5e3978}
            onEndReached={() => {
              if (!v_c2880b && v_02e02d) v_337eb3(v_d262dd + 1);
            }}
            onEndReachedThreshold={0.3}
            onRefresh={() => {
              v_3321fd(true);
              v_337eb3(1, true);
            }}
            refreshing={v_854d14}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center py-20">
                <Text className="text-muted-foreground">사용 이력이 없습니다.</Text>
              </View>
            }
            ListFooterComponent={
              v_02e02d && v_09072d.length > 0 ? (
                <ActivityIndicator size="small" color="#CE3630" style={{ padding: 16 }} />
              ) : null
            }
          />
        )
      ) : (
        <>
          {}
          <View className="flex-row mx-4 mb-3 gap-2">
            {[{ key: "", label: "전체" }, { key: "settling", label: "정산중" }, { key: "settled", label: "완료" }].map((v_8b5cd8) => (
              <TouchableOpacity
                key={v_8b5cd8.key}
                onPress={() => v_7bd90a(v_8b5cd8.key)}
                className={`px-3 py-1.5 rounded-full border ${v_ded9f6 === v_8b5cd8.key ? "bg-primary border-primary" : "bg-card border-border"
                  }`}
              >
                <Text className={`text-xs font-medium ${v_ded9f6 === v_8b5cd8.key ? "text-primary-foreground" : "text-foreground"}`}>
                  {v_8b5cd8.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {v_49133e ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : (
            <FlatList
              data={v_678155}
              keyExtractor={(v_8c0b26) => v_8c0b26.id}
              renderItem={v_bc6f27}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-muted-foreground">정산 내역이 없습니다.</Text>
                </View>
              }
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
