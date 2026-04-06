import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_03e392, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_a3b24a() {
  const { id: v_389afb } = v_d1a7ac<{ id: string }>();
  const v_904d46 = v_d1d90c();
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_828c47 = () => {
    v_03e392.alert(
      "환불 요청",
      "환불을 요청하시겠습니까? 관리자 승인 후 원결제 수단으로 환불됩니다.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "환불 요청",
          style: "destructive",
          onPress: async () => {
            v_34a50a(true);
            try {
              await v_bc1b24(`/oth-path${v_389afb}/refund`, { method: "POST" });
              v_03e392.alert("완료", "환불 요청이 접수되었습니다.", [
                { text: "확인", onPress: () => v_904d46.back() },
              ]);
            } catch (v_49263d) {
              v_03e392.alert("실패", v_49263d.body?.error || "환불 요청에 실패했습니다.");
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
      <PageHeader title="환불 요청" />
      <View className="flex-1 px-5 mt-4">
        <View className="bg-card rounded-xl border border-border p-4">
          <Text className="text-sm text-foreground leading-5">
            • 환불은 관리자 승인 후 처리됩니다.{"\n"}
            • 원결제 수단으로 환불됩니다.{"\n"}
            • 환불 처리에는 1~3 영업일이 소요됩니다.{"\n"}
            • 양도 또는 일부 사용된 기프티는 환불이 불가합니다.
          </Text>
        </View>

        <Button
          variant="destructive"
          onPress={v_828c47}
          disabled={v_683210}
          className="mt-6"
        >
          {v_683210 ? "요청 중..." : "환불 요청하기"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
