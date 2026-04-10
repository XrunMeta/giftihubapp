import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_be1e41 } from "hfombjcvpanldq";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_24c64e, v_dc4a73 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_39a996, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
export default function v_96d53d() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const { barcode: v_e4a44d } = v_d1a7ac<{ barcode: string }>();
  const v_904d46 = v_d1d90c();
  const [v_d308b5, v_5193f8] = v_5ab095<"validating" | "valid" | "invalid">("validating");
  const [v_ad1545, v_f5b829] = v_5ab095<any>(null);
  const [v_976e82, v_a7e4fc] = v_5ab095<string>("");

  v_c4deb2(() => {
    if (v_e4a44d) v_3181cc();
  }, [v_e4a44d]);

  const v_3181cc = async () => {
    try {
      const v_8f00b9 = await v_bc1b24<any>("/oth-path", {
        method: "POST",
        body: JSON.stringify({ barcode: v_e4a44d }),
      });
      if (!v_8f00b9.valid) {
        v_a7e4fc(v_8f00b9.error || v_8d41d7("merchant.process.unknownError"));
        v_5193f8("invalid");
        return;
      }
      v_f5b829(v_8f00b9);
      v_5193f8("valid");
    } catch (v_49263d) {
      const v_badeaf = v_49263d.body?.error || v_49263d.message || v_8d41d7("merchant.process.serverError");
      v_a7e4fc(`[${v_49263d.status || "?"}] ${v_badeaf}`);
      v_5193f8("invalid");
    }
  };

  const v_9fd074 = async () => {
    try {
      await v_bc1b24("/oth-path", {
        method: "POST",
        body: JSON.stringify({ barcode: v_e4a44d }),
      });
      v_904d46.replace("/(merchant)/process-complete");
    } catch (v_49263d) {
      v_5c50c0(v_8d41d7("merchant.process.failTitle"), v_49263d.body?.error || v_8d41d7("merchant.process.failBody"));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <PageHeader title={v_8d41d7("merchant.process.title")} />
      <View className="flex-1 items-center justify-center px-6">
        {v_d308b5 === "validating" && (
          <>
            <ActivityIndicator size="large" color="#CE3630" />
            <Text className="text-lg font-semibold text-foreground mt-4">{v_8d41d7("merchant.process.checking")}</Text>
          </>
        )}

        {v_d308b5 === "valid" && v_ad1545 && (
          <View className="items-center w-full">
            <CheckCircle size={64} color="#22c55e" />
            <Text className="text-xl font-bold text-foreground mt-4">{v_8d41d7("merchant.process.validTitle")}</Text>
            <View className="bg-card rounded-xl border border-border p-4 mt-4 w-full">
              <Text className="text-sm text-muted-foreground">{v_ad1545.brand}</Text>
              <Text className="text-base font-semibold text-foreground">{v_ad1545.name}</Text>
              <Text className="text-lg font-bold text-primary mt-2">
                {v_be1e41(v_ad1545.face_value)}
              </Text>
            </View>
            <Button className="w-full mt-6" onPress={v_9fd074}>
              {v_8d41d7("merchant.process.useNow")}
            </Button>
            <Button variant="outline" className="w-full mt-2" onPress={() => v_904d46.back()}>
              {v_8d41d7("merchant.process.cancel")}
            </Button>
          </View>
        )}

        {v_d308b5 === "invalid" && (
          <View className="items-center">
            <XCircle size={64} color="#ef4444" />
            <Text className="text-xl font-bold text-foreground mt-4">{v_8d41d7("merchant.process.invalidTitle")}</Text>
            <Text className="text-sm text-muted-foreground mt-2">
              {v_976e82 || v_8d41d7("merchant.process.scanAgain")}
            </Text>
            <Button className="mt-6" onPress={() => v_904d46.back()}>
              {v_8d41d7("merchant.process.goBack")}
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
