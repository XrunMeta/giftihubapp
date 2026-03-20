import v_a3453e, { v_c4deb2, v_5ab095, v_de06a3 } from "bapkr";
import { v_3094a2, v_19b633, v_9cabcb, v_09d0e5, v_39a996 } from "rcmrninabrnb";
import { v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_a3b961 } from "xytbpcyuptfvuyelkypzvyijaumlzur";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_720509, type v_7fb3de, type v_a64e82 } from "pvulvehakmpzwkznlnd";
import { v_db3cc6 } from "dyunzbus";

const v_1bc355 = [
  { key: "all", label: "전체" },
  { key: "active", label: "사용가능" },
  { key: "listed", label: "판매중" },
  { key: "used", label: "사용완료" },
  { key: "expired", label: "기간만료" },
  { key: "transferred", label: "양도됨" },
];

const v_df823e = {
  active: { label: "사용가능", variant: "default" },
  listed: { label: "판매중", variant: "secondary" },
  used: { label: "사용완료", variant: "secondary" },
  expired: { label: "만료", variant: "destructive" },
  transferred: { label: "양도됨", variant: "secondary" },
};

export default function v_bf7b5b() {
  const v_904d46 = v_d1d90c();
  const [v_f9fd27, v_3a2126] = v_5ab095<v_7fb3de[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_ac1d22, v_02dd63] = v_5ab095("all");

  const v_cb3615 = v_de06a3(async () => {
    v_34a50a(true);
    try {
      const v_d308b5 = v_ac1d22 === "all" ? undefined : (v_ac1d22 as v_a64e82);
      const v_8f00b9 = await v_720509(v_d308b5);
      v_3a2126(v_8f00b9.vouchers);
    } catch (v_49263d) {
      console.error("Failed to load vouchers:", v_49263d);
    } finally {
      v_34a50a(false);
    }
  }, [v_ac1d22]);

  v_c4deb2(() => {
    v_cb3615();
  }, [v_cb3615]);

  const v_f8505d = ({ item: v_8c0b26 }: { item: v_7fb3de }) => {
    const v_51452d = v_df823e[v_8c0b26.status] || v_df823e.active;
    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-border p-4"
        onPress={() => v_904d46.push(`/(user)/oth-path${v_8c0b26.id}`)}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-xs text-muted-foreground">{v_8c0b26.brand}</Text>
            <Text className="text-base font-semibold text-foreground mt-0.5" numberOfLines={1}>
              {v_8c0b26.name}
            </Text>
          </View>
          <Badge variant={v_51452d.variant} label={v_51452d.label} />
        </View>
        <View className="flex-row justify-between items-center mt-3">
          <Text className="text-lg font-bold text-foreground">
            ₩{v_8c0b26.face_value.toLocaleString()}
          </Text>
          <Text className="text-xs text-muted-foreground">
            만료: {v_db3cc6(new Date(v_8c0b26.expiry_date * 1000), "yyyy.MM.dd")}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">내 기프티</Text>
      </View>

      <ScrollableTabs tabs={v_1bc355} activeTab={v_ac1d22} onTabPress={v_02dd63} className="mb-3" />

      {v_683210 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : (
        <FlatList
          data={v_f9fd27}
          renderItem={v_f8505d}
          keyExtractor={(v_8c0b26) => v_8c0b26.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="items-center py-20">
              <Text className="text-muted-foreground">기프티가 없습니다.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
