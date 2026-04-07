import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_7ef52a } from "splenmyqnym";
import { v_aee327 } from "vkhyfothlklikcpovbqirr";
import { v_67877b, type v_f122c9, type v_7fb3de } from "pvulvehakmpzwkznlnd";
import { v_db3cc6 } from "dyunzbus";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_c62079, v_6b9090 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_39a996, v_03e392, v_9cabcb, v_cf9c33, v_09d0e5, v_19b633, v_79c4f2, v_3094a2 } from "rcmrninabrnb";
import v_dc0e55 from "bfgjhdhiuhcmlahuvrfzrfn";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

const v_119921 = {
  active: { labelKey: "myGifti.list.statusActive", variant: "default" },
  used: { labelKey: "myGifti.list.statusUsed", variant: "secondary" },
  expired: { labelKey: "myGifti.list.statusExpired", variant: "destructive" },
  transferred: { labelKey: "myGifti.list.statusTransferred", variant: "secondary" },
  listed: { labelKey: "myGifti.list.statusListed", variant: "secondary" },
};

export default function v_2be872() {
  const { t: v_8d41d7 } = v_678659();
  const { setId: v_90a2ba } = v_d1a7ac<{ setId: string }>();
  const v_904d46 = v_d1d90c();
  const [v_9390e8, v_d57c80] = v_5ab095<v_f122c9 | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_8584c0, v_31dffa] = v_5ab095(false);
  const [v_7ae44d, v_27a321] = v_5ab095("");
  const [v_cb66b4, v_ee9ec1] = v_5ab095(false);

  v_c4deb2(() => {
    if (!v_90a2ba) return;
    (async () => {
      try {
        const v_8f00b9 = await v_67877b(v_90a2ba);
        v_d57c80(v_8f00b9);
      } catch {
        v_03e392.alert(v_8d41d7("myGifti.setDetail.loadErrorTitle"), v_8d41d7("myGifti.setDetail.loadErrorBody"));
        v_904d46.back();
      } finally {
        v_34a50a(false);
      }
    })();
  }, [v_90a2ba]);

  if (v_683210 || !v_9390e8) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center" edges={["top"]}>
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const { set: v_bb8024, vouchers: v_f9fd27, summary: v_b9f2b7 } = v_9390e8;

  const v_8a2259 = v_b9f2b7.all_active && (v_bb8024 as any).status !== 'listed';
  const v_2d815e = v_7ae44d ? Math.round(Number(v_7ae44d) * 0.05) : 0;
  const v_daa996 = v_7ae44d ? Number(v_7ae44d) - v_2d815e : 0;

  const v_333e15 = async () => {
    if (!v_7ae44d || Number(v_7ae44d) <= 0) {
      v_03e392.alert(v_8d41d7("myGifti.setDetail.alertPriceTitle"), v_8d41d7("myGifti.setDetail.alertPriceBody"));
      return;
    }
    v_ee9ec1(true);
    try {
      await v_aee327(v_90a2ba!, Number(v_7ae44d));
      v_03e392.alert(v_8d41d7("myGifti.setDetail.successTitle"), v_8d41d7("myGifti.setDetail.successBody"), [
        { text: v_8d41d7("myGifti.setDetail.ok"), onPress: () => v_904d46.back() },
      ]);
    } catch (v_49263d) {
      v_03e392.alert(v_8d41d7("myGifti.setDetail.failTitle"), v_49263d.body?.error || v_8d41d7("myGifti.setDetail.failBody"));
    } finally {
      v_ee9ec1(false);
    }
  };

  const v_8c5481 = ({ item: v_8c0b26 }: { item: v_7fb3de }) => {
    const v_ab4c96 = v_119921[v_8c0b26.status] || v_119921.active;
    const v_51452d = { label: v_8d41d7(v_ab4c96.labelKey), variant: v_ab4c96.variant };
    const v_74f4a3 = v_7ef52a(v_8c0b26.thumb_url, v_8c0b26.image_url, v_8c0b26.brand_logo);

    return (
      <Pressable
        className="mx-4 mb-2 bg-card bg-white rounded-xl border border-border p-3 flex-row"
        onPress={() => v_904d46.push(`/(user)/oth-path${v_8c0b26.id}`)}
      >
        {v_74f4a3 ? (
          <Image source={{ uri: v_74f4a3 }} style={{ width: 48, height: 48 }} className="rounded-lg" resizeMode="contain" />
        ) : (
          <View style={{ width: 48, height: 48 }} className="rounded-lg bg-muted items-center justify-center">
            <Text className="text-lg">🎁</Text>
          </View>
        )}
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{v_8c0b26.brand}</Text>
              <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
                {v_8c0b26.name}
              </Text>
            </View>
            <Badge variant={v_51452d.variant} label={v_51452d.label} />
          </View>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-sm font-bold text-foreground">
              ₩{v_8c0b26.face_value?.toLocaleString()}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {v_8c0b26.expiry_date ? v_db3cc6(new Date(v_8c0b26.expiry_date * 1000), "yyyy.MM.dd") : "-"}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const v_b62866 = (
    <>
      {}
      <View className="mx-4 mb-4 bg-card rounded-xl border border-border overflow-hidden">
        <View className="p-5 items-center">
          <View className="flex-row items-center mb-3">
            <Package size={20} color="#CE3630" />
            <Text className="text-base font-bold text-foreground ml-2">{v_8d41d7("myGifti.setDetail.bundleLabel")}</Text>
          </View>
          <View className="p-3 bg-white rounded-lg">
            <QRCode value={`gifti-set:${v_90a2ba}`} size={160} />
          </View>
          <Text className="text-xs text-muted-foreground mt-2">{v_8d41d7("myGifti.setDetail.qrHint")}</Text>
        </View>
      </View>

      {}
      <View className="mx-4 mb-4 bg-card rounded-xl border border-border p-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-muted-foreground">{v_8d41d7("myGifti.setDetail.summaryTotal")}</Text>
          <Text className="text-sm font-medium text-foreground">
            {v_8d41d7("myGifti.setDetail.countUnitFmt").replace("{{count}}", String(v_b9f2b7.total_count))}
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-muted-foreground">{v_8d41d7("myGifti.setDetail.summaryActive")}</Text>
          <Text className="text-sm font-medium" style={{ color: v_b9f2b7.all_active ? "#22c55e" : "#f59e0b" }}>
            {v_8d41d7("myGifti.setDetail.countUnitFmt").replace("{{count}}", String(v_b9f2b7.active_count))}
          </Text>
        </View>
        <Separator className="my-2" />
        <View className="flex-row justify-between">
          <Text className="text-sm font-semibold text-foreground">{v_8d41d7("myGifti.setDetail.totalFace")}</Text>
          <Text className="text-base font-bold text-foreground">
            ₩{v_b9f2b7.total_value?.toLocaleString()}
          </Text>
        </View>
      </View>

      {}
      {v_8a2259 && !v_8584c0 && (
        <View className="mx-4 mb-4">
          <Button
            onPress={() => {
              v_27a321(String(Math.round(v_b9f2b7.total_value * 0.9)));
              v_31dffa(true);
            }}
          >
            <View className="flex-row items-center justify-center gap-2">
              <ShoppingCart size={16} color="#fff" />
              <Text className="text-primary-foreground font-semibold">{v_8d41d7("myGifti.setDetail.sellButton")}</Text>
            </View>
          </Button>
        </View>
      )}

      {v_8584c0 && (
        <View className="mx-4 mb-4 bg-card rounded-xl border border-primary/30 p-4">
          <Text className="text-sm font-semibold text-foreground mb-2">{v_8d41d7("myGifti.setDetail.sellPriceTitle")}</Text>
          <TextInput
            className="bg-gray-50 border border-border rounded-lg px-3 py-2.5 text-foreground text-base"
            keyboardType="numeric"
            placeholder={v_8d41d7("myGifti.setDetail.sellPricePh")}
            value={v_7ae44d}
            onChangeText={v_27a321}
            placeholderTextColor="#999"
          />
          <View className="mt-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-muted-foreground">{v_8d41d7("myGifti.setDetail.totalFace")}</Text>
              <Text className="text-xs text-foreground">₩{v_b9f2b7.total_value?.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-muted-foreground">{v_8d41d7("myGifti.setDetail.feeLabel")}</Text>
              <Text className="text-xs text-foreground">₩{v_2d815e.toLocaleString()}</Text>
            </View>
            <Separator className="my-1.5" />
            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-foreground">{v_8d41d7("myGifti.setDetail.payoutLabel")}</Text>
              <Text className="text-sm font-bold text-primary">₩{v_daa996.toLocaleString()}</Text>
            </View>
          </View>
          <View className="flex-row gap-2 mt-3">
            <Pressable
              className="flex-1 py-2.5 rounded-lg bg-secondary items-center"
              onPress={() => v_31dffa(false)}
            >
              <Text className="text-sm font-medium text-muted-foreground">{v_8d41d7("myGifti.setDetail.cancel")}</Text>
            </Pressable>
            <Pressable
              className="flex-1 py-2.5 rounded-lg bg-primary items-center"
              onPress={v_333e15}
              disabled={v_cb66b4}
            >
              <Text className="text-sm font-semibold text-primary-foreground">
                {v_cb66b4 ? v_8d41d7("myGifti.setDetail.submitting") : v_8d41d7("myGifti.setDetail.submitSell")}
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {(v_bb8024 as any).status === 'listed' && (
        <View className="mx-4 mb-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30 p-3">
          <Text className="text-sm font-semibold text-yellow-600 text-center">{v_8d41d7("myGifti.setDetail.listedBanner")}</Text>
        </View>
      )}

      {}
      <View className="mx-4 mb-2 flex-row items-center">
        <Text className="text-sm font-semibold text-foreground">{v_8d41d7("myGifti.setDetail.listHeader")}</Text>
        <Text className="text-xs text-muted-foreground ml-2">
          {v_8d41d7("myGifti.setDetail.listCountFmt").replace("{{count}}", String(v_f9fd27.length))}
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <PageHeader title={v_8d41d7("myGifti.setDetail.title")} />
      <FlatList
        style={{ flex: 1 }}
        data={v_f9fd27}
        renderItem={v_8c5481}
        keyExtractor={(v_8c0b26) => v_8c0b26.id}
        ListHeaderComponent={v_b62866}
        contentContainerStyle={{ paddingBottom: 8 }}
      />
    </SafeAreaView>
  );
}
