import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_6185b9, type v_dcbdc2 } from "hqklsidyfbumojabxoewf";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
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

const v_322c3f = [
  { key: "all", labelKey: "myGifti.list.tabAll" },
  { key: "active", labelKey: "myGifti.list.tabActive" },
  { key: "listed", labelKey: "myGifti.list.tabListed" },
  { key: "used", labelKey: "myGifti.list.tabUsed" },
  { key: "expired", labelKey: "myGifti.list.tabExpired" },
  { key: "transferred", labelKey: "myGifti.list.tabTransferred" },
];

const STATUS_BADGE_META: Record<string, { labelKey: string; variant: v_dcbdc2 }> = {
  active: { labelKey: "myGifti.list.statusActive", variant: "default" },
  listed: { labelKey: "myGifti.list.statusListed", variant: "info" },
  used: { labelKey: "myGifti.list.statusUsed", variant: "secondary" },
  expired: { labelKey: "myGifti.list.statusExpired", variant: "destructive" },
  transferred: { labelKey: "myGifti.list.statusTransferred", variant: "success" },
};

function v_953c3c(v_8d41d7, v_d308b5) {
  const v_35f85c = v_119921[v_d308b5] ?? v_119921.active;
  return { label: v_8d41d7(v_35f85c.labelKey), variant: v_35f85c.variant };
}

