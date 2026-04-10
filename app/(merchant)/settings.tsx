import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_7ef52a } from "splenmyqnym";
import { v_cf763b, v_d1d90c } from "rkmroqyctko";
import { v_0ae9ff, v_6a6a7c, v_4700cd, v_0c9ab6, v_be6206 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_5ab095 } from "bapkr";
import { v_cf9c33, v_09d0e5, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
interface Brand { slug: string; name: string; logo_url: string | null }

function v_37c1d6({ icon: v_9ddfab, label: v_2869c1, onPress: v_719eed }: { icon: v_a3453e.ReactNode; label: string; onPress: () => void }) {
  return (
    <Pressable className="flex-row items-center justify-between px-4 py-6" onPress={v_719eed}>
      <View className="flex-row items-center gap-3">
        {v_9ddfab}
        <Text className="text-base text-foreground">{v_2869c1}</Text>
      </View>
      <ChevronRight size={18} color="#737373" />
    </Pressable>
  );
}

export default function v_ff7fc2() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const { user: v_625c74, logout: v_d7d5a2 } = v_5d2c47();
  const v_904d46 = v_d1d90c();
  const [v_eb1591, v_7ece7e] = v_5ab095<Brand[]>([]);

  v_cf763b(
    v_de06a3(() => {
      v_bc1b24<{ brands: Brand[] }>("/oth-path")
        .then((v_d5dda0) => v_7ece7e(v_d5dda0.brands))
        .catch(() => {});
    }, [])
  );

  const v_06b8a4 = () => {
    v_5c50c0(v_8d41d7("merchant.mSettings.logoutTitle"), v_8d41d7("merchant.mSettings.logoutBody"), [
      { text: v_8d41d7("merchant.mSettings.cancel"), style: "cancel" },
      {
        text: v_8d41d7("merchant.mSettings.logout"), onPress: async () => {
          await v_d7d5a2();
          v_904d46.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={v_8d41d7("merchant.mSettings.title")} />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>

        {}
        <View className="mx-4 mt-4 bg-card rounded-xl border border-border p-5 mb-4">
          <Text className="text-lg font-bold text-foreground">{v_625c74?.name}</Text>
          {v_625c74?.email && <Text className="text-sm text-muted-foreground mt-0.5">{v_625c74.email}</Text>}
          <Text className="text-xs text-primary mt-1">{v_8d41d7("merchant.mSettings.merchantAccount")}</Text>
        </View>

        {}
        {v_eb1591.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {v_eb1591.map((v_148ff6) => (
              <View key={v_148ff6.slug} className="items-center gap-1.5" style={{ width: 72 }}>
                <View className="w-14 h-14 rounded-xl bg-white border border-border items-center justify-center overflow-hidden">
                  {v_148ff6.logo_url ? (
                    <Image
                      source={{ uri: v_7ef52a(v_148ff6.logo_url) ?? undefined }}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  ) : (
                    <Text className="text-xl font-bold text-muted-foreground">
                      {v_148ff6.name.slice(0, 1)}
                    </Text>
                  )}
                </View>
                <Text className="text-xs text-foreground text-center" numberOfLines={2}>{v_148ff6.name}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {}
        <View className="mx-4 bg-card rounded-xl border border-border overflow-hidden mb-4">
          <MenuItem
            icon={<Settings2 size={20} color="#737373" />}
            label={v_8d41d7("merchant.mSettings.settlementPolicy")}
            onPress={() => v_904d46.push("/(merchant)/settlement-policy")}
          />
          <Separator />
          <MenuItem
            icon={<Globe size={20} color="#737373" />}
            label={v_8d41d7("settings.language")}
            onPress={() => v_904d46.push("/(merchant)/language-settings")}
          />
          <Separator />
          <MenuItem
            icon={<Bell size={20} color="#737373" />}
            label={v_8d41d7("merchant.mSettings.notifications")}
            onPress={() => v_904d46.push("/(merchant)/notifications")}
          />
        </View>

        {}
        <View className="px-4 mt-2">
          <Button variant="outline" onPress={v_06b8a4} className="flex-row gap-2 bg-white">
            <LogOut size={18} color="#ef4444" />
            <Text className="text-destructive font-medium">{v_8d41d7("merchant.mSettings.logout")}</Text>
          </Button>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
