import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_be1e41 } from "hfombjcvpanldq";
import { v_7ef52a } from "splenmyqnym";
import {
  v_54a47e,
  v_60b706,
  v_9607ec,
  type v_12efea,
  type v_920170,
} from "uugztyivrmtvweuio";
import { v_c62079 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_c4deb2, v_5ab095 } from "bapkr";
import {
  v_39a996,
  v_9cabcb,
  v_cf9c33,
  v_6c4f62,
  v_19b633,
  v_4623af,
  v_3094a2,
} from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
type Tab = "items" | "requests";

const v_2f8e17 = {
  pending: { labelKey: "merchant.bundles.reqStatusPending", color: "text-yellow-600" },
  approved: { labelKey: "merchant.bundles.reqStatusApproved", color: "text-green-600" },
  rejected: { labelKey: "merchant.bundles.reqStatusRejected", color: "text-red-600" },
};

const v_ebe3bd = {
  active: { labelKey: "merchant.bundles.voucherActive", variant: "default" },
  used: { labelKey: "merchant.bundles.voucherUsed", variant: "secondary" },
  expired: { labelKey: "merchant.bundles.voucherExpired", variant: "destructive" },
  listed: { labelKey: "merchant.bundles.voucherListed", variant: "secondary" },
};

type SingleItem = {
  voucher_id: string;
  brand: string;
  name: string;
  face_value: number;
  base_currency?: string;
  status: string;
  expiry_date: number;
  image_url: string | null;
  thumb_url: string | null;
  brand_logo: string | null;
  item_type: "single";
};

type ListItem = { type: "set"; data: v_920170 } | { type: "single"; data: SingleItem };

