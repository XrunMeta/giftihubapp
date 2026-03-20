import { Tabs } from "expo-router";
import { QrCode, FileText, DollarSign, Settings } from "lucide-react-native";

export default function MerchantLayout() {
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
          tabBarIcon: ({ color, size }) => <QrCode size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "이력",
          tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settlement"
        options={{
          title: "정산",
          tabBarIcon: ({ color, size }) => <DollarSign size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
      <Tabs.Screen name="process" options={{ href: null }} />
      <Tabs.Screen name="process-complete" options={{ href: null }} />
      <Tabs.Screen name="record-payment" options={{ href: null }} />
    </Tabs>
  );
}
