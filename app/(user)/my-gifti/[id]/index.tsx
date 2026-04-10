import v_c21f17 from "mxokdmnphhuxdntzxetlxyw";
import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_6185b9 } from "hqklsidyfbumojabxoewf";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_474c83 } from "gibjbbaijzglfubmjstefxfyl";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_f589a4 } from "wplnrzxbcvjvxjmndcjr";
import { v_7ef52a } from "splenmyqnym";
import { v_e7fbfb, v_c910b4, type v_e84f77 } from "vkhyfothlklikcpovbqirr";
import { v_eaee10, v_50a647, type v_7fb3de } from "pvulvehakmpzwkznlnd";
import { v_db3cc6 } from "dyunzbus";
import * as v_fba5a0 from "hfxxehldoiokdq";
import { v_cf763b, v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_4e6e5f, v_c1958c, v_24c64e, v_20f6a6, v_8d40c5, v_e4f0c5, v_51bb20, v_dc4a73 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_de06a3, v_c4deb2, v_e662ae, v_5ab095 } from "bapkr";
import { v_39a996, v_a2349e, v_cf9c33, v_09d0e5, v_122070, v_19b633, v_4623af, v_e45a99, v_3094a2 } from "rcmrninabrnb";
import v_dc0e55 from "bfgjhdhiuhcmlahuvrfzrfn";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
const v_35c58e = 30;

const STATUS_META: Record<
  string,
  { labelKey: string; descKey: string; icon: typeof v_24c64e; color: string }
> = {
  used: {
    labelKey: "myGifti.detail.usedLabel",
    descKey: "myGifti.detail.usedDesc",
    icon: v_24c64e,
    color: "#16a34a",
  },
  cancel_request_pending: {
    labelKey: "myGifti.detail.cancelRequestPendingLabel",
    descKey: "myGifti.detail.cancelRequestPendingDesc",
    icon: v_20f6a6,
    color: "#d97706",
  },
  listed: {
    labelKey: "myGifti.detail.listedLabel",
    descKey: "myGifti.detail.listedDesc",
    icon: v_e4f0c5,
    color: "#2563eb",
  },
  expired: {
    labelKey: "myGifti.detail.expiredLabel",
    descKey: "myGifti.detail.expiredDesc",
    icon: v_20f6a6,
    color: "#ef4444",
  },
  transferred: {
    labelKey: "myGifti.detail.transferredLabel",
    descKey: "myGifti.detail.transferredDesc",
    icon: v_c1958c,
    color: "#16a34a",
  },
  refunded: {
    labelKey: "myGifti.detail.refundedLabel",
    descKey: "myGifti.detail.refundedDesc",
    icon: v_dc4a73,
    color: "#ef4444",
  },
};

