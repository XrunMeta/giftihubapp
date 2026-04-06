import { v_6bfb72 } from "kaejpgxahknbzlvbkmeagkcew";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_78ceb7, v_d4f1cc } from "mbgbsytfgyr";
import { v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_03e392, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_b06108() {
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
      v_03e392.alert("입력 오류", "올바른 바코드를 입력해주세요.");
      return;
    }
    v_904d46.push({ pathname: "/(merchant)/process", params: { barcode: v_01eca1 } });
    v_afa763("");
  };

  if (!v_d1a6bb?.granted) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
        <Text className="text-lg font-semibold text-foreground mb-4">카메라 권한 필요</Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          바코드 스캔을 위해 카메라 권한이 필요합니다.
        </Text>
        <Button onPress={v_1e66f0}>권한 허용</Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={[]}>
      <ScreenHeader elevated title="바코드 스캔" />

      <View className="flex-1 mx-4 rounded-xl overflow-hidden border border-border">
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{ barcodeTypes: ["code128", "qr"] }}
          onBarcodeScanned={v_a96000}
        />
      </View>

      <View className="px-4 py-4">
        <Text className="text-sm font-medium text-foreground mb-2">직접 입력</Text>
        <View className="flex-row gap-2">
          <Input
            className="flex-1 bg-white"
            placeholder="바코드 번호 입력"
            keyboardType="numeric"
            value={v_01eca1}
            onChangeText={v_afa763}
          />
          <Button onPress={v_df3976}>확인</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
