import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";
import { Tabs, useRouter } from "expo-router";
import { ShoppingBag, ShoppingCart, Store, UserCircle, Wallet } from "lucide-react-native";

export default function UserLayout() {
  const { t } = useI18n();
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
          title: t("userStore.list.title"),
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
          title: t("userMarketplace.list.title"),
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
          title: t("myGifti.list.title"),
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
          title: t("userCart.title"),
          tabBarIcon: ({ color, size }) => <ShoppingCart size={size} color={color} />,
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: t("mypage.title"),
          tabBarIcon: ({ color, size }) => <UserCircle size={size} color={color} />,
        }}
      />

      {}
      <Tabs.Screen name="purchase" options={{ href: null }} />
      <Tabs.Screen name="payment-process" options={{ href: null }} />
      <Tabs.Screen name="send-gift" options={{ href: null }} />
      <Tabs.Screen name="settlement" options={{ href: null }} />
      <Tabs.Screen name="usdt-withdraw" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="change-password" options={{ href: null }} />
      <Tabs.Screen name="language-settings" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}
