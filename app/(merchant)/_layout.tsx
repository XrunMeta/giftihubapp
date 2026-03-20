import { v_373248 } from "rkmroqyctko";
import { v_19ca5b, v_32e130, v_aa3f8f, v_5dcc4b } from "wjvlskvsbzsrojdbjsl";

export default function v_2e5340() {
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
        name="history"
        options={{
          title: "이력",
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <FileText size={v_05b441} color={v_3c2a3a} />,
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
      <Tabs.Screen name="process" options={{ href: null }} />
      <Tabs.Screen name="process-complete" options={{ href: null }} />
      <Tabs.Screen name="record-payment" options={{ href: null }} />
    </Tabs>
  );
}
