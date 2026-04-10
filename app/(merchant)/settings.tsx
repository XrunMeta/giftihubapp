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
import { v_cf9c33, v_09d0e5, v_122070, v_19b633, v_79c4f2, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
interface Brand { slug: string; name: string; logo_url: string | null }

type UsdtNetwork = "ethereum" | "polygon" | "bnb";

interface MerchantProfile {
  usdt_address?: string;
  usdt_network?: UsdtNetwork;
  bank_name?: string;
  account_number?: string;
  address?: string;
}

const v_dc1b36 = [
  { key: "ethereum", label: "merchant.mSettings.ethereum" },
  { key: "polygon", label: "merchant.mSettings.polygon" },
  { key: "bnb", label: "merchant.mSettings.bnb" },
];

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

  const [v_d80cbe, v_afd2ff] = v_5ab095("");
  const [v_6f88fe, v_cea729] = v_5ab095<UsdtNetwork | "">("");
  const [v_a342a2, v_f00ed1] = v_5ab095("");
  const [v_f63461, v_7949e6] = v_5ab095("");
  const [v_157c04, v_21c545] = v_5ab095("");
  const [v_3dbb09, v_2c83b2] = v_5ab095(false);

  v_cf763b(
    v_de06a3(() => {
      v_bc1b24<{ brands: Brand[] }>("/oth-path")
        .then((v_d5dda0) => v_7ece7e(v_d5dda0.brands))
        .catch(() => {});

      v_bc1b24<{ profile: MerchantProfile }>("/oth-path")
        .then((v_d5dda0) => {
          const v_e2a85c = v_d5dda0.profile;
          v_afd2ff(v_e2a85c.usdt_address ?? "");
          v_cea729(v_e2a85c.usdt_network ?? "");
          v_f00ed1(v_e2a85c.bank_name ?? "");
          v_7949e6(v_e2a85c.account_number ?? "");
          v_21c545(v_e2a85c.address ?? "");
        })
        .catch(() => {});
    }, [])
  );

  const v_b41f79 = async () => {
    v_2c83b2(true);
    try {
      await v_bc1b24("/oth-path", {
        method: "PATCH",
        body: JSON.stringify({
          usdt_address: v_d80cbe,
          usdt_network: v_6f88fe || undefined,
          bank_name: v_a342a2,
          account_number: v_f63461,
          address: v_157c04,
        }),
      });
      v_5c50c0(v_8d41d7("merchant.mSettings.savedTitle"), v_8d41d7("merchant.mSettings.saved"));
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("settings.profile.failTitle"), String(v_49263d?.body?.error ?? v_49263d?.message ?? v_49263d));
    } finally {
      v_2c83b2(false);
    }
  };

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
        <View className="mx-4 bg-card rounded-xl border border-border p-4 mb-4">
          <Text className="text-base font-semibold text-foreground mb-3">{v_8d41d7("merchant.mSettings.profileTitle")}</Text>

          {}
          <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("merchant.mSettings.usdt")}</Text>
          <TextInput
            value={v_d80cbe}
            onChangeText={v_afd2ff}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-2"
            placeholder={v_8d41d7("merchant.mSettings.usdtAddressPh")}
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
          <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("merchant.mSettings.usdtNetwork")}</Text>
          <View className="flex-row gap-2 mb-4">
            {v_dc1b36.map((v_68b2be) => {
              const v_587413 = v_6f88fe === v_68b2be.key;
              return (
                <Pressable
                  key={v_68b2be.key}
                  className={`flex-1 items-center py-2.5 rounded-lg border ${v_587413 ? "border-primary bg-primary/10" : "border-border bg-gray-50"}`}
                  onPress={() => v_cea729(v_68b2be.key)}
                >
                  <Text className={`text-xs font-medium ${v_587413 ? "text-primary" : "text-foreground"}`}>
                    {v_8d41d7(v_68b2be.label)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {}
          <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("merchant.mSettings.bankName")}</Text>
          <TextInput
            value={v_a342a2}
            onChangeText={v_f00ed1}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-2"
            placeholder={v_8d41d7("merchant.mSettings.bankName")}
            placeholderTextColor="#999"
          />
          <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("merchant.mSettings.accountNumber")}</Text>
          <TextInput
            value={v_f63461}
            onChangeText={v_7949e6}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-4"
            placeholder={v_8d41d7("merchant.mSettings.accountNumber")}
            placeholderTextColor="#999"
            keyboardType="number-pad"
          />

          {}
          <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("merchant.mSettings.address")}</Text>
          <TextInput
            value={v_157c04}
            onChangeText={v_21c545}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-4"
            placeholder={v_8d41d7("merchant.mSettings.addressPlaceholder")}
            placeholderTextColor="#999"
            multiline
            numberOfLines={2}
          />

          <Button onPress={v_b41f79} disabled={v_3dbb09}>
            <Text className="text-primary-foreground font-semibold">
              {v_3dbb09 ? v_8d41d7("settings.profile.saving") : v_8d41d7("merchant.mSettings.save")}
            </Text>
          </Button>
        </View>

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
