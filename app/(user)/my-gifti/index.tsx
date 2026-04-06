import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_6185b9, type v_dcbdc2 } from "hqklsidyfbumojabxoewf";
import { v_7ef52a } from "splenmyqnym";
import { v_6e56f5 } from "mbdlgxnaxny";
import { v_720509, type v_7fb3de, type v_a64e82 } from "pvulvehakmpzwkznlnd";
import { v_db3cc6 } from "dyunzbus";
import { v_cf763b, v_d1d90c } from "rkmroqyctko";
import { v_c62079 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_df9f57, v_5ab095 } from "bapkr";
import { v_39a996, v_9cabcb, v_cf9c33, v_09d0e5, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

const v_928ad6 = { KRW: "₩", USD: "$", IDR: "Rp" };
function v_48b4c6(v_f63e09, v_a832b3) {
  const v_c37780 = v_928ad6[v_a832b3 ?? "KRW"] ?? "₩";
  return `${v_c37780}${v_f63e09.toLocaleString()}`;
}

const v_1bc355 = [
  { key: "all", label: "전체" },
  { key: "active", label: "사용가능" },
  { key: "listed", label: "판매중" },
  { key: "used", label: "사용완료" },
  { key: "expired", label: "기간만료" },
  { key: "transferred", label: "양도됨" },
];

const STATUS_BADGE: Record<string, { label: string; variant: v_dcbdc2 }> = {
  active: { label: "사용가능", variant: "default" },
  listed: { label: "판매중", variant: "info" },
  used: { label: "사용완료", variant: "secondary" },
  expired: { label: "만료", variant: "destructive" },
  transferred: { label: "양도됨", variant: "success" },
};

export default function v_bf7b5b() {
  const v_904d46 = v_d1d90c();
  const [v_f9fd27, v_3a2126] = v_5ab095<v_7fb3de[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_ac1d22, v_02dd63] = v_5ab095("all");

  const [v_5e9bfe, v_3a7d09] = v_5ab095<string | null>(null);
  const [v_49c6c7, v_67d36a] = v_5ab095<string>("");

  const v_cb3615 = v_de06a3(async () => {
    v_34a50a(true);
    v_3a7d09(null);
    try {
      const v_d308b5 = v_ac1d22 === "all" ? undefined : (v_ac1d22 as v_a64e82);
      const v_8f00b9 = await v_720509(v_d308b5);
      v_3a2126(v_8f00b9.vouchers);

      const v_75ae3e = new Set(v_8f00b9.vouchers.filter((v: v_7fb3de) => v_81e2ef.set_id).map((v: v_7fb3de) => v_81e2ef.set_id));
      v_67d36a(`총 ${v_8f00b9.vouchers.length}건, 세트 ${v_75ae3e.size}개, 개별 ${v_8f00b9.vouchers.filter((v: v_7fb3de) => !v_81e2ef.set_id).length}건`);
    } catch (v_49263d) {
      console.error("Failed to load vouchers:", v_49263d);
      const v_badeaf = v_49263d.status === 401
        ? "로그인이 만료되었습니다. 다시 로그인해주세요."
        : `기프티 목록을 불러올 수 없습니다. (${v_49263d.status || v_49263d.message || "네트워크 오류"})`;
      v_3a7d09(v_badeaf);
      v_67d36a(`ERR: status=${v_49263d.status}, msg=${v_49263d.message}`);
    } finally {
      v_34a50a(false);
    }
  }, [v_ac1d22]);

  const v_04c01a = v_a3453e.useRef(v_cb3615);
  v_04c01a.current = v_cb3615;
  v_cf763b(
    v_de06a3(() => {
      v_04c01a.current();
    }, [v_ac1d22])
  );

  type ListItem = { type: "single"; voucher: v_7fb3de } | { type: "bundle"; setId: string; vouchers: v_7fb3de[] };

  const v_4d79ca = v_df9f57<ListItem[]>(() => {
    const v_de9c6f = new Map<string, v_7fb3de[]>();
    const singles: v_7fb3de[] = [];
    for (const v_81e2ef of v_f9fd27) {
      if (v_81e2ef.set_id) {
        const v_d0c056 = v_de9c6f.get(v_81e2ef.set_id);
        if (v_d0c056) v_d0c056.push(v_81e2ef);
        else v_de9c6f.set(v_81e2ef.set_id, [v_81e2ef]);
      } else {
        v_d6adfa.push(v_81e2ef);
      }
    }
    const v_43c42e = [];
    const v_110a8b = new Set<string>();
    for (const v_81e2ef of v_f9fd27) {
      if (v_81e2ef.set_id && !v_110a8b.has(v_81e2ef.set_id)) {
        v_110a8b.add(v_81e2ef.set_id);
        v_43c42e.push({ type: "bundle", setId: v_81e2ef.set_id, vouchers: v_de9c6f.get(v_81e2ef.set_id)! });
      } else if (!v_81e2ef.set_id) {
        v_43c42e.push({ type: "single", voucher: v_81e2ef });
      }
    }
    return v_43c42e;
  }, [v_f9fd27]);

  const v_192662 = (item: { setId: string; vouchers: v_7fb3de[] }) => {
    const v_ea719c = v_8c0b26.vouchers[0]!;
    const v_c3bc75 = v_ea719c.base_currency || "KRW";
    const v_c83285 = v_8c0b26.vouchers.reduce((v_fd5f43, v_81e2ef) => v_fd5f43 + (v_81e2ef.face_value_base || v_81e2ef.face_value), 0);
    const v_7e0009 = v_8c0b26.vouchers.length - 1;
    const v_74f4a3 = v_7ef52a(v_ea719c.thumb_url, v_ea719c.image_url, v_ea719c.brand_logo);

    const v_6460d1 = new Set(v_8c0b26.vouchers.map((v_81e2ef) => v_81e2ef.status));
    const v_666f24 = v_6460d1.size === 1 ? [...v_6460d1][0]! : "mixed";
    const v_26fb18 = v_666f24 === "mixed"
      ? { label: "혼합", variant: "secondary" as const }
      : v_df823e[v_666f24] ?? { label: v_666f24, variant: "secondary" as const };

    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-primary/30 p-3"
        onPress={() => v_904d46.push(`/(user)/oth-path${v_8c0b26.setId}`)}
      >
        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 rounded-lg bg-primary/10 items-center justify-center mr-2">
            <Package size={18} color="#CE3630" />
          </View>
          <Text className="text-sm font-semibold text-primary">구성 상품 ({v_8c0b26.vouchers.length}건)</Text>
          <View className="flex-1" />
          <Badge
            variant={v_26fb18.variant}
            label={v_26fb18.label}
          />
        </View>
        <View className="flex-row">
          {v_74f4a3 ? (
            <Image source={{ uri: v_74f4a3 }} className="w-14 h-14 rounded-lg" resizeMode="contain" />
          ) : (
            <View className="w-14 h-14 rounded-lg bg-muted items-center justify-center">
              <Text className="text-xl">🎁</Text>
            </View>
          )}
          <View className="flex-1 ml-3">
            <Text className="text-sm text-foreground font-medium" numberOfLines={1}>
              {v_ea719c.brand} · {v_ea719c.name}
              {v_7e0009 > 0 ? ` 외 ${v_7e0009}건` : ""}
            </Text>
            <View className="flex-row justify-between items-center mt-1.5">
              <Text className="text-base font-bold text-foreground">
                {v_48b4c6(v_c83285, v_c3bc75)}
              </Text>
              <Text className="text-xs text-muted-foreground">
                만료: {v_db3cc6(new Date(v_ea719c.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
          </View>
        </View>
        {}
        <View className="mt-2 pt-2 border-t border-border">
          {v_8c0b26.vouchers.slice(0, 4).map((v_81e2ef) => (
            <View key={v_81e2ef.id} className="flex-row justify-between py-0.5">
              <Text className="text-xs text-muted-foreground flex-1" numberOfLines={1}>
                {v_81e2ef.brand} · {v_81e2ef.name}
              </Text>
              <Text className="text-xs text-muted-foreground">{v_48b4c6(v_81e2ef.face_value_base || v_81e2ef.face_value, v_c3bc75)}</Text>
            </View>
          ))}
          {v_8c0b26.vouchers.length > 4 && (
            <Text className="text-xs text-muted-foreground text-center mt-1">
              +{v_8c0b26.vouchers.length - 4}건 더보기
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  const v_f8505d = ({ item: v_8c0b26 }: { item: v_7fb3de }) => {
    const v_51452d = v_df823e[v_8c0b26.status] || v_df823e.active;
    const v_74f4a3 = v_7ef52a(v_8c0b26.thumb_url, v_8c0b26.image_url, v_8c0b26.brand_logo);
    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-border p-3 flex-row"
        onPress={() => v_904d46.push(`/(user)/oth-path${v_8c0b26.id}`)}
      >
        {v_74f4a3 ? (
          <Image source={{ uri: v_74f4a3 }} className="w-16 h-16 rounded-lg" resizeMode="contain" />
        ) : (
          <View className="w-16 h-16 rounded-lg bg-muted items-center justify-center">
            <Text className="text-2xl">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{v_8c0b26.brand}</Text>
              <Text className="text-base font-semibold text-foreground mt-0.5" numberOfLines={1}>
                {v_8c0b26.name}
              </Text>
            </View>
            <Badge variant={v_51452d.variant} label={v_51452d.label} />
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-base font-bold text-foreground">
              {v_48b4c6(v_8c0b26.face_value_base || v_8c0b26.face_value, v_8c0b26.base_currency)}
            </Text>
            <Text className="text-xs text-muted-foreground">
              만료: {v_db3cc6(new Date(v_8c0b26.expiry_date * 1000), "yyyy.MM.dd")}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <ScreenHeader
        elevated
        title="내 기프티"
        subtitle={
          v_49c6c7 ? (
            <Text className="text-xs text-muted-foreground mt-1" selectable>
              {v_49c6c7}
            </Text>
          ) : undefined
        }
        bottom={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center", gap: 8, paddingHorizontal: 16 }}
            className="mb-3"
          >
            {v_1bc355.map((v_11083e) => {
              const v_26dce6 = v_11083e.key === v_ac1d22;
              return (
                <Pressable
                  key={v_11083e.key}
                  onPress={() => v_02dd63(v_11083e.key)}
                  style={{ alignSelf: "flex-start" }}
                  className={v_6e56f5(
                    "rounded-full px-4 py-2",
                    v_26dce6 ? "bg-primary" : "bg-secondary",
                  )}
                >
                  <Text
                    className={v_6e56f5(
                      "text-sm font-medium",
                      v_26dce6 ? "text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    {v_11083e.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        }
      />
      <FlatList
        style={{ flex: 1 }}
        data={v_683210 ? [] : v_4d79ca}
        renderItem={({ item: v_8c0b26 }) =>
          v_8c0b26.type === "bundle"
            ? v_192662(v_8c0b26)
            : v_f8505d({ item: v_8c0b26.voucher })
        }
        keyExtractor={(v_8c0b26) =>
          v_8c0b26.type === "bundle" ? `set-${v_8c0b26.setId}` : v_8c0b26.voucher.id
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          v_683210 ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : v_5e9bfe ? (
            <View className="items-center py-20 px-6">
              <Text className="text-destructive text-center">{v_5e9bfe}</Text>
              <Text className="text-xs text-muted-foreground mt-2" onPress={v_cb3615}>
                탭하여 다시 시도
              </Text>
            </View>
          ) : (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">기프티가 없습니다.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
