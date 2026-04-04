import v_a3453e, { v_c4deb2, v_5ab095, v_de06a3 } from "bapkr";
import {
  v_3094a2,
  v_19b633,
  v_9cabcb,
  v_39a996,
  v_4623af,
  v_03e392,
  v_6c4f62,
  v_cf9c33,
} from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import { v_c62079 } from "wjvlskvsbzsrojdbjsl";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_7ef52a } from "splenmyqnym";
import {
  v_60b706,
  v_9607ec,
  v_54a47e,
  type v_920170,
  type v_12efea,
} from "uugztyivrmtvweuio";

type Tab = "items" | "requests";

const v_e53bff = {
  pending: { label: "대기", color: "text-yellow-600" },
  approved: { label: "승인", color: "text-green-600" },
  rejected: { label: "거절", color: "text-red-600" },
};

const v_afb38d = {
  active: { label: "사용가능", variant: "default" },
  used: { label: "사용완료", variant: "secondary" },
  expired: { label: "만료", variant: "destructive" },
  listed: { label: "판매중", variant: "secondary" },
};

type SingleItem = {
  voucher_id: string;
  brand: string;
  name: string;
  face_value: number;
  status: string;
  expiry_date: number;
  image_url: string | null;
  thumb_url: string | null;
  brand_logo: string | null;
  item_type: "single";
};

type ListItem = { type: "set"; data: v_920170 } | { type: "single"; data: SingleItem };

