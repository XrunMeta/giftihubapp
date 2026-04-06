import { v_258c1c } from "dkpdpdecefocsdaaoqazekt";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_1b353f } from "ymbgtfrroootgjefkrxgp";
import { v_bc1b24 } from "tlrvzsbmctdavs";
import { v_d1d90c } from "rkmroqyctko";
import v_a3453e, { v_5ab095 } from "bapkr";
import { v_03e392, v_122070, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

interface WithdrawResponse {
  ok: boolean;
  tx_hash?: string;
  estimated_time?: string;
}

export default function v_df3264() {
  const v_904d46 = v_d1d90c();
  const [v_64d549, v_5ed714] = v_5ab095("");
  const [v_f63e09, v_1cbe59] = v_5ab095("");
  const [v_683210, v_34a50a] = v_5ab095(false);

  const v_9bd356 = (v_33c3a8) =>
    /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(v_33c3a8.trim());

  const v_d063db = async () => {
    if (!v_64d549.trim() || !v_f63e09.trim()) {
      v_03e392.alert("입력 오류", "지갑 주소와 금액을 모두 입력해주세요.");
      return;
    }
    if (!v_9bd356(v_64d549)) {
      v_03e392.alert("입력 오류", "올바른 TRC-20 지갑 주소를 입력해주세요.");
      return;
    }
    const v_844935 = parseFloat(v_f63e09);
    if (isNaN(v_844935) || v_844935 <= 0) {
      v_03e392.alert("입력 오류", "올바른 금액을 입력해주세요.");
      return;
    }

    v_03e392.alert(
      "출금 확인",
      `${v_844935} USDT를\n${v_64d549.substring(0, 8)}...${v_64d549.substring(v_64d549.length - 6)}\n으로 출금하시겠습니까?`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "출금하기",
          style: "destructive",
          onPress: async () => {
            v_34a50a(true);
            try {
              const v_8f00b9 = await v_bc1b24<WithdrawResponse>(
                "/oth-path",
                {
                  method: "POST",
                  body: JSON.stringify({
                    wallet_address: v_64d549.trim(),
                    amount: v_844935,
                    network: "TRC-20",
                  }),
                },
              );
              v_03e392.alert(
                "출금 요청 완료",
                `출금이 요청되었습니다.\n${v_8f00b9.estimated_time ? `예상 소요시간: ${v_8f00b9.estimated_time}` : "처리까지 시간이 걸릴 수 있습니다."}`,
                [{ text: "확인", onPress: () => v_904d46.back() }],
              );
            } catch (v_49263d) {
              v_03e392.alert(
                "출금 실패",
                v_49263d.body?.error || "다시 시도해주세요.",
              );
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
      <PageHeader title="USDT 출금" />
      <ScrollView className="flex-1 px-6">
        <View className="bg-card border border-border rounded-xl p-4 mt-4">
          <Text className="text-xs text-muted-foreground">출금 네트워크</Text>
          <Text className="text-base font-semibold text-foreground mt-1">
            TRON (TRC-20)
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            TRC-20 지갑 주소
          </Text>
          <Input
            placeholder="T로 시작하는 34자리 주소"
            value={v_64d549}
            onChangeText={v_5ed714}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium text-foreground mb-1.5">
            출금 금액 (USDT)
          </Text>
          <Input
            placeholder="0.00"
            value={v_f63e09}
            onChangeText={v_1cbe59}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6">
          <Text className="text-sm font-medium text-amber-600">⚠️ 주의사항</Text>
          <Text className="text-xs text-muted-foreground mt-1">
            • 반드시 TRC-20 네트워크 주소를 입력해주세요.{"\n"}
            • 잘못된 주소로 전송 시 복구가 불가합니다.{"\n"}
            • 출금 처리에 최대 24시간이 소요될 수 있습니다.{"\n"}
            • 최소 출금 금액: 10 USDT
          </Text>
        </View>

        <Button
          onPress={v_d063db}
          disabled={v_683210 || !v_64d549.trim() || !v_f63e09.trim()}
          className="mt-8"
        >
          {v_683210 ? "처리 중..." : "출금 요청"}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
