import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_373248 } from "rkmroqyctko";
import { v_a43dd8, v_aa3f8f, v_c62079, v_19ca5b, v_5dcc4b, v_e4f0c5 } from "wjvlskvsbzsrojdbjsl";

export default function v_2e5340() {
  const { t: v_8d41d7 } = v_678659();

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
          title: v_8d41d7("merchant.tabs.qrScan"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <QrCode size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: v_8d41d7("merchant.tabs.history"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <ClipboardList size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: v_8d41d7("merchant.tabs.market"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <ShoppingBag size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="my-bundles"
        options={{
          title: v_8d41d7("merchant.tabs.myBundles"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <Package size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="settlement"
        options={{
          title: v_8d41d7("merchant.tabs.settlement"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <DollarSign size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: v_8d41d7("merchant.tabs.settings"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <Settings size={v_05b441} color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="settlement-policy" options={{ href: null }} />
      <Tabs.Screen name="language-settings" options={{ href: null }} />
      <Tabs.Screen name="process" options={{ href: null }} />
      <Tabs.Screen name="process-complete" options={{ href: null }} />
      <Tabs.Screen name="record-payment" options={{ href: null }} />
      <Tabs.Screen name="market-detail" options={{ href: null }} />
      <Tabs.Screen name="market-purchase" options={{ href: null }} />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
    </Tabs>
  );
}
