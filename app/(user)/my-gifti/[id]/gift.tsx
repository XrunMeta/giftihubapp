import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_dd6147, v_6465b2 } from "pvulvehakmpzwkznlnd";
import { v_db3cc6 } from "dyunzbus";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_84fd28, v_ce06ad, v_a675a7, v_dc4a73 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_5f4661, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";

const v_89b34f = "https://giftihub.com/gift";

export default function v_006fbd() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const { id: v_389afb, voucherName: v_ec659d } = v_d1a7ac<{ id: string; voucherName: string }>();
  const v_904d46 = v_d1d90c();
  const [v_a8cd21, v_fd9c06] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);
  const [v_a59116, v_46ba22] = v_5ab095<string | null>(null);
  const [v_0b8131, v_7acfe1] = v_5ab095<number | null>(null);

  const v_87d1a3 = async () => {
    v_34a50a(true);
    try {
      const v_8f00b9 = await v_6465b2(v_389afb!, v_a8cd21 || undefined);
      v_46ba22(v_8f00b9.gift_code);
      v_7acfe1(v_8f00b9.expires_at);
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("myGifti.gift.failTitle"), v_49263d.body?.error || v_8d41d7("myGifti.gift.failBody"));
    } finally {
      v_34a50a(false);
    }
  };

  const v_22cd2d = async () => {
    if (!v_a59116) return;
    const v_f71b56 = `${v_89b34f}/${v_a59116}`;
    const v_6a425b = v_a8cd21
      ? `${v_8d41d7("myGifti.gift.shareText")} ${v_a8cd21}\n${v_f71b56}`
      : `${v_8d41d7("myGifti.gift.shareText")}\n${v_f71b56}`;
    try {
      await v_5f4661.share({ message: v_6a425b, url: v_f71b56 });
    } catch {}
  };

  const v_5ca23e = () => {
    v_5c50c0(
      v_8d41d7("myGifti.gift.cancelTitle"),
      v_8d41d7("myGifti.gift.cancelBody"),
      [
        { text: v_8d41d7("myGifti.gift.cancelNo"), style: "cancel" },
        {
          text: v_8d41d7("myGifti.gift.cancelYes"),
          style: "destructive",
          onPress: async () => {
            try {
              await v_dd6147(v_389afb!);
              v_46ba22(null);
              v_7acfe1(null);
              v_5c50c0(v_8d41d7("myGifti.gift.cancelDoneTitle"), v_8d41d7("myGifti.gift.cancelDoneBody"));
            } catch (v_49263d) {
              v_5c50c0(v_8d41d7("myGifti.gift.failTitle"), v_49263d.body?.error || v_8d41d7("myGifti.gift.failBody"));
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title={v_8d41d7("myGifti.gift.title")} />
      <View className="flex-1 px-5 mt-4">
        {}
        {v_ec659d && (
          <View className="bg-card border border-border rounded-xl p-4 mb-4">
            <Text className="text-xs text-muted-foreground">{v_8d41d7("myGifti.gift.voucherLabel")}</Text>
            <Text className="text-base font-semibold text-foreground mt-1">{v_ec659d}</Text>
          </View>
        )}

        {!v_a59116 ? (
          <>
            {}
            <Text className="text-sm font-medium text-foreground mb-1.5">
              {v_8d41d7("myGifti.gift.messageLabel")}
            </Text>
            <Input
              placeholder={v_8d41d7("myGifti.gift.messagePlaceholder")}
              value={v_a8cd21}
              onChangeText={v_fd9c06}
              multiline
              numberOfLines={3}
              className="min-h-[80px]"
            />
            <Text className="text-xs text-muted-foreground mt-1.5">
              {v_8d41d7("myGifti.gift.messageHint")}
            </Text>

            {}
            <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-4">
              <Text className="text-sm font-medium text-amber-600">{v_8d41d7("myGifti.gift.noticeTitle")}</Text>
              <Text className="text-xs text-muted-foreground mt-1">
                {v_8d41d7("myGifti.gift.notice1")}
                {"\n"}
                {v_8d41d7("myGifti.gift.notice2")}
                {"\n"}
                {v_8d41d7("myGifti.gift.notice3")}
              </Text>
            </View>

            <Button onPress={v_87d1a3} disabled={v_683210} className="mt-6">
              <View className="flex-row items-center gap-2">
                <Gift size={16} color="#fff" />
                <Text className="text-sm font-medium text-primary-foreground">
                  {v_683210 ? v_8d41d7("myGifti.gift.creating") : v_8d41d7("myGifti.gift.createBtn")}
                </Text>
              </View>
            </Button>
          </>
        ) : (
          <>
            {}
            <View className="bg-primary/5 border border-primary/30 rounded-xl p-5 items-center">
              <Link2 size={32} color="#CE3630" />
              <Text className="text-lg font-bold text-foreground mt-3">
                {v_8d41d7("myGifti.gift.linkReady")}
              </Text>
              <View className="bg-white border border-border rounded-lg px-4 py-3 mt-3 w-full">
                <Text className="text-center text-base font-mono tracking-widest text-foreground" selectable>
                  {v_a59116}
                </Text>
              </View>
              {v_0b8131 && (
                <Text className="text-xs text-muted-foreground mt-2">
                  {v_8d41d7("myGifti.gift.expiresAt").replace("{{date}}", v_db3cc6(new Date(v_0b8131 * 1000), "yyyy.MM.dd HH:mm"))}
                </Text>
              )}
            </View>

            <Button onPress={v_22cd2d} className="mt-4">
              <View className="flex-row items-center gap-2">
                <Share2 size={16} color="#fff" />
                <Text className="text-sm font-medium text-primary-foreground">
                  {v_8d41d7("myGifti.gift.shareBtn")}
                </Text>
              </View>
            </Button>

            <Button variant="outline" onPress={v_5ca23e} className="mt-3">
              <View className="flex-row items-center gap-2">
                <XCircle size={16} color="#ef4444" />
                <Text className="text-sm font-medium text-destructive">
                  {v_8d41d7("myGifti.gift.cancelBtn")}
                </Text>
              </View>
            </Button>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
