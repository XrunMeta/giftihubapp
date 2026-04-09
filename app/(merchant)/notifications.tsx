import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import type { v_fe10f7 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_58169c } from "ozkdkvoil";
import { v_d1d90c } from "rkmroqyctko";
import { v_9c1ec8, v_c62079, v_dc4a73 } from "wjvlskvsbzsrojdbjsl";
import type { v_e16cd8 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_c4deb2, v_5ab095 } from "bapkr";
import { v_39a996, v_9cabcb, v_09d0e5, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  ref_type: string | null;
  ref_id: string | null;
  is_read: number;
  created_at: number;
};

type Visual = {
  circle: string;
  color: string;
  Icon: v_e16cd8;
};

type NotificationTone = "approve" | "arrival" | "reject";

const v_d50e2a = {
  approve: { circle: "#DCFCE7", color: "#16A34A", Icon: v_9c1ec8 },
  arrival: { circle: "#DBEAFE", color: "#2563EB", Icon: v_c62079 },
  reject: { circle: "#FEE2E2", color: "#DC2626", Icon: v_dc4a73 },
};

function v_9bc9e4(v_835fd5, v_10d904): boolean {
  return v_10d904.some((v_d95200) => v_d95200.test(v_835fd5));
}

function v_a43e75(v_8c0b26): NotificationTone {
  const v_5c189c = (v_8c0b26.type || "").toLowerCase();
  const v_3263c7 = `${v_8c0b26.type || ""} ${v_8c0b26.title || ""} ${v_8c0b26.body || ""}`.toLowerCase();

  const v_2e3106 = [
    /reject/,
    /rejected/,
    /denied/,
    /denial/,
    /declined/,
    /거절/,
    /반려/,
    /拒绝/,
    /驳回/,
    /ditolak/,
    / ditolak/,
    /却下/,
    /_rejected$/,
    /cancel_request_rejected/,
  ];
  const v_22ee85 = [
    /approve/,
    /approved/,
    /accepted/,
    /승인/,
    /承認/,
    /disetujui/,
    /_approved$/,
    /cancel_request_approved/,
  ];
  const v_77e266 = [
    /arrival/,
    /arrived/,
    /deliver/,
    /delivery/,
    /shipped/,
    /도착/,
    /입고/,
    /배송/,
    /到着/,
    /到达/,
    /配達/,
    /datang/,
    /tiba/,
    /new_order/,
    /order_placed/,
  ];

  if (v_9bc9e4(v_5c189c, v_2e3106) || v_9bc9e4(v_3263c7, v_2e3106)) {
    return "reject";
  }
  if (v_9bc9e4(v_5c189c, v_22ee85) || v_9bc9e4(v_3263c7, v_22ee85)) {
    return "approve";
  }
  if (v_9bc9e4(v_5c189c, v_77e266) || v_9bc9e4(v_3263c7, v_77e266)) {
    return "arrival";
  }

  return "arrival";
}

function v_70acda(v_8c0b26): Visual {
  return v_d50e2a[v_a43e75(v_8c0b26)];
}

function v_601cb9(v_5ba04a, locale: v_fe10f7): string {
  const v_5254bf = v_58169c(v_6f298b);
  const v_5c2f9f = Date.now();
  const v_352e36 = Math.floor((v_5c2f9f - v_5ba04a * 1000) / 1000);
  if (v_352e36 < 0) {
    return new Date(v_5ba04a * 1000).toLocaleString(v_5254bf);
  }
  try {
    const v_50d6c9 = new Intl.RelativeTimeFormat(v_5254bf, { numeric: "auto" });
    if (v_352e36 < 60) return v_50d6c9.format(-v_352e36, "second");
    const v_5e4882 = Math.floor(v_352e36 / 60);
    if (v_5e4882 < 60) return v_50d6c9.format(-v_5e4882, "minute");
    const v_009c9b = Math.floor(v_5e4882 / 60);
    if (v_009c9b < 24) return v_50d6c9.format(-v_009c9b, "hour");
    const v_cdfb6b = Math.floor(v_009c9b / 24);
    if (v_cdfb6b < 30) return v_50d6c9.format(-v_cdfb6b, "day");
    const v_1d3f30 = Math.floor(v_cdfb6b / 30);
    if (v_1d3f30 < 12) return v_50d6c9.format(-v_1d3f30, "month");
    const v_186baa = Math.floor(v_cdfb6b / 365);
    return v_50d6c9.format(-v_186baa, "year");
  } catch {
    return new Date(v_5ba04a * 1000).toLocaleString(v_5254bf);
  }
}

