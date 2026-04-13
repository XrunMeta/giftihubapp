import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_5d2c47 } from "jbfshypwcrklpetczcsca";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_7ef860, v_5a0760 } from "eqrxxpgqjbwbqqqhvy";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_122070, v_19b633, v_79c4f2, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";

export default function v_e2b396() {
  const v_5c50c0 = v_2bd2c5();
  const { t: v_8d41d7 } = v_678659();
  const { user: v_625c74, updateUser: v_19fcbf } = v_5d2c47();
  const [v_1833e7, v_318f24] = v_5ab095(v_625c74?.name ?? "");
  const [v_4270b4, v_08365d] = v_5ab095(false);

  v_c4deb2(() => {
    v_7ef860()
      .then((v_8f00b9) => {
        v_318f24(v_8f00b9.user.name ?? "");
        if (v_625c74) v_19fcbf({ ...v_625c74, name: v_8f00b9.user.name ?? v_625c74.name });
      })
      .catch(() => {});

  }, []);

  const v_cf7dad = async () => {
    const v_2f361a = v_1833e7.trim();
    if (!v_2f361a) {
      v_5c50c0(v_8d41d7("settings.profile.nameRequiredTitle"), v_8d41d7("settings.profile.nameRequiredBody"));
      return;
    }
    v_08365d(true);
    try {
      await v_5a0760({ name: v_2f361a });
      if (v_625c74) v_19fcbf({ ...v_625c74, name: v_2f361a });
      v_5c50c0(v_8d41d7("settings.profile.savedTitle"), v_8d41d7("settings.profile.savedBody"));
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("settings.profile.failTitle"), String(v_49263d?.body?.error ?? v_49263d?.message ?? v_49263d));
    } finally {
      v_08365d(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={v_8d41d7("settings.profile.title")} showBack />
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>
        <View className="bg-white rounded-xl border border-border p-4">
          <Text className="text-sm text-muted-foreground mb-3">{v_8d41d7("settings.profile.hint")}</Text>
          <Text className="text-xs text-muted-foreground mb-1">{v_8d41d7("settings.profile.nameLabel")}</Text>
          <TextInput
            value={v_1833e7}
            onChangeText={v_318f24}
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base mb-3"
            placeholder={v_8d41d7("settings.profile.namePh")}
            placeholderTextColor="#999"
            maxLength={50}
          />
          <Button onPress={v_cf7dad} disabled={v_4270b4}>
            <Text className="text-primary-foreground font-semibold">
              {v_4270b4 ? v_8d41d7("settings.profile.saving") : v_8d41d7("settings.profile.saveName")}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
