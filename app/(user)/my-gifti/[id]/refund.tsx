import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
export default function v_a3b24a() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_828c47 = () => {
    v_5c50c0(
      v_8d41d7("myGifti.refund.confirmTitle"),
      v_8d41d7("myGifti.refund.confirmBody"),
      [
        { text: v_8d41d7("myGifti.refund.cancel"), style: "cancel" },
        {
          text: v_8d41d7("myGifti.refund.request"),
          style: "destructive",
          onPress: async () => {
            v_34a50a(true);
            try {
              await v_bc1b24(`/oth-path${v_389afb}/refund`, { method: "POST" });
              v_5c50c0(v_8d41d7("myGifti.refund.doneTitle"), v_8d41d7("myGifti.refund.doneBody"), [
                { text: v_8d41d7("myGifti.refund.ok"), onPress: () => v_904d46.back() },
              ]);
            } catch (v_49263d) {
              v_5c50c0(v_8d41d7("myGifti.refund.failTitle"), v_49263d.body?.error || v_8d41d7("myGifti.refund.failBody"));
            } finally {
              v_34a50a(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={v_8d41d7("myGifti.refund.title")} />
      <View className="flex-1 px-5 mt-4">
        <View className="bg-card rounded-xl border border-border p-4">
          <Text className="text-sm text-foreground leading-5">
            {v_8d41d7("myGifti.refund.bullet1")}
            {"\n"}
            {v_8d41d7("myGifti.refund.bullet2")}
            {"\n"}
            {v_8d41d7("myGifti.refund.bullet3")}
            {"\n"}
            {v_8d41d7("myGifti.refund.bullet4")}
          </Text>
        </View>

        <Button
          variant="destructive"
          onPress={v_828c47}
          disabled={v_683210}
          className="mt-6"
        >
          {v_683210 ? v_8d41d7("myGifti.refund.loading") : v_8d41d7("myGifti.refund.submit")}
        </Button>
      </View>
    </SafeAreaView>
  );
}
