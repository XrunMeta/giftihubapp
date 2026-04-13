import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
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
import { v_429ab0, v_c62079 } from "wjvlskvsbzsrojdbjsl";
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
  pending: {
    labelKey: "merchant.bundles.reqStatusPending",
    pillClass: "border border-amber-500/35 bg-amber-500/12",
    labelClass: "text-amber-800",
  },
  approved: {
    labelKey: "merchant.bundles.reqStatusApproved",
    pillClass: "border border-emerald-500/35 bg-emerald-500/12",
    labelClass: "text-emerald-800",
  },
  rejected: {
    labelKey: "merchant.bundles.reqStatusRejected",
    pillClass: "border border-red-500/35 bg-red-500/12",
    labelClass: "text-red-800",
  },
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

function v_62116f(v_479f05): string[] {
  return v_479f05
    .split(/[,，/|]\s*|\n+/)
    .map((v_fd5f43) => v_fd5f43.trim())
    .filter(Boolean);
}

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
      const v_138072 = v_8d41d7("merchant.bundles.bundleBadge").replace(/\{\{count\}\}/g, String(v_148ff6.voucher_count));
      const v_ab55ae = v_148ff6.statuses?.trim() ?? "";
      const v_e5ac9e = v_ab55ae ? v_62116f(v_148ff6.statuses) : [];
      const v_b99f97 = v_ab55ae ? (v_e5ac9e.length > 0 ? v_e5ac9e : [v_ab55ae]) : [];
      return (
        <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <View className="flex-row items-center gap-3 border-b border-border bg-primary/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white">
              <Package size={20} color="#CE3630" strokeWidth={2} />
            </View>
            <Text className="min-w-0 flex-1 text-sm font-bold text-primary" numberOfLines={2}>
              {v_138072}
            </Text>
          </View>

          <View className="p-4">
            <Text className="text-lg font-bold leading-snug text-foreground" numberOfLines={2}>
              {v_148ff6.set_name}
            </Text>
            {v_148ff6.set_description ? (
              <Text className="mt-1.5 text-xs leading-5 text-muted-foreground" numberOfLines={2}>
                {v_148ff6.set_description}
              </Text>
            ) : null}
            {v_b99f97.length > 0 ? (
              <View className="mt-2 flex-row flex-wrap items-center gap-x-2 gap-y-1.5">
                <Text className="shrink-0 text-sm font-medium text-muted-foreground">
                  {v_8d41d7("merchant.bundles.statusPrefix")}
                </Text>
                {v_b99f97.map((v_910cfa, v_e86ad8) => (
                  <Badge key={`${v_910cfa}-${v_e86ad8}`} variant="outline" label={v_910cfa} />
                ))}
              </View>
            ) : null}

            <View className="flex-row items-center justify-between rounded-xl bg-muted/50  py-3">
              <Text className="text-md text-muted-foreground">{v_8d41d7("merchant.bundles.totalFace")}</Text>
              <Text className="text-lg font-bold text-primary">₩{v_148ff6.total_face_value.toLocaleString()}</Text>
            </View>

            <Button onPress={() => v_df5cad(v_148ff6)} className="mt-3 w-full">
              {v_8d41d7("merchant.bundles.requestBtn")}
            </Button>
          </View>
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
    const v_c4180e = v_fa219c ? v_8d41d7(v_fa219c.labelKey) : v_8c0b26.status;
    const v_11e3c6 = v_fa219c?.pillClass ?? "border border-border bg-muted";
    const v_19452c = v_fa219c?.labelClass ?? "text-foreground";
    const v_8dffde = new Date(v_8c0b26.created_at * 1000);
    const v_f8e6b9 = `${v_8dffde.getMonth() + 1}.${String(v_8dffde.getDate()).padStart(2, "0")} ${v_8dffde.getHours().toString().padStart(2, "0")}:${v_8dffde.getMinutes().toString().padStart(2, "0")}`;

    return (
      <View className="mx-4 mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <View className="flex-row items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <View className="flex-row items-center gap-2">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
              <Calendar size={16} color="#737373" />
            </View>
            <View>
              <Text className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {v_8d41d7("merchant.bundles.requestedAt")}
              </Text>
              <Text className="text-sm font-semibold text-foreground">{v_f8e6b9}</Text>
            </View>
          </View>
          <View className={`rounded-full px-2.5 py-1 ${v_11e3c6}`}>
            <Text className={`text-xs font-semibold ${v_19452c}`}>{v_c4180e}</Text>
          </View>
        </View>

        <View className="p-4 pt-3">
          <View className="flex-row gap-2 rounded-xl bg-muted/50 p-3">
            <View className="min-w-0 flex-1">
              <Text className="text-[11px] text-muted-foreground" numberOfLines={1}>
                {v_8d41d7("merchant.bundles.purchasePrice")}
              </Text>
              <Text className="mt-0.5 text-sm font-semibold text-foreground" numberOfLines={1}>
                ₩{v_8c0b26.purchase_price.toLocaleString()}
              </Text>
            </View>
            <View className="w-px self-stretch bg-border" />
            <View className="min-w-0 flex-1 items-center">
              <Text className="text-[11px] text-muted-foreground" numberOfLines={1}>
                {v_8d41d7("merchant.bundles.fee")}
              </Text>
              <Text className="mt-0.5 text-sm font-semibold text-red-600" numberOfLines={1}>
                −₩{v_8c0b26.fee_amount.toLocaleString()}
              </Text>
            </View>
            <View className="w-px self-stretch bg-border" />
            <View className="min-w-0 flex-1 border-l-2 border-primary/35 pl-2">
              <Text className="text-[11px] text-muted-foreground" numberOfLines={1}>
                {v_8d41d7("merchant.bundles.payout")}
              </Text>
              <Text className="mt-0.5 text-base font-bold text-primary" numberOfLines={1}>
                ₩{v_8c0b26.net_amount.toLocaleString()}
              </Text>
            </View>
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
                  className={`text-center font-medium ${v_11083e === v_4abce2 ? "text-primary-foreground" : "text-foreground"
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
