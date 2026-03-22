import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_9cabcb, v_39a996, v_4623af } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";

type DailyItem = {
  date: string;
  count: number;
  total_amount: number;
};

type SettlementResponse = {
  daily: DailyItem[];
  summary: {
    total_count: number;
    total_amount: number;
  };
};

type Period = "7d" | "30d" | "90d";

const v_dcdbc4 = [
  { key: "7d", label: "7일", days: 7 },
  { key: "30d", label: "30일", days: 30 },
  { key: "90d", label: "90일", days: 90 },
];

export default function v_0842da() {
  const [v_9390e8, v_d57c80] = v_5ab095<SettlementResponse | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_783ad3, v_6fa4d3] = v_5ab095<Period>("30d");

  const v_77b1a5 = async (v_e2a85c) => {
    v_34a50a(true);
    try {
      const v_6a53fd = v_dcdbc4.find((v_62c214) => v_62c214.key === v_e2a85c)!.days;
      const v_a13c2e = Math.floor(Date.now() / 1000) - v_6a53fd * 86400;
      const v_8f00b9 = await v_bc1b24<SettlementResponse>(`/oth-path?from=${v_a13c2e}`);
      v_d57c80(v_8f00b9);
    } catch {

    } finally {
      v_34a50a(false);
    }
  };

  v_c4deb2(() => {
    v_77b1a5(v_783ad3);
  }, [v_783ad3]);

  const v_fcf6ec = ({ item: v_8c0b26 }: { item: DailyItem }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-sm font-medium text-foreground">{v_8c0b26.date}</Text>
          <Text className="text-xs text-muted-foreground mt-0.5">{v_8c0b26.count}건</Text>
        </View>
        <Text className="text-base font-bold text-foreground">₩{v_8c0b26.total_amount?.toLocaleString()}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">정산</Text>
      </View>

      {}
      <View className="flex-row mx-4 mb-3 gap-2">
        {v_dcdbc4.map((v_e2a85c) => (
          <TouchableOpacity
            key={v_e2a85c.key}
            onPress={() => v_6fa4d3(v_e2a85c.key)}
            className={`flex-1 py-2 rounded-lg border ${
              v_783ad3 === v_e2a85c.key ? "bg-primary border-primary" : "bg-card border-border"
            }`}
          >
            <Text
              className={`text-center text-sm font-medium ${
                v_783ad3 === v_e2a85c.key ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              {v_e2a85c.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {}
      {v_9390e8 && !v_683210 && (
        <View className="mx-4 mb-3 bg-card rounded-xl border border-border p-4">
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-xs text-muted-foreground">총 건수</Text>
              <Text className="text-xl font-bold text-foreground mt-1">
                {v_9390e8.summary.total_count}건
              </Text>
            </View>
            <Separator orientation="vertical" />
            <View className="items-center flex-1">
              <Text className="text-xs text-muted-foreground">총 금액</Text>
              <Text className="text-xl font-bold text-primary mt-1">
                ₩{v_9390e8.summary.total_amount?.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      )}

      {v_683210 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={v_9390e8?.daily ?? []}
          keyExtractor={(v_8c0b26) => v_8c0b26.date}
          renderItem={v_fcf6ec}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">정산 내역이 없습니다.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