export default function v_18ad36() {
  const { t: v_8d41d7, locale: v_6f298b } = v_678659();
  const v_904d46 = v_d1d90c();
  const [v_4622b9, v_fa923c] = v_5ab095<Notification[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);

  const v_f6f5de = v_de06a3(async () => {
    v_34a50a(true);
    try {
      const v_9390e8 = await v_bc1b24<{ notifications: Notification[] }>("/oth-path?limit=50");
      v_fa923c(v_9390e8.notifications);
    } catch {}
    v_34a50a(false);
  }, []);

  v_c4deb2(() => {
    v_f6f5de();
  }, [v_f6f5de]);

  const v_8c796a = v_de06a3(async (v_8c0b26) => {
    if (!v_8c0b26.is_read) {
      await v_bc1b24(`/oth-path${v_8c0b26.id}/read`, { method: "PATCH" }).catch(() => {});
      v_fa923c((v_ba2215) => v_ba2215.map((v_f4e98d) => (v_f4e98d.id === v_8c0b26.id ? { ...v_f4e98d, is_read: 1 } : v_f4e98d)));
    }
  }, []);

  const v_b7d6d1 = v_de06a3(async () => {
    await v_bc1b24("/oth-path", { method: "PATCH" }).catch(() => {});
    v_fa923c((v_ba2215) => v_ba2215.map((v_f4e98d) => ({ ...v_f4e98d, is_read: 1 })));
  }, []);

  const v_fcf6ec = v_de06a3(
    ({ item: v_8c0b26 }: { item: Notification }) => {
      const v_a78249 = !v_8c0b26.is_read;
      const v_23604c = v_70acda(v_8c0b26);
      const { Icon: v_6bce96, circle: v_0ef4ab, color: v_3c2a3a } = v_23604c;
      const v_9d672f = v_601cb9(v_8c0b26.created_at, v_6f298b);

      return (
        <Pressable
          onPress={() => v_8c796a(v_8c0b26)}
          className="mx-4 mb-3 rounded-2xl border border-[#E0E0E0] overflow-hidden active:opacity-90"
        >
          <View className={`relative flex-row p-5 ${v_a78249 ? "bg-[#F0F4FF]" : "bg-white"}`}>
            {v_a78249 ? (
              <View
                className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#2563EB]"
                importantForAccessibility="no"
              />
            ) : null}
            <View
              className="h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: v_0ef4ab }}
            >
              <Icon size={22} color={v_3c2a3a} strokeWidth={2} />
            </View>
            <View className="ml-4 flex-1 pr-5">
              <Text className="text-base font-bold text-[#0a0a0a]" numberOfLines={2}>
                {v_8c0b26.title}
              </Text>
              {v_8c0b26.body ? (
                <Text className="mt-1 text-sm leading-5 text-[#525252]" numberOfLines={3}>
                  {v_8c0b26.body}
                </Text>
              ) : null}
              <Text className="mt-2 text-xs text-[#a3a3a3]">{v_9d672f}</Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [v_6f298b, v_8c796a],
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader
        title={v_8d41d7("merchant.notifications.title")}
        onBackPress={() => v_904d46.navigate("/(merchant)/settings")}
        rightAction={
          <Pressable onPress={v_b7d6d1} hitSlop={8}>
            <Text className="text-sm text-primary">{v_8d41d7("merchant.notifications.markAllRead")}</Text>
          </Pressable>
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
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
          ListEmptyComponent={
            <Text className="mt-8 text-center text-muted-foreground">{v_8d41d7("merchant.notifications.empty")}</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
