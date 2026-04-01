import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_3094a2, v_19b633, v_39a996, v_03e392 } from "rcmrninabrnb";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";
import * as v_2c8bdd from "refjsvmnhpbvuhzr";
import { v_24c64e, v_dc4a73 } from "wjvlskvsbzsrojdbjsl";
import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_7a943b } from "dxfmfnfvriitbtghyppor";
import { v_338caf, type v_88a3f9 } from "vhkgxwheyyipiczd";
import { v_331c13 } from "uugztyivrmtvweuio";
import { v_9f95ab } from "ztkoagfdprzignsbie";

export default function v_14045c() {
  const { method: v_bfe9b9 } = v_d1a7ac<{ method: string }>();
  const v_904d46 = v_d1d90c();
  const { items: v_4622b9, packageItems: v_5be600, clearCart: v_340590 } = v_7a943b();
  const [v_d308b5, v_5193f8] = v_5ab095<"processing" | "success" | "failed">("processing");
  const [v_f0e6fe, v_d9d94d] = v_5ab095<string>("");

  v_c4deb2(() => {
    v_af9234();
  }, []);

  const v_af9234 = async () => {
    const v_4ccc1a = v_4622b9.length > 0;
    const v_7a2bcb = v_5be600.length > 0;

    if (!v_4ccc1a && !v_7a2bcb) {
      v_03e392.alert("결제 오류", "장바구니가 비어있습니다.");
      v_5193f8("failed");
      return;
    }
    if (!v_bfe9b9) {
      v_03e392.alert("결제 오류", "결제 수단이 선택되지 않았습니다.");
      v_5193f8("failed");
      return;
    }

    try {
      if (v_7a2bcb) {

        const v_e42213 = v_5be600[0];
        const v_247d1d = v_e42213.composition;
        if (!v_247d1d) {
          v_03e392.alert("결제 오류", "구성 정보가 없습니다.");
          v_5193f8("failed");
          return;
        }

        console.log("[payment-process] bundle purchase:", {
          amount: v_e42213.totalBudget,
          currency: v_e42213.currency,
          method: v_bfe9b9,
        });

        const v_8f00b9 = await v_331c13(
          v_247d1d.target_amount,
          v_e42213.currency,
          v_bfe9b9 as v_88a3f9,
          v_247d1d,
        );

        if (v_8f00b9.status === "completed" || v_bfe9b9 === "dev_pay") {
          v_5193f8("success");
          v_340590();
          return;
        }

        if (v_8f00b9.redirect_url) {
          await v_2c8bdd.openBrowserAsync(v_8f00b9.redirect_url);
        }

        v_11cb3d(v_8f00b9.payment_id);
      } else {

        const v_8c0b26 = v_4622b9[0];
        console.log("[payment-process] purchasing:", {
          productId: v_8c0b26.product.id,
          method: v_bfe9b9,
          itemCount: v_4622b9.length,
        });

        const v_8f00b9 = await v_338caf(
          v_8c0b26.product.id,
          v_bfe9b9 as v_88a3f9,
        );

        if (v_8f00b9.status === "completed" || v_bfe9b9 === "dev_pay") {
          v_5193f8("success");
          v_340590();
          return;
        }

        if (v_8f00b9.redirect_url) {
          await v_2c8bdd.openBrowserAsync(v_8f00b9.redirect_url);
        }

        v_11cb3d(v_8f00b9.payment_id);
      }
    } catch (v_49263d) {
      const v_3cfdfc = v_49263d.body?.error || v_49263d.message || "결제를 처리할 수 없습니다.";
      const v_49c6c7 = JSON.stringify(
        { status: v_49263d.status, body: v_49263d.body, message: v_49263d.message },
        null,
        2,
      );
      console.error("[payment-process] error:", v_49c6c7);
      v_d9d94d(v_49c6c7);
      v_03e392.alert("결제 실패", `${v_3cfdfc}\n(status: ${v_49263d.status || "unknown"})`);
      v_5193f8("failed");
    }
  };

  const v_11cb3d = async (v_389afb) => {
    const v_3d627c = 30;
    for (let v_ebec57 = 0; v_ebec57 < v_3d627c; v_ebec57++) {
      try {
        const v_8f00b9 = await v_9f95ab(v_389afb);
        if (v_8f00b9.status === "completed") {
          v_5193f8("success");
          v_340590();
          return;
        }
        if (v_8f00b9.status === "failed" || v_8f00b9.status === "expired") {
          v_5193f8("failed");
          return;
        }
      } catch {

      }
      await new Promise((v_cb35cb) => setTimeout(v_cb35cb, 3000));
    }
    v_5193f8("failed");
  };

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center px-6">
      {v_d308b5 === "processing" && (
        <View className="items-center">
          <ActivityIndicator size="large" color="#CE3630" />
          <Text className="text-lg font-semibold text-foreground mt-4">결제 처리 중...</Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            결제가 완료될 때까지 잠시 기다려주세요.
          </Text>
        </View>
      )}

      {v_d308b5 === "success" && (
        <View className="items-center">
          <CheckCircle size={64} color="#22c55e" />
          <Text className="text-xl font-bold text-foreground mt-4">결제 완료!</Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            기프티가 발급되었습니다.{"\n"}내 기프티에서 확인하세요.
          </Text>
          <Button className="mt-6 w-full" onPress={() => v_904d46.replace("/(user)/oth-path")}>
            내 기프티 보기
          </Button>
        </View>
      )}

      {v_d308b5 === "failed" && (
        <View className="items-center">
          <XCircle size={64} color="#ef4444" />
          <Text className="text-xl font-bold text-foreground mt-4">결제 실패</Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            결제가 완료되지 않았습니다.{"\n"}다시 시도해주세요.
          </Text>
          {v_f0e6fe ? (
            <Text className="text-xs text-red-400 mt-2 text-left font-mono" selectable>
              {v_f0e6fe}
            </Text>
          ) : null}
          <Button className="mt-6 w-full" onPress={() => v_904d46.back()}>
            돌아가기
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
