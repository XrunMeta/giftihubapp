import { v_7a943b } from "dxfmfnfvriitbtghyppor";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_373248, v_d1d90c } from "rkmroqyctko";
import { v_e4f0c5, v_6b9090, v_51bb20, v_6e86e2, v_f235de } from "wjvlskvsbzsrojdbjsl";

export default function v_348e5f() {
  const { t: v_8d41d7 } = v_678659();
  const v_904d46 = v_d1d90c();
  const { getCartCount: v_63e412 } = v_7a943b();
  const v_826967 = v_63e412();

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
          title: v_8d41d7("userStore.list.title"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <Store size={v_05b441} color={v_3c2a3a} />,
        }}
        listeners={{
          tabPress: (v_9e86fd) => {
            v_9e86fd.preventDefault();
            v_904d46.replace("/(user)/store");
          },
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: v_8d41d7("userMarketplace.list.title"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <ShoppingBag size={v_05b441} color={v_3c2a3a} />,
        }}
        listeners={{
          tabPress: (v_9e86fd) => {
            v_9e86fd.preventDefault();
            v_904d46.replace("/(user)/oth-path");
          },
        }}
      />
      <Tabs.Screen
        name="my-gifti"
        options={{
          title: v_8d41d7("myGifti.list.title"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <Wallet size={v_05b441} color={v_3c2a3a} />,
        }}
        listeners={{
          tabPress: (v_9e86fd) => {
            v_9e86fd.preventDefault();
            v_904d46.replace("/(user)/oth-path");
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: v_8d41d7("userCart.title"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <ShoppingCart size={v_05b441} color={v_3c2a3a} />,
          tabBarBadge: v_826967 > 0 ? v_826967 : undefined,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: v_8d41d7("mypage.title"),
          tabBarIcon: ({ color: v_3c2a3a, size: v_05b441 }) => <UserCircle size={v_05b441} color={v_3c2a3a} />,
        }}
      />

      {}
      <Tabs.Screen name="purchase" options={{ href: null }} />
      <Tabs.Screen name="payment-process" options={{ href: null }} />
      <Tabs.Screen name="send-gift" options={{ href: null }} />
      <Tabs.Screen name="settlement" options={{ href: null }} />
      <Tabs.Screen name="usdt-withdraw" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}
