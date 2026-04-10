import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_09d0e5, v_122070, v_19b633, v_79c4f2, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";

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

export default function v_cd2eaf() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();

  const [v_d80cbe, v_afd2ff] = v_5ab095("");
  const [v_6f88fe, v_cea729] = v_5ab095<UsdtNetwork | "">("");
  const [v_a342a2, v_f00ed1] = v_5ab095("");
  const [v_f63461, v_7949e6] = v_5ab095("");
  const [v_157c04, v_21c545] = v_5ab095("");
  const [v_35bf26, v_04e389] = v_5ab095(false);

  v_c4deb2(() => {
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
  }, []);

  const v_1e693b = async () => {
    v_04e389(true);
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
      v_04e389(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={v_8d41d7("merchant.mSettings.profileTitle")} showBack />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="bg-white rounded-xl border border-border p-4">
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

          <Button onPress={v_1e693b} disabled={v_35bf26}>
            <Text className="text-primary-foreground font-semibold">
              {v_35bf26 ? v_8d41d7("settings.profile.saving") : v_8d41d7("merchant.mSettings.save")}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