export default function v_8f53d1() {
  const [v_11083e, v_94ee83] = v_5ab095<Tab>("items");
  const [v_4bc205, v_d56994] = v_5ab095<v_920170[]>([]);
  const [v_d6adfa, v_746885] = v_5ab095<SingleItem[]>([]);
  const [v_b77158, v_30e24c] = v_5ab095<v_12efea[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_612e9f, v_575aad] = v_5ab095(false);

  const v_4fa913 = v_de06a3(async () => {
    try {
      if (v_11083e === "items") {
        const v_8f00b9 = await v_60b706();
        v_d56994(v_8f00b9.bundles ?? []);
        v_746885((v_8f00b9 as any).singles ?? []);
      } else {
        const v_8f00b9 = await v_54a47e();
        v_30e24c(v_8f00b9.requests ?? []);
      }
    } catch {

    } finally {
      v_34a50a(false);
      v_575aad(false);
    }
  }, [v_11083e]);

  v_c4deb2(() => {
    v_34a50a(true);
    v_4fa913();
  }, [v_4fa913]);

  const v_d5345f = () => {
    v_575aad(true);
    v_4fa913();
  };

  const v_df5cad = (bundle: v_920170) => {
    v_03e392.alert(
      "정산 요청",
      `${v_79521f.set_name}\n총 액면가: ₩${v_79521f.total_face_value.toLocaleString()}\n${v_79521f.voucher_count}개 바우처\n\n정산을 요청하시겠습니까?`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "요청",
          onPress: async () => {
            try {
              const v_8f00b9 = await v_9607ec(v_79521f.set_id);
              v_03e392.alert(
                "정산 요청 완료",
                `수수료: ₩${v_8f00b9.fee_amount.toLocaleString()} (${(v_8f00b9.fee_rate * 100).toFixed(1)}%)\n지급 예정: ₩${v_8f00b9.net_amount.toLocaleString()}`,
              );
              v_4fa913();
            } catch (v_9e86fd) {
              v_03e392.alert("요청 실패", v_9e86fd instanceof Error ? v_9e86fd.message : "오류가 발생했습니다");
            }
          },
        },
      ],
    );
  };

  const v_b87ff5 = [
    ...v_4bc205.map((v_148ff6): ListItem => ({ type: "set", data: v_148ff6 })),
    ...v_d6adfa.map((v_fd5f43): ListItem => ({ type: "single", data: v_fd5f43 })),
  ];

  const v_fcf6ec = ({ item: v_8c0b26 }: { item: ListItem }) => {
    if (v_8c0b26.type === "set") {
      const v_148ff6 = v_8c0b26.data;
      return (
        <View className="mx-4 mb-2 bg-card rounded-xl border border-primary/30 px-4 py-3">
          <View className="flex-row items-center mb-2">
            <View className="w-7 h-7 rounded-lg bg-primary/10 items-center justify-center mr-2">
              <Package size={14} color="#CE3630" />
            </View>
            <Text className="text-xs font-semibold text-primary">구성상품 ({v_148ff6.voucher_count}건)</Text>
          </View>
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-3">
              <Text className="text-sm font-semibold text-foreground">{v_148ff6.set_name}</Text>
              <Text className="text-xs text-muted-foreground mt-0.5">
                상태: {v_148ff6.statuses}
              </Text>
            </View>
            <Text className="text-base font-bold text-foreground">
              ₩{v_148ff6.total_face_value.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => v_df5cad(v_148ff6)}
            className="mt-2 bg-primary rounded-lg py-2"
          >
            <Text className="text-center text-sm font-semibold text-primary-foreground">정산 요청</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const v_fd5f43 = v_8c0b26.data;
    const v_51452d = v_afb38d[v_fd5f43.status] ?? v_afb38d.active;
    const v_74f4a3 = v_7ef52a(v_fd5f43.thumb_url, v_fd5f43.image_url, v_fd5f43.brand_logo);
    return (
      <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3 flex-row">
        {v_74f4a3 ? (
          <Image source={{ uri: v_74f4a3 }} className="w-12 h-12 rounded-lg" resizeMode="cover" />
        ) : (
          <View className="w-12 h-12 rounded-lg bg-muted items-center justify-center">
            <Text className="text-lg">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{v_fd5f43.brand}</Text>
              <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>{v_fd5f43.name}</Text>
            </View>
            <Badge variant={v_51452d.variant} label={v_51452d.label} />
          </View>
          <Text className="text-sm font-bold text-foreground mt-1">
            ₩{v_fd5f43.face_value.toLocaleString()}
          </Text>
        </View>
      </View>
    );
  };

  const v_9c30ea = ({ item: v_8c0b26 }: { item: v_12efea }) => {
    const v_d308b5 = v_e53bff[v_8c0b26.status] ?? { label: v_8c0b26.status, color: "text-foreground" };
    const v_8dffde = new Date(v_8c0b26.created_at * 1000);
    const v_f8e6b9 = `${v_8dffde.getMonth() + 1}.${v_8dffde.getDate()} ${v_8dffde.getHours().toString().padStart(2, "0")}:${v_8dffde.getMinutes().toString().padStart(2, "0")}`;

    return (
      <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xs text-muted-foreground">{v_f8e6b9}</Text>
          <Text className={`text-xs font-semibold ${v_d308b5.color}`}>{v_d308b5.label}</Text>
        </View>
        <Separator className="mb-2" />
        <View className="flex-row justify-between">
          <View>
            <Text className="text-xs text-muted-foreground">구매가</Text>
            <Text className="text-sm font-medium text-foreground">
              ₩{v_8c0b26.purchase_price.toLocaleString()}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-muted-foreground">수수료</Text>
            <Text className="text-sm font-medium text-red-500">
              -₩{v_8c0b26.fee_amount.toLocaleString()}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-muted-foreground">지급액</Text>
            <Text className="text-sm font-bold text-primary">
              ₩{v_8c0b26.net_amount.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-4 py-3">
        <Text className="text-2xl font-bold text-foreground">보유상품</Text>
      </View>

      <View className="flex-row mx-4 mb-3 gap-2">
        {(["items", "requests"] as Tab[]).map((v_8d41d7) => (
          <TouchableOpacity
            key={v_8d41d7}
            onPress={() => v_94ee83(v_8d41d7)}
            className={`flex-1 py-2 rounded-lg border ${
              v_11083e === v_8d41d7 ? "bg-primary border-primary" : "bg-card border-border"
            }`}
          >
            <Text
              className={`text-center text-sm font-medium ${
                v_11083e === v_8d41d7 ? "text-primary-foreground" : "text-foreground"
              }`}
            >
              {v_8d41d7 === "items" ? "보유상품" : "정산 요청"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {v_683210 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : v_11083e === "items" ? (
        <FlatList
          data={v_b87ff5}
          keyExtractor={(v_8c0b26) =>
            v_8c0b26.type === "set" ? `set-${v_8c0b26.data.set_id}` : `v-${v_8c0b26.data.voucher_id}`
          }
          renderItem={v_fcf6ec}
          refreshControl={<RefreshControl refreshing={v_612e9f} onRefresh={v_d5345f} />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">보유 중인 상품이 없습니다.</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={v_b77158}
          keyExtractor={(v_8c0b26) => v_8c0b26.id}
          renderItem={v_9c30ea}
          refreshControl={<RefreshControl refreshing={v_612e9f} onRefresh={v_d5345f} />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">정산 요청 내역이 없습니다.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