export default function v_bf7b5b() {
  const { t: v_8d41d7 } = v_678659();
  const v_904d46 = v_d1d90c();
  const v_c6c04c = v_df9f57(
    () => v_322c3f.map((v_3ac7e7) => ({ key: v_3ac7e7.key, label: v_8d41d7(v_3ac7e7.labelKey) })),
    [v_8d41d7],
  );
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
      v_67d36a(
        v_8d41d7("myGifti.list.debugSummary")
          .replace("{{vouchers}}", String(v_8f00b9.vouchers.length))
          .replace("{{sets}}", String(v_75ae3e.size))
          .replace("{{singles}}", String(v_8f00b9.vouchers.filter((v: v_7fb3de) => !v_81e2ef.set_id).length)),
      );
    } catch (v_49263d) {
      console.error("Failed to load vouchers:", v_49263d);
      if (v_49263d.status === 401) {
        v_3a7d09(v_8d41d7("myGifti.list.errUnauthorized"));
      } else {
        const v_3cfdfc = String(v_49263d.status ?? v_49263d.message ?? v_8d41d7("myGifti.list.networkError"));
        v_3a7d09(`${v_8d41d7("myGifti.list.errLoadPrefix")} ${v_8d41d7("myGifti.list.errLoadDetail").replace("{{detail}}", v_3cfdfc)}`);
      }
      v_67d36a(
        v_8d41d7("myGifti.list.debugErr")
          .replace("{{status}}", String(v_49263d.status ?? ""))
          .replace("{{msg}}", String(v_49263d.message ?? "")),
      );
    } finally {
      v_34a50a(false);
    }
  }, [v_ac1d22, v_8d41d7]);

  const v_04c01a = v_a3453e.useRef(v_cb3615);
  v_04c01a.current = v_cb3615;
  v_cf763b(
    v_de06a3(() => {
      v_04c01a.current();
    }, [v_ac1d22]),
  );

  type ListItem = { type: "single"; voucher: v_7fb3de } | { type: "bundle"; setId: string; vouchers: v_7fb3de[] };

  const v_4d79ca = v_df9f57<ListItem[]>(() => {
    const v_de9c6f = new Map<string, v_7fb3de[]>();
    for (const v_81e2ef of v_f9fd27) {
      if (v_81e2ef.set_id) {
        const v_d0c056 = v_de9c6f.get(v_81e2ef.set_id);
        if (v_d0c056) v_d0c056.push(v_81e2ef);
        else v_de9c6f.set(v_81e2ef.set_id, [v_81e2ef]);
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
    const v_26fb18 =
      v_666f24 === "mixed"
        ? { label: v_8d41d7("myGifti.list.statusMixed"), variant: "secondary" as const }
        : v_953c3c(v_8d41d7, v_666f24);

    const v_5b2d71 =
      v_7e0009 > 0 ? ` ${v_8d41d7("myGifti.list.restItems").replace("{{count}}", String(v_7e0009))}` : "";

    return (
      <Pressable
        className="mx-4 mb-3 bg-card rounded-xl border border-primary/30 p-3"
        onPress={() => v_904d46.push(`/(user)/oth-path${v_8c0b26.setId}`)}
      >
        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 rounded-lg bg-primary/10 items-center justify-center">
            <Package size={18} color="#CE3630" />
          </View>
          <Text className="text-sm font-semibold text-primary">
            {v_8d41d7("myGifti.list.bundleTitle").replace("{{count}}", String(v_8c0b26.vouchers.length))}
          </Text>
          <View className="flex-1" />
          <Badge variant={v_26fb18.variant} label={v_26fb18.label} />
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
              {v_5b2d71}
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-base font-bold text-foreground">{v_48b4c6(v_c83285, v_c3bc75)}</Text>
              <Text className="text-xs text-muted-foreground">
                {v_8d41d7("myGifti.list.expiryPrefix")} {v_db3cc6(new Date(v_ea719c.expiry_date * 1000), "yyyy.MM.dd")}
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-2 pt-2 border-t border-border">
          {v_8c0b26.vouchers.slice(0, 4).map((v_81e2ef) => (
            <View key={v_81e2ef.id} className="flex-row justify-between">
              <Text className="text-xs text-muted-foreground flex-1" numberOfLines={1}>
                {v_81e2ef.brand} · {v_81e2ef.name}
              </Text>
              <Text className="text-xs text-muted-foreground">{v_48b4c6(v_81e2ef.face_value_base || v_81e2ef.face_value, v_c3bc75)}</Text>
            </View>
          ))}
          {v_8c0b26.vouchers.length > 4 && (
            <Text className="text-xs text-muted-foreground text-center mt-1">
              {v_8d41d7("myGifti.list.bundleMore").replace("{{count}}", String(v_8c0b26.vouchers.length - 4))}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  const v_f8505d = ({ item: v_8c0b26 }: { item: v_7fb3de }) => {
    const v_51452d = v_953c3c(v_8d41d7, v_8c0b26.status);
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
              <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
                {v_8c0b26.name}
              </Text>
            </View>
            <Badge variant={v_51452d.variant} label={v_51452d.label} />
          </View>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-base font-bold text-foreground">
              {v_48b4c6(v_8c0b26.face_value_base || v_8c0b26.face_value, v_8c0b26.base_currency)}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {v_8d41d7("myGifti.list.expiryPrefix")} {v_db3cc6(new Date(v_8c0b26.expiry_date * 1000), "yyyy.MM.dd")}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader
        elevated
        title={v_8d41d7("myGifti.list.title")}
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
            {v_c6c04c.map((v_11083e) => {
              const v_26dce6 = v_11083e.key === v_ac1d22;
              return (
                <Pressable
                  key={v_11083e.key}
                  onPress={() => v_02dd63(v_11083e.key)}
                  style={{ alignSelf: "flex-start" }}
                  className={v_6e56f5("rounded-full px-4 py-2", v_26dce6 ? "bg-primary" : "bg-secondary")}
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
          v_8c0b26.type === "bundle" ? v_192662(v_8c0b26) : v_f8505d({ item: v_8c0b26.voucher })
        }
        keyExtractor={(v_8c0b26) => (v_8c0b26.type === "bundle" ? `set-${v_8c0b26.setId}` : v_8c0b26.voucher.id)}
        ListEmptyComponent={
          v_683210 ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#CE3630" />
            </View>
          ) : v_5e9bfe ? (
            <View className="items-center py-20 px-6">
              <Text className="text-destructive text-center">{v_5e9bfe}</Text>
              <Text className="text-xs text-muted-foreground mt-2" onPress={v_cb3615}>
                {v_8d41d7("myGifti.list.tapRetry")}
              </Text>
            </View>
          ) : (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">{v_8d41d7("myGifti.list.empty")}</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