export default function v_8f53d1() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
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
    v_5c50c0(
      v_8d41d7("merchant.bundles.settlementTitle"),
      `${v_79521f.set_name}\n${v_8d41d7("merchant.bundles.totalFace")}: ${v_be1e41(v_79521f.total_face_value, v_79521f.currency)}\n${v_79521f.voucher_count}${v_8d41d7("merchant.bundles.voucherUnit")}\n\n${v_8d41d7("merchant.bundles.askSettlement")}`,
      [
        { text: v_8d41d7("merchant.bundles.cancel"), style: "cancel" },
        {
          text: v_8d41d7("merchant.bundles.request"),
          onPress: async () => {
            try {
              const v_8f00b9 = await v_9607ec(v_79521f.set_id);
              v_5c50c0(
                v_8d41d7("merchant.bundles.requestDoneTitle"),
                `${v_8d41d7("merchant.bundles.feeLine")}: ${v_be1e41(v_8f00b9.fee_amount)} (${(v_8f00b9.fee_rate * 100).toFixed(1)}%)\n${v_8d41d7("merchant.bundles.netLine")}: ${v_be1e41(v_8f00b9.net_amount)}`,
              );
              v_4fa913();
            } catch (v_9e86fd) {
              v_5c50c0(v_8d41d7("merchant.bundles.requestFailTitle"), v_9e86fd instanceof Error ? v_9e86fd.message : v_8d41d7("merchant.bundles.requestFailBody"));
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
            <Text className="text-xs font-semibold text-primary">
              {v_8d41d7("merchant.bundles.bundleBadge").replace(/\{\{count\}\}/g, String(v_148ff6.voucher_count))}
            </Text>
          </View>
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-3">
              <Text className="text-sm font-semibold text-foreground">{v_148ff6.set_name}</Text>
              <Text className="text-xs text-muted-foreground mt-0.5">
                {v_8d41d7("merchant.bundles.statusPrefix")} {v_148ff6.statuses}
              </Text>
            </View>
            <Text className="text-base font-bold text-foreground">
              {v_be1e41(v_148ff6.total_face_value, v_148ff6.currency)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => v_df5cad(v_148ff6)}
            className="mt-2 bg-primary rounded-lg py-2"
          >
            <Text className="text-center text-sm font-semibold text-primary-foreground">{v_8d41d7("merchant.bundles.requestBtn")}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const v_fd5f43 = v_8c0b26.data;
    const v_ab4c96 = v_ebe3bd[v_fd5f43.status] ?? v_ebe3bd.active;
    const v_51452d = { label: v_8d41d7(v_ab4c96.labelKey), variant: v_ab4c96.variant };
    const v_74f4a3 = v_7ef52a(v_fd5f43.thumb_url, v_fd5f43.image_url, v_fd5f43.brand_logo);
    return (
      <View className="mx-4 mb-2 bg-card rounded-xl border border-border px-4 py-3 flex-row">
        {v_74f4a3 ? (
          <Image source={{ uri: v_74f4a3 }} className="w-12 h-12 rounded-lg" resizeMode="contain" />
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
            {v_be1e41(v_fd5f43.face_value, v_fd5f43.base_currency)}
          </Text>
        </View>
      </View>
    );
  };

  const v_9c30ea = ({ item: v_8c0b26 }: { item: v_12efea }) => {
    const v_fa219c = v_2f8e17[v_8c0b26.status];
    const v_d308b5 = v_fa219c
      ? { label: v_8d41d7(v_fa219c.labelKey), color: v_fa219c.color }
      : { label: v_8c0b26.status, color: "text-foreground" };
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
            <Text className="text-xs text-muted-foreground">{v_8d41d7("merchant.bundles.purchasePrice")}</Text>
            <Text className="text-sm font-medium text-foreground">
              {v_be1e41(v_8c0b26.purchase_price)}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-muted-foreground">{v_8d41d7("merchant.bundles.fee")}</Text>
            <Text className="text-sm font-medium text-red-500">
              -{v_be1e41(v_8c0b26.fee_amount)}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-muted-foreground">{v_8d41d7("merchant.bundles.payout")}</Text>
            <Text className="text-sm font-bold text-primary">
              {v_be1e41(v_8c0b26.net_amount)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader
        elevated
        title={v_8d41d7("merchant.bundles.title")}
        bottom={
          <View className="flex-row mx-4 mb-3 gap-2">
            {(["items", "requests"] as Tab[]).map((v_4abce2) => (
              <TouchableOpacity
                key={v_4abce2}
                onPress={() => v_94ee83(v_4abce2)}
                className={`flex-1 py-3 rounded-lg border ${v_11083e === v_4abce2 ? "bg-primary border-primary" : "bg-card border-border"
                  }`}
              >
                <Text
                  className={`text-center text-sm font-medium ${v_11083e === v_4abce2 ? "text-primary-foreground" : "text-foreground"
                    }`}
                >
                  {v_4abce2 === "items" ? v_8d41d7("merchant.bundles.tabItems") : v_8d41d7("merchant.bundles.tabRequests")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        }
      />

      {v_683210 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#CE3630" />
        </View>
      ) : v_11083e === "items" ? (
        <FlatList
          style={{ flex: 1 }}
          data={v_b87ff5}
          keyExtractor={(v_8c0b26) =>
            v_8c0b26.type === "set" ? `set-${v_8c0b26.data.set_id}` : `v-${v_8c0b26.data.voucher_id}`
          }
          renderItem={v_fcf6ec}
          refreshControl={<RefreshControl refreshing={v_612e9f} onRefresh={v_d5345f} />}
          contentContainerStyle={{ paddingBottom: 0 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">{v_8d41d7("merchant.bundles.emptyItems")}</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={v_b77158}
          keyExtractor={(v_8c0b26) => v_8c0b26.id}
          renderItem={v_9c30ea}
          refreshControl={<RefreshControl refreshing={v_612e9f} onRefresh={v_d5345f} />}
          contentContainerStyle={{ paddingBottom: 0 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-muted-foreground">{v_8d41d7("merchant.bundles.emptyRequests")}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
