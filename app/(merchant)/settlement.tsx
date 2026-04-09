import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_b34ce5 } from "oenczknsnztwieeomtluxbmbxyebkkqcr";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_429ab0, v_9265a9 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_c4deb2, v_df9f57, v_5ab095 } from "bapkr";
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

type SettlementRecord = {
  id: string; period_from: string; period_to: string; type: string;
  total_amount: number; fee_amount: number; net_amount: number;
  status: string; tx_hash: string | null; bank_ref: string | null;
  memo: string | null; item_count: number; created_at: number; settled_at: number | null;
};

type Tab = "settlement" | "records";
type Period = "7d" | "30d" | "90d";

export default function v_0842da() {
  const { t: v_8d41d7 } = v_678659();
  const v_21af5b = v_df9f57(
    () =>
      [
        { key: "7d" as const, label: v_8d41d7("merchant.settlement.days7"), days: 7 },
        { key: "30d" as const, label: v_8d41d7("merchant.settlement.days30"), days: 30 },
        { key: "90d" as const, label: v_8d41d7("merchant.settlement.days90"), days: 90 },
      ] as const,
    [v_8d41d7],
  );
  const v_a3aa19 = v_df9f57(
    () =>
      [
        { key: "", label: v_8d41d7("merchant.settlement.filterAll") },
        { key: "settling", label: v_8d41d7("merchant.settlement.filterSettling") },
        { key: "settled", label: v_8d41d7("merchant.settlement.filterSettled") },
      ] as const,
    [v_8d41d7],
  );
  const [v_11083e, v_94ee83] = v_5ab095<Tab>("settlement");

  const [v_b595e3, v_6231e1] = v_5ab095<SettlementResponse | null>(null);
  const [v_0636ca, v_cc58f1] = v_5ab095(true);
  const [v_783ad3, v_6fa4d3] = v_5ab095<Period>("30d");

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
      const v_6a53fd = v_21af5b.find((v_62c214) => v_62c214.key === v_e2a85c)!.days;
      const v_a13c2e = Math.floor(Date.now() / 1000) - v_6a53fd * 86400;
      const v_8f00b9 = await v_bc1b24<SettlementResponse>(`/oth-path?from=${v_a13c2e}`);
      v_6231e1(v_8f00b9);
    } catch {

    } finally {
      v_cc58f1(false);
    }
  }, [v_21af5b]);

  v_c4deb2(() => {
    if (v_11083e === "settlement") v_77b1a5(v_783ad3);
  }, [v_783ad3, v_11083e, v_77b1a5]);

  const v_e01a2e = ({ item: v_8c0b26 }: { item: DailyItem }) => (
    <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="min-w-0 flex-1 flex-row items-center gap-3">
          <View className="h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
            <Calendar size={20} color="#737373" strokeWidth={2} />
          </View>
          <View className="min-w-0 flex-1">
            <Text className="text-base font-bold text-foreground" numberOfLines={1}>
              {v_8c0b26.date}
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              {v_8c0b26.count}
              {v_8d41d7("merchant.settlement.countSuffix")}
            </Text>
          </View>
        </View>
        <Text className="ml-2 shrink-0 text-lg font-bold text-primary">
          ₩{v_8c0b26.total_amount?.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  const v_d8cb4d = {
    pending: "#f59e0b",
    settling: "#3b82f6",
    settled: "#22c55e",
    rejected: "#ef4444",
  };
  const v_fe653f = (v_fd5f43) =>
    ({
      pending: v_8d41d7("merchant.settlement.recPending"),
      settling: v_8d41d7("merchant.settlement.recSettling"),
      settled: v_8d41d7("merchant.settlement.recSettled"),
      rejected: v_8d41d7("merchant.settlement.recRejected"),
    } as Record<string, string>)[v_fd5f43] ?? v_fd5f43;

  const v_bc6f27 = ({ item: v_8c0b26 }: { item: SettlementRecord }) => (
    <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <View className="flex-row items-start justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3">
        <View className="min-w-0 flex-1 flex-row items-start gap-3">
          <View className="mt-0.5 h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
            <ReceiptText size={18} color="#737373" strokeWidth={2} />
          </View>
          <View className="min-w-0 flex-1">
            <Text className="text-sm font-medium leading-5 text-muted-foreground">
              {v_8c0b26.period_from} ~ {v_8c0b26.period_to}
            </Text>
            <Text className="mt-1.5 text-base font-bold text-foreground">
              {v_8c0b26.type === "bundle" ? v_8d41d7("merchant.settlement.typeBundle") : v_8d41d7("merchant.settlement.typeNormal")} ·{" "}
              {v_8c0b26.item_count}
              {v_8d41d7("merchant.settlement.countSuffix")}
            </Text>
          </View>
        </View>
        <View
          className="shrink-0 rounded-full px-2.5 py-1.5"
          style={{ backgroundColor: (v_d8cb4d[v_8c0b26.status] ?? "#737373") + "22" }}
        >
          <Text className="text-sm font-semibold" style={{ color: v_d8cb4d[v_8c0b26.status] ?? "#737373" }}>
            {v_fe653f(v_8c0b26.status)}
          </Text>
        </View>
      </View>

      <View className="gap-2.5 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-muted-foreground">{v_8d41d7("merchant.settlement.totalLabel")}</Text>
          <Text className="text-sm font-semibold text-foreground">₩{v_8c0b26.total_amount?.toLocaleString()}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-muted-foreground">{v_8d41d7("merchant.settlement.feeLabel")}</Text>
          <Text className="text-sm font-semibold text-red-600">−₩{v_8c0b26.fee_amount?.toLocaleString()}</Text>
        </View>
        <View className="h-px bg-border" />
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-medium text-foreground">{v_8d41d7("merchant.settlement.netLabel")}</Text>
          <Text className="text-lg font-bold text-primary">₩{v_8c0b26.net_amount?.toLocaleString()}</Text>
        </View>
      </View>

      {(v_8c0b26.tx_hash || v_8c0b26.bank_ref) && (
        <View className="border-t border-border bg-muted/20 px-4 py-2.5">
          <Text className="text-xs leading-5 text-muted-foreground" numberOfLines={2}>
            {v_8c0b26.tx_hash
              ? `${v_8d41d7("merchant.settlement.txPrefix")}${v_8c0b26.tx_hash}`
              : `${v_8d41d7("merchant.settlement.bankPrefix")}${v_8c0b26.bank_ref}`}
          </Text>
        </View>
      )}
    </View>
  );

  const v_61f339 = () => (
    <View className="flex-row mx-4 mb-3 gap-2">
      {(["settlement", "records"] as Tab[]).map((v_4abce2) => (
        <TouchableOpacity
          key={v_4abce2}
          onPress={() => v_94ee83(v_4abce2)}
          className={`flex-1 py-3 rounded-lg border ${v_11083e === v_4abce2 ? "bg-primary border-primary" : "bg-card border-border"
            }`}
        >
          <Text
            className={`text-center font-medium ${v_11083e === v_4abce2 ? "text-primary-foreground" : "text-foreground"
              }`}
          >
            {v_4abce2 === "settlement"
              ? v_8d41d7("merchant.settlement.tabSummary")
              : v_8d41d7("merchant.settlement.tabRecords")}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={v_8d41d7("merchant.settlement.title")} bottom={<TabSelector />} />

      {v_11083e === "settlement" ? (
        <>
          {}
          <SegmentedControl<Period>
            className="mx-4 mb-3"
            value={v_783ad3}
            onChange={v_6fa4d3}
            options={v_21af5b.map((v_e2a85c) => ({ value: v_e2a85c.key, label: v_e2a85c.label }))}
          />

          {}
          {v_b595e3 && !v_0636ca && (
            <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm p-5">
              <View className="flex-row justify-between">
                <View className="flex-1 items-center">
                  <Text className="text-sm font-medium text-muted-foreground">
                    {v_8d41d7("merchant.settlement.totalCountLabel")}
                  </Text>
                  <Text className="mt-2 text-2xl font-bold text-foreground">
                    {v_b595e3.summary.total_count}
                    {v_8d41d7("merchant.settlement.countSuffix")}
                  </Text>
                </View>
                <Separator orientation="vertical" />
                <View className="flex-1 items-center">
                  <Text className="text-sm font-medium text-muted-foreground">
                    {v_8d41d7("merchant.settlement.totalAmountLabel")}
                  </Text>
                  <Text className="mt-2 text-2xl font-bold text-primary">
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
              style={{ flex: 1 }}
              data={v_b595e3?.daily ?? []}
              keyExtractor={(v_8c0b26) => v_8c0b26.date}
              renderItem={v_e01a2e}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-base text-muted-foreground">{v_8d41d7("merchant.settlement.emptyDaily")}</Text>
                </View>
              }
            />
          )}
        </>
      ) : (
        <>
          {}
          <View className="flex-row mx-4 mb-3 gap-2">
            {v_a3aa19.map((v_8b5cd8) => (
              <TouchableOpacity
                key={v_8b5cd8.key}
                onPress={() => v_7bd90a(v_8b5cd8.key)}
                className={`px-3 py-1.5 rounded-full border ${v_ded9f6 === v_8b5cd8.key ? "bg-primary border-primary" : "bg-card border-border"
                  }`}
              >
                <Text className={`text-sm font-medium ${v_ded9f6 === v_8b5cd8.key ? "text-primary-foreground" : "text-foreground"}`}>
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
              style={{ flex: 1 }}
              data={v_678155}
              keyExtractor={(v_8c0b26) => v_8c0b26.id}
              renderItem={v_bc6f27}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-20">
                  <Text className="text-base text-muted-foreground">{v_8d41d7("merchant.settlement.emptyRecords")}</Text>
                </View>
              }
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
