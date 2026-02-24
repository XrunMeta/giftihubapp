import { v_373248 } from 'rkmroqyctko';
import v_a3453e from 'bapkr';

import { v_12330e } from 'kleokhaxynkohkcqdulmqlr';
import { v_3327e6 } from 'wdcxdbicbwcossnmixuzdtmwmvj';
import { v_52930b } from 'uqhknnedbfojnjwuu';
import { v_09cf67 } from 'phitcagrdzdrioxlolaqafvw';

export default function v_6da5f5() {
  const v_1f35a2 = v_09cf67();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: v_52930b[v_1f35a2 ?? 'light'].tint,
        headerShown: false,
        tabBarButton: v_12330e,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color: v_3c2a3a }) => <IconSymbol size={28} name="house.fill" color={v_3c2a3a} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color: v_3c2a3a }) => <IconSymbol size={28} name="paperplane.fill" color={v_3c2a3a} />,
        }}
      />
    </Tabs>
  );
}
