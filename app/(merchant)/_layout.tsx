import { v_373248 } from "rkmroqyctko";
import { v_19ca5b, v_e4f0c5, v_c62079, v_aa3f8f, v_5dcc4b, v_0ae9ff } from "wjvlskvsbzsrojdbjsl";
import { v_c4deb2, v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633 } from "rcmrninabrnb";
import { v_bc1b24 } from "tlrvzsbmctdavs";

export default function v_2e5340() {
  const [v_8a6db3, v_5fedc2] = v_5ab095(0);

  v_c4deb2(() => {
    const v_5f78f0 = async () => {
      try {
        const v_9390e8 = await v_bc1b24<{ unread_count: number }>("/oth-path");
        v_5fedc2(v_9390e8.unread_count ?? 0);
      } catch {}
    };
    v_5f78f0();
    const v_ad1d65 = setInterval(v_5f78f0, 30000);
    return () => clearInterval(v_ad1d65);
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
          title: "QR 스캔",
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <QrCode size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: "중고마켓",
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <ShoppingBag size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="my-bundles"
        options={{
          title: "보유상품",
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <Package size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="settlement"
        options={{
          title: "정산",
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <DollarSign size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <Settings size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "알림",
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => (
            <View>
              <Bell size={v_05b441} color={v_3c2a3a} />
              {v_8a6db3 > 0 && (
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
                    {v_8a6db3 > 99 ? "99+" : v_8a6db3}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen name="history" options={{ href: null }} />
      <Tabs.Screen name="process" options={{ href: null }} />
      <Tabs.Screen name="process-complete" options={{ href: null }} />
      <Tabs.Screen name="record-payment" options={{ href: null }} />
      <Tabs.Screen name="market-detail" options={{ href: null }} />
      <Tabs.Screen name="market-purchase" options={{ href: null }} />
    </Tabs>
  );
}