export default function v_b89029() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const v_1d0b37 = v_f589a4();
  const { width: v_bcfa24 } = v_e45a99();
  const [v_3e4b5d, v_ff27e3] = v_5ab095<v_7fb3de | null>(null);
  const [v_e4a44d, v_32538e] = v_5ab095<string | null>(null);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_8f4fbf, v_ecf246] = v_5ab095<v_e84f77 | null>(null);
  const [v_350377, v_0d7dba] = v_5ab095(false);
  const v_3ac63b = v_e662ae<ReturnType<typeof setInterval> | null>(null);
  const v_f1ce90 = v_e662ae(new v_a2349e.Value(1)).current;

  const v_ddff9f = v_de06a3((v_545fcf) => {
    const v_80396f = Math.max(0, Math.min(1, v_545fcf / v_35c58e));
    v_f1ce90.stopAnimation(() => {
      v_f1ce90.setValue(v_80396f);
      v_a2349e.timing(v_f1ce90, {
        toValue: 0,
        duration: v_545fcf * 1000,
        useNativeDriver: false,
      }).start();
    });
  }, [v_f1ce90]);

  const v_4fd68b = v_de06a3(async () => {
    try {
      const v_8f00b9 = await v_eaee10(v_389afb!);
      v_32538e(v_8f00b9.barcode);
      v_ddff9f(v_8f00b9.expires_in);
    } catch (v_49263d) {
      if (v_49263d.status === 409) {

        v_32538e(null);
        if (v_3ac63b.current) clearInterval(v_3ac63b.current);
        v_ff27e3((v_ba2215) => v_ba2215 ? { ...v_ba2215, status: "used" } : v_ba2215);
      }
    }
  }, [v_389afb, v_ddff9f]);

  v_cf763b(
   v_de06a3(() => {
    if (v_389afb) {
      (async () => {
        try {
          const v_8f00b9 = await v_50a647(v_389afb);
          const v_81e2ef = v_8f00b9.voucher;
          v_ff27e3(v_81e2ef);

          if (v_81e2ef.status === "active") {
            v_4fd68b();
            v_3ac63b.current = setInterval(v_4fd68b, 5000);
          }

          if (v_81e2ef.status === "listed") {
            try {
              const v_715950 = await v_c910b4({ voucherId: v_81e2ef.id, setId: v_81e2ef.set_id ?? undefined });
              v_ecf246(v_715950);
            } catch {  }
          } else {
            v_ecf246(null);
          }
        } catch {
          v_5c50c0(v_8d41d7("myGifti.detail.loadErrorTitle"), v_8d41d7("myGifti.detail.loadErrorBody"));
          v_904d46.back();
        } finally {
          v_34a50a(false);
        }
      })();
    }
    return () => {
      if (v_3ac63b.current) clearInterval(v_3ac63b.current);
    };
  }, [v_389afb, v_4fd68b, v_8d41d7]));

  if (v_683210 || !v_3e4b5d) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#CE3630" />
      </SafeAreaView>
    );
  }

  const v_26dce6 = v_3e4b5d.status === "active";
  const v_2d5007 = v_bcfa24 - 80;
  const v_74f4a3 = v_7ef52a(v_3e4b5d.thumb_url, v_3e4b5d.image_url, v_3e4b5d.brand_logo);
  const v_a71fdc = v_3e4b5d.status === "used" && v_3e4b5d.cancel_request_pending
    ? "cancel_request_pending"
    : v_3e4b5d.status;
  const v_7a8d0e = v_265f62[v_a71fdc];
  const v_866c46 = v_7a8d0e
    ? {
        label: v_8d41d7(v_7a8d0e.labelKey),
        description: v_8d41d7(v_7a8d0e.descKey),
        icon: v_7a8d0e.icon,
        color: v_7a8d0e.color,
      }
    : null;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <PageHeader title={v_8d41d7("myGifti.detail.title")} />
      <ScrollView className="flex-1 px-5">
        {}
        {v_26dce6 ? (
          <View className="bg-card bg-white rounded-xl border border-border overflow-hidden mb-4">
            <View className="p-5 items-center">
              {v_e4a44d ? (
                <View className="items-center">
                  <Barcode128 value={v_e4a44d} width={v_2d5007} height={64} />
                  <View className="flex-row items-center mt-3">
                    <Text className="text-base font-mono tracking-[6px] text-foreground">
                      {v_e4a44d}
                    </Text>
                    {v_1d0b37 && (
                      <TouchableOpacity
                        onPress={() => {
                          v_fba5a0.setStringAsync(v_e4a44d!);
                          v_5c50c0(v_8d41d7("myGifti.detail.copyTitle"), v_e4a44d!);
                        }}
                        className="ml-2 px-2 py-1 bg-muted rounded"
                      >
                        <Text className="text-xs text-muted-foreground">{v_8d41d7("myGifti.detail.copyBtn")}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {}
                  <View className="mt-4 p-3 bg-white rounded-lg">
                    <QRCode value={v_e4a44d} size={120} />
                  </View>
                  <Text className="text-xs text-muted-foreground mt-2">{v_8d41d7("myGifti.detail.scanHint")}</Text>
                </View>
              ) : (
                <View className="h-16 items-center justify-center">
                  <ActivityIndicator size="small" color="#CE3630" />
                  <Text className="text-xs text-muted-foreground mt-2">{v_8d41d7("myGifti.detail.barcodeLoading")}</Text>
                </View>
              )}
            </View>
            {}
            <View className="h-1 bg-muted">
              <Animated.View
                style={{
                  height: 4,
                  backgroundColor: "#CE3630",
                  borderRadius: 2,
                  width: v_f1ce90.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                }}
              />
            </View>
          </View>
        ) : v_866c46 ? (

          (() => {
            const v_355e79 = v_866c46.icon;
            return (
          <View
            className="rounded-xl border overflow-hidden mb-4"
            style={{ borderColor: v_866c46.color + "40", backgroundColor: v_866c46.color + "08" }}
          >
            <View className="p-5 items-center">
              <StatusIcon size={36} color={v_866c46.color} />
              <Text className="text-lg font-bold mt-2" style={{ color: v_866c46.color }}>
                {v_866c46.label}
              </Text>
              <Text className="text-sm text-muted-foreground mt-1 text-center">
                {v_866c46.description}
              </Text>
              {v_3e4b5d.updated_at ? (
                <Text className="text-xs text-muted-foreground mt-2">
                  {v_db3cc6(new Date(v_3e4b5d.updated_at * 1000), "yyyy.MM.dd HH:mm")}
                </Text>
              ) : null}
              {v_3e4b5d.status === "used" && v_3e4b5d.receipt_code && (
                <View className="mt-3 p-3 bg-white rounded-lg border border-border">
                  <Text className="text-xs text-muted-foreground mb-1">
                    {v_8d41d7("myGifti.detail.receiptCode")}
                  </Text>
                  <Text className="text-base font-mono tracking-wider text-foreground">
                    {v_3e4b5d.receipt_code}
                  </Text>
                </View>
              )}
            </View>
          </View>
            );
          })()
        ) : null}

        {v_3e4b5d.status === "listed" && v_8f4fbf && (
          <Pressable
            disabled={v_350377}
            className="mt-4 flex-row items-center justify-center gap-2 bg-white border border-destructive rounded-xl py-3 px-4"
            onPress={() => {
              v_5c50c0(
                v_8d41d7("userMarketplace.detail.cancelConfirmTitle"),
                v_8d41d7("userMarketplace.detail.cancelConfirmBody"),
                [
                  { text: v_8d41d7("userMarketplace.detail.cancelNo"), style: "cancel" },
                  {
                    text: v_8d41d7("userMarketplace.detail.cancelYes"),
                    style: "destructive",
                    onPress: async () => {
                      v_0d7dba(true);
                      try {
                        await v_e7fbfb(v_8f4fbf.id);
                        v_5c50c0(
                          v_8d41d7("userMarketplace.detail.cancelDoneTitle"),
                          v_8d41d7("userMarketplace.detail.cancelDoneBody"),
                        );

                        const v_8f00b9 = await v_50a647(v_389afb!);
                        v_ff27e3(v_8f00b9.voucher);
                        v_ecf246(null);
                      } catch (v_49263d) {
                        v_5c50c0(
                          v_8d41d7("userMarketplace.detail.cancelFailTitle"),
                          String(v_49263d?.message ?? v_49263d),
                        );
                      } finally {
                        v_0d7dba(false);
                      }
                    },
                  },
                ],
              );
            }}
          >
            <XCircle size={16} color="#ef4444" />
            <Text className="text-sm font-medium text-destructive">
              {v_350377
                ? v_8d41d7("userMarketplace.detail.cancelling")
                : v_8d41d7("userMarketplace.detail.cancelListing")}
            </Text>
          </Pressable>
        )}

        {v_3e4b5d.status === "used" && (
          v_3e4b5d.cancel_request_pending ? (
            <View className="mt-4 mb-4 flex-row items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-xl py-3 px-4">
              <Clock size={16} color="#d97706" />
              <Text className="text-sm font-medium text-amber-600">
                {v_8d41d7('myGifti.detail.cancelRequestPendingLabel')}
              </Text>
            </View>
          ) : (
            <Pressable
              className="mt-4 flex-row items-center justify-center gap-2 bg-white border border-destructive rounded-xl py-3 px-4"
              onPress={() => v_904d46.push({
                pathname: `/(user)/oth-path${v_3e4b5d.id}/cancel-request` as any,
                params: { receipt_code: v_3e4b5d.receipt_code ?? '' },
              })}
            >
              <XCircle size={16} color="#ef4444" />
              <Text className="text-sm font-medium text-destructive">
                {v_8d41d7('myGifti.detail.cancelRequest')}
              </Text>
            </Pressable>
          )
        )}

        {}
        <View className="bg-card rounded-xl border border-border p-4">
          <View className="flex-row justify-between items-start">
            {v_74f4a3 ? (
              <Image source={{ uri: v_74f4a3 }} className="w-14 h-14 rounded-lg mr-3" resizeMode="contain" />
            ) : null}
            <View className="flex-1">
              <Text className="text-xs text-muted-foreground">{v_3e4b5d.brand}</Text>
              <Text className="text-lg font-bold text-foreground mt-0.5">{v_3e4b5d.name}</Text>
            </View>
            <Badge
              variant={
                v_26dce6
                  ? "default"
                  : v_3e4b5d.status === "expired"
                    ? "destructive"
                    : v_3e4b5d.status === "listed"
                      ? "info"
                      : v_3e4b5d.status === "transferred"
                        ? "success"
                        : "secondary"
              }
              label={v_866c46?.label ?? (v_26dce6 ? v_8d41d7("myGifti.list.statusActive") : v_3e4b5d.status)}
            />
          </View>

          <Separator className="my-3" />

          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{v_8d41d7("myGifti.detail.faceValue")}</Text>
              <Text className="text-sm font-medium text-foreground">
                ₩{v_3e4b5d.face_value?.toLocaleString() ?? "0"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{v_8d41d7("myGifti.detail.expiryDate")}</Text>
              <Text className="text-sm font-medium text-foreground">
                {v_3e4b5d.expiry_date
                  ? v_db3cc6(new Date(v_3e4b5d.expiry_date * 1000), "yyyy.MM.dd")
                  : "-"}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted-foreground">{v_8d41d7("myGifti.detail.transferCount")}</Text>
              <Text className="text-sm font-medium text-foreground">
                {v_8d41d7("myGifti.detail.transferCountFmt").replace("{{count}}", String(v_3e4b5d.transfer_count ?? 0))}
              </Text>
            </View>
          </View>
        </View>

        {}
        {v_26dce6 && (
          <View className="gap-3 mt-4 mb-6">
            <View className="flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 flex-row gap-2 bg-white"
                onPress={() => v_904d46.push(`/(user)/oth-path${v_389afb}/transfer`)}
              >
                <Send size={16} color="#0a0a0a" />
                <Text className="text-sm font-medium text-foreground">{v_8d41d7("myGifti.detail.actionTransfer")}</Text>
              </Button>
            </View>
            <Button
              variant="outline"
              className="flex-row gap-2 bg-white"
              onPress={() => v_904d46.push({ pathname: "/(user)/oth-path", params: { voucherId: v_389afb } })}
            >
              <Store size={16} color="#0a0a0a" />
              <Text className="text-sm font-medium text-foreground">{v_8d41d7("myGifti.detail.sellOnMarketplace")}</Text>
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
