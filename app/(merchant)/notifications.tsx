import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import v_a3453e, { v_de06a3, v_c4deb2, v_5ab095 } from "bapkr";
import { v_39a996, v_9cabcb, v_19b633, v_4623af } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

type Notification = {
  id: string; type: string; title: string; body: string | null;
  ref_type: string | null; ref_id: string | null; is_read: number; created_at: number;
};

export default function v_18ad36() {
  const [v_4622b9, v_fa923c] = v_5ab095<Notification[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);

  const v_f6f5de = v_de06a3(async () => {
    v_34a50a(true);
    try {
      const v_9390e8 = await v_bc1b24<{ notifications: Notification[] }>("/oth-path?limit=50");
      v_fa923c(v_9390e8.notifications);
    } catch { }
    v_34a50a(false);
  }, []);

  v_c4deb2(() => { v_f6f5de(); }, []);

  const v_8c796a = async (v_8c0b26) => {
    if (!v_8c0b26.is_read) {
      await v_bc1b24(`/oth-path${v_8c0b26.id}/read`, { method: "PATCH" }).catch(() => { });
      v_fa923c((v_ba2215) => v_ba2215.map((v_f4e98d) => (v_f4e98d.id === v_8c0b26.id ? { ...v_f4e98d, is_read: 1 } : v_f4e98d)));
    }
  };

  const v_b7d6d1 = async () => {
    await v_bc1b24("/oth-path", { method: "PATCH" }).catch(() => { });
    v_fa923c((v_ba2215) => v_ba2215.map((v_f4e98d) => ({ ...v_f4e98d, is_read: 1 })));
  };

  const v_fcf6ec = ({ item: v_8c0b26 }: { item: Notification }) => (
    <TouchableOpacity
      onPress={() => v_8c796a(v_8c0b26)}
      className={"mx-4 mb-2 p-4 rounded-xl border " + (v_8c0b26.is_read ? "border-border bg-card" : "border-primary bg-primary/5")}
    >
      <Text className="text-sm font-medium text-foreground">{v_8c0b26.title}</Text>
      {v_8c0b26.body && <Text className="text-xs text-muted-foreground mt-1">{v_8c0b26.body}</Text>}
      <Text className="text-xs text-muted-foreground mt-2">
        {new Date(v_8c0b26.created_at * 1000).toLocaleString("ko")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader
        elevated
        title="알림"
        trailing={
          <TouchableOpacity onPress={v_b7d6d1}>
            <Text className="text-sm text-primary">모두 읽음</Text>
          </TouchableOpacity>
        }
      />
      {v_683210 ? (
        <ActivityIndicator className="mt-8" />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={v_4622b9}
          keyExtractor={(v_ebec57) => v_ebec57.id}
          renderItem={v_fcf6ec}
          contentContainerStyle={{ paddingBottom: 0 }}
          ListEmptyComponent={<Text className="text-center text-muted-foreground mt-8">알림이 없습니다</Text>}
        />
      )}
    </SafeAreaView>
  );
}
