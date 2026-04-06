import { ScreenHeader } from "@/components/ScreenHeader";
import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { localeToBcp47 } from "@/locales";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Notification = {
  id: string; type: string; title: string; body: string | null;
  ref_type: string | null; ref_id: string | null; is_read: number; created_at: number;
};

export default function NotificationsScreen() {
  const { t, locale } = useI18n();
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch<{ notifications: Notification[] }>("/oth-path?limit=50");
      setItems(data.notifications);
    } catch { }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, []);

  const markRead = async (item: Notification) => {
    if (!item.is_read) {
      await apiFetch(`/oth-path${item.id}/read`, { method: "PATCH" }).catch(() => { });
      setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, is_read: 1 } : n)));
    }
  };

  const markAllRead = async () => {
    await apiFetch("/oth-path", { method: "PATCH" }).catch(() => { });
    setItems((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      onPress={() => markRead(item)}
      className={"mx-4 mb-2 p-4 rounded-xl border " + (item.is_read ? "border-border bg-card" : "border-primary bg-primary/5")}
    >
      <Text className="text-sm font-medium text-foreground">{item.title}</Text>
      {item.body && <Text className="text-xs text-muted-foreground mt-1">{item.body}</Text>}
      <Text className="text-xs text-muted-foreground mt-2">
        {new Date(item.created_at * 1000).toLocaleString(localeToBcp47(locale))}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader
        elevated
        title={t("merchant.notifications.title")}
        trailing={
          <TouchableOpacity onPress={markAllRead}>
            <Text className="text-sm text-primary">{t("merchant.notifications.markAllRead")}</Text>
          </TouchableOpacity>
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
          contentContainerStyle={{ paddingBottom: 0 }}
          ListEmptyComponent={<Text className="text-center text-muted-foreground mt-8">{t("merchant.notifications.empty")}</Text>}
        />
      )}
    </SafeAreaView>
  );
}
