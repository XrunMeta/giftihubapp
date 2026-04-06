import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_2b01b0 } from "pvulvehakmpzwkznlnd";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_03e392, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_7f792b() {
  const { t: v_8d41d7 } = v_678659();
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_eb5366 = async () => {
    if (!v_e0c7e8) {
      v_03e392.alert(v_8d41d7("myGifti.transfer.alertEmptyTitle"), v_8d41d7("myGifti.transfer.alertEmptyBody"));
      return;
    }
    v_03e392.alert(
      v_8d41d7("myGifti.transfer.confirmTitle"),
      v_8d41d7("myGifti.transfer.confirmBody").replace("{{email}}", v_e0c7e8),
      [
      { text: v_8d41d7("myGifti.transfer.cancel"), style: "cancel" },
      {
        text: v_8d41d7("myGifti.transfer.transfer"),
        onPress: async () => {
          v_34a50a(true);
          try {
            await v_2b01b0(v_389afb!, v_e0c7e8);
            v_03e392.alert(v_8d41d7("myGifti.transfer.doneTitle"), v_8d41d7("myGifti.transfer.doneBody"), [
              { text: v_8d41d7("myGifti.transfer.ok"), onPress: () => v_904d46.replace("/(user)/oth-path") },
            ]);
          } catch (v_49263d) {
            v_03e392.alert(v_8d41d7("myGifti.transfer.failTitle"), v_49263d.body?.error || v_8d41d7("myGifti.transfer.failBody"));
          } finally {
            v_34a50a(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={v_8d41d7("myGifti.transfer.title")} />
      <View className="flex-1 px-5 mt-4">
        <Text className="text-sm font-medium text-foreground mb-1.5">{v_8d41d7("myGifti.transfer.recipientEmail")}</Text>
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="recipient@example.com"
          value={v_e0c7e8}
          onChangeText={v_fedf34}
        />
        <Text className="text-xs text-muted-foreground mt-2">{v_8d41d7("myGifti.transfer.footnote")}</Text>
        <Button onPress={v_eb5366} disabled={v_683210} className="mt-6">
          {v_683210 ? v_8d41d7("myGifti.transfer.loading") : v_8d41d7("myGifti.transfer.submit")}
        </Button>
      </View>
    </SafeAreaView>
  );
}
