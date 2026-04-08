import { useI18n } from "@/context/I18nContext";
import { apiFetch } from "@/services/api";
import { Tabs } from "expo-router";
import { Bell, DollarSign, Package, QrCode, Settings, ShoppingBag } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function MerchantLayout() {
  const { t } = useI18n();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const data = await apiFetch<{ unread_count: number }>("/oth-path");
        setUnreadCount(data.unread_count ?? 0);
      } catch {}
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#CE3630",
        tabBarInactiveTintColor: "#737373",
        tabBarStyle: {
          borderTopColor: "#e5e5e5",
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("merchant.tabs.qrScan"),
          tabBarIcon: ({ color, size }) => <QrCode size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: t("merchant.tabs.market"),
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-bundles"
        options={{
          title: t("merchant.tabs.myBundles"),
          tabBarIcon: ({ color, size }) => <Package size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settlement"
        options={{
          title: t("merchant.tabs.settlement"),
          tabBarIcon: ({ color, size }) => <DollarSign size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("merchant.tabs.settings"),
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: t("merchant.tabs.notifications"),
          tabBarIcon: ({ color, size }) => (
            <View>
              <Bell size={size} color={color} />
              {unreadCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -6,
                    backgroundColor: "#ef4444",
                    borderRadius: 8,
                    minWidth: 16,
                    height: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 3,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}>
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen name="settlement-policy" options={{ href: null }} />
      <Tabs.Screen name="history" options={{ href: null }} />
      <Tabs.Screen name="process" options={{ href: null }} />
      <Tabs.Screen name="process-complete" options={{ href: null }} />
      <Tabs.Screen name="record-payment" options={{ href: null }} />
      <Tabs.Screen name="market-detail" options={{ href: null }} />
      <Tabs.Screen name="market-purchase" options={{ href: null }} />
    </Tabs>
  );
}
