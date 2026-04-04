import { Tabs, useRouter } from "expo-router";
import { Store, ShoppingBag, Wallet, ShoppingCart, UserCircle } from "lucide-react-native";
import { useCart } from "@/context/CartContext";

export default function UserLayout() {
  const router = useRouter();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

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
      {}
      <Tabs.Screen
        name="store"
        options={{
          title: "스토어",
          tabBarIcon: ({ color, size }) => <Store size={size} color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(user)/store");
          },
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: "중고마켓",
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(user)/oth-path");
          },
        }}
      />
      <Tabs.Screen
        name="my-gifti"
        options={{
          title: "내 기프티",
          tabBarIcon: ({ color, size }) => <Wallet size={size} color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(user)/oth-path");
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "장바구니",
          tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} />,
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: "MY",
          tabBarIcon: ({ color, size }) => <UserCircle size={size} color={color} />,
        }}
      />

      {}
      <Tabs.Screen name="purchase" options={{ href: null }} />
      <Tabs.Screen name="payment-process" options={{ href: null }} />
      <Tabs.Screen name="send-gift" options={{ href: null }} />
      <Tabs.Screen name="settlement" options={{ href: null }} />
      <Tabs.Screen name="usdt-withdraw" options={{ href: null }} />
    </Tabs>
  );
}
