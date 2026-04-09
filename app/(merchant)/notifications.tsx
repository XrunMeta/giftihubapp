import { PageHeader } from "@/components/PageHeader";
import { useI18n } from "@/context/I18nContext";
import type { Locale } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { localeToBcp47 } from "@/locales";
import { useRouter } from "expo-router";
import { CheckCircle2, Package, XCircle } from "lucide-react-native";
import type { LucideIcon } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  Icon: LucideIcon;
};

type NotificationTone = "approve" | "arrival" | "reject";

const VISUAL_BY_TONE: Record<NotificationTone, Visual> = {
  approve: { circle: "#DCFCE7", color: "#16A34A", Icon: CheckCircle2 },
  arrival: { circle: "#DBEAFE", color: "#2563EB", Icon: Package },
  reject: { circle: "#FEE2E2", color: "#DC2626", Icon: XCircle },
};

function matchesAny(haystack: string, patterns: RegExp[]): boolean {
  return patterns.some((re) => re.test(haystack));
}

function toneForNotification(item: Notification): NotificationTone {
  const typeLower = (item.type || "").toLowerCase();
  const blob = `${item.type || ""} ${item.title || ""} ${item.body || ""}`.toLowerCase();

  const rejectPatterns = [
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
  const approvePatterns = [
    /approve/,
    /approved/,
    /accepted/,
    /승인/,
    /承認/,
    /disetujui/,
    /_approved$/,
    /cancel_request_approved/,
  ];
  const arrivalPatterns = [
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

  if (matchesAny(typeLower, rejectPatterns) || matchesAny(blob, rejectPatterns)) {
    return "reject";
  }
  if (matchesAny(typeLower, approvePatterns) || matchesAny(blob, approvePatterns)) {
    return "approve";
  }
  if (matchesAny(typeLower, arrivalPatterns) || matchesAny(blob, arrivalPatterns)) {
    return "arrival";
  }

  return "arrival";
}

function visualForNotification(item: Notification): Visual {
  return VISUAL_BY_TONE[toneForNotification(item)];
}

function formatRelativeTime(createdAtSec: number, locale: Locale): string {
  const lang = localeToBcp47(locale);
  const now = Date.now();
  const diffSec = Math.floor((now - createdAtSec * 1000) / 1000);
  if (diffSec < 0) {
    return new Date(createdAtSec * 1000).toLocaleString(lang);
  }
  try {
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    if (diffSec < 60) return rtf.format(-diffSec, "second");
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return rtf.format(-diffMin, "minute");
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return rtf.format(-diffHour, "hour");
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 30) return rtf.format(-diffDay, "day");
    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12) return rtf.format(-diffMonth, "month");
    const diffYear = Math.floor(diffDay / 365);
    return rtf.format(-diffYear, "year");
  } catch {
    return new Date(createdAtSec * 1000).toLocaleString(lang);
  }
}

export default function NotificationsScreen() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<{ notifications: Notification[] }>("/oth-path?limit=50");
      setItems(data.notifications);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = useCallback(async (item: Notification) => {
    if (!item.is_read) {
      await apiFetch(`/oth-path${item.id}/read`, { method: "PATCH" }).catch(() => {});
      setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, is_read: 1 } : n)));
    }
  }, []);

  const markAllRead = useCallback(async () => {
    await apiFetch("/oth-path", { method: "PATCH" }).catch(() => {});
    setItems((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Notification }) => {
      const unread = !item.is_read;
      const visual = visualForNotification(item);
      const { Icon, circle, color } = visual;
      const timeLabel = formatRelativeTime(item.created_at, locale);

      return (
        <Pressable
          onPress={() => markRead(item)}
          className="mx-4 mb-3 rounded-2xl border border-[#E0E0E0] overflow-hidden active:opacity-90"
        >
          <View className={`relative flex-row p-5 ${unread ? "bg-[#F0F4FF]" : "bg-white"}`}>
            {unread ? (
              <View
                className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#2563EB]"
                importantForAccessibility="no"
              />
            ) : null}
            <View
              className="h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: circle }}
            >
              <Icon size={22} color={color} strokeWidth={2} />
            </View>
            <View className="ml-4 flex-1 pr-5">
              <Text className="text-base font-bold text-[#0a0a0a]" numberOfLines={2}>
                {item.title}
              </Text>
              {item.body ? (
                <Text className="mt-1 text-sm leading-5 text-[#525252]" numberOfLines={3}>
                  {item.body}
                </Text>
              ) : null}
              <Text className="mt-2 text-xs text-[#a3a3a3]">{timeLabel}</Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [locale, markRead],
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader
        title={t("merchant.notifications.title")}
        onBackPress={() => router.navigate("/(merchant)/settings")}
        rightAction={
          <Pressable onPress={markAllRead} hitSlop={8}>
            <Text className="text-sm text-primary">{t("merchant.notifications.markAllRead")}</Text>
          </Pressable>
        }
      />
      {loading ? (
        <ActivityIndicator className="mt-8" />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
          ListEmptyComponent={
            <Text className="mt-8 text-center text-muted-foreground">{t("merchant.notifications.empty")}</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
