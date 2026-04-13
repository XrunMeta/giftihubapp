import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_78ceb7, v_d4f1cc } from "mbgbsytfgyr";
import { v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
export default function v_b06108() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const v_904d46 = v_d1d90c();
  const [v_d1a6bb, v_1e66f0] = v_d4f1cc();
  const [v_01eca1, v_afa763] = v_5ab095("");
  const [v_a352a2, v_34a852] = v_5ab095(false);

  const v_a96000 = ({ data: v_9390e8 }: { data: string }) => {
    if (v_a352a2) return;
    v_34a852(true);
    v_904d46.push({ pathname: "/(merchant)/process", params: { barcode: v_9390e8 } });
    setTimeout(() => v_34a852(false), 2000);
  };

  const v_df3976 = () => {
    if (v_01eca1.length < 8) {
      v_5c50c0(v_8d41d7("merchant.scan.alertBarcodeTitle"), v_8d41d7("merchant.scan.alertBarcodeBody"));
      return;
    }
    v_904d46.push({ pathname: "/(merchant)/process", params: { barcode: v_01eca1 } });
    v_afa763("");
  };

  if (!v_d1a6bb?.granted) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6" edges={["top"]}>
        <Text className="text-lg font-semibold text-foreground mb-4">{v_8d41d7("merchant.scan.cameraTitle")}</Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          {v_8d41d7("merchant.scan.cameraBody")}
        </Text>
        <Button onPress={v_1e66f0}>{v_8d41d7("merchant.scan.allowCamera")}</Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title={v_8d41d7("merchant.scan.title")} />

      <View className="flex-1 mx-4 rounded-xl overflow-hidden border border-border">
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{ barcodeTypes: ["code128", "qr"] }}
          onBarcodeScanned={v_a96000}
        />
      </View>

      <View className="px-4 pt-3 py-4">
        <Text className="text-sm font-medium text-foreground mb-2">{v_8d41d7("merchant.scan.manualEntry")}</Text>
        <View className="flex-row gap-2">
          <Input
            className="flex-1 bg-white"
            placeholder={v_8d41d7("merchant.scan.barcodePlaceholder")}
            keyboardType="numeric"
            value={v_01eca1}
            onChangeText={v_afa763}
          />
          <Button onPress={v_df3976}>{v_8d41d7("merchant.scan.confirm")}</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
