import v_a3453e, { v_c4deb2, v_5ab095, v_de06a3 } from "bapkr";
import { v_3094a2, v_19b633, v_9cabcb, v_39a996 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_db3cc6 } from "dyunzbus";

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

const v_b69110 = 20;

export default function v_ca8e36() {
  const [v_4622b9, v_fa923c] = v_5ab095<HistoryItem[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_612e9f, v_575aad] = v_5ab095(false);
  const [v_2365e9, v_bf9d67] = v_5ab095(1);
  const [v_6bbe19, v_1454f0] = v_5ab095(true);

  const v_337eb3 = v_de06a3(async (v_e2a85c, v_487a25 = false) => {
    try {
      const v_8f00b9 = await v_bc1b24<HistoryResponse>(`/oth-path?page=${v_e2a85c}&limit=${v_b69110}`);
      const v_b93b94 = v_8f00b9.history;
      v_fa923c((v_ba2215) => v_487a25 ? v_b93b94 : [...v_ba2215, ...v_b93b94]);
      v_1454f0(v_b93b94.length === v_b69110);
      v_bf9d67(v_e2a85c);
    } catch {

    } finally {
      v_34a50a(false);
      v_575aad(false);
    }
  }, []);

  v_c4deb2(() => {
    v_337eb3(1, true);
  }, []);

  const v_f616ba = () => {
    v_575aad(true);
    v_337eb3(1, true);
  };

  const v_98107c = () => {
    if (!v_683210 && v_6bbe19) {
      v_337eb3(v_2365e9 + 1);
    }
  };

  const v_fcf6ec = ({ item: v_8c0b26 }: { item: HistoryItem }) => (
    <View className="mx-4 mb-2 bg-card rounded-xl border border-border p-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-xs text-muted-foreground">{v_8c0b26.brand ?? "-"}</Text>
          <Text className="text-base font-semibold text-foreground">{v_8c0b26.name ?? "알 수 없음"}</Text>
          {v_8c0b26.user_name && (
            <Text className="text-xs text-muted-foreground mt-0.5">사용자: {v_8c0b26.user_name}</Text>
          )}
        </View>
        <View className="items-end">
          <Text className="text-base font-bold text-primary">₩{v_8c0b26.amount?.toLocaleString()}</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            {v_db3cc6(new Date(v_8c0b26.created_at * 1000), "MM.dd HH:mm")}
          </Text>
        </View>
      </View>
    </View>
  );

  if (v_683210) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">사용 이력</Text>
      </View>
      <FlatList
        data={v_4622b9}
        keyExtractor={(v_8c0b26) => v_8c0b26.id}
        renderItem={v_fcf6ec}
        onEndReached={v_98107c}
        onEndReachedThreshold={0.3}
        onRefresh={v_f616ba}
        refreshing={v_612e9f}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-muted-foreground">사용 이력이 없습니다.</Text>
          </View>
        }
        ListFooterComponent={
          v_6bbe19 && v_4622b9.length > 0 ? (
            <ActivityIndicator size="small" color="#CE3630" style={{ padding: 16 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
