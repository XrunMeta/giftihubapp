import { ScreenHeader } from "@/components/ScreenHeader";
import { apiFetch } from "@/services/api";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Notification = {
  id: string; type: string; title: string; body: string | null;
  ref_type: string | null; ref_id: string | null; is_read: number; created_at: number;
};

export default function NotificationsScreen() {
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
        {new Date(item.created_at * 1000).toLocaleString("ko")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScreenHeader
        elevated
        title="알림"
        trailing={
          <TouchableOpacity onPress={markAllRead}>
            <Text className="text-sm text-primary">모두 읽음</Text>
          </TouchableOpacity>
        }
      />
      {loading ? (
        <ActivityIndicator className="mt-8" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text className="text-center text-muted-foreground mt-8">알림이 없습니다</Text>}
        />
      )}
    </SafeAreaView>
  );
}
