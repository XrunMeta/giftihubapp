import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_7a943b } from "dxfmfnfvriitbtghyppor";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_331c13 } from "uugztyivrmtvweuio";
import { v_9f95ab } from "ztkoagfdprzignsbie";
import { v_338caf, type v_88a3f9 } from "vhkgxwheyyipiczd";
import { v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import * as v_2c8bdd from "refjsvmnhpbvuhzr";
import { v_24c64e, v_dc4a73 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_5ab095 } from "bapkr";
import { v_39a996, v_03e392, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

export default function v_14045c() {
  const { t: v_8d41d7 } = v_678659();
  const { method: v_bfe9b9, currency: v_a832b3 } = v_d1a7ac<{ method: string; currency?: string }>();
  const v_904d46 = v_d1d90c();
  const { items: v_4622b9, packageItems: v_5be600, clearByCurrency: v_e3ba8c, clearCart: v_340590 } = v_7a943b();
  const [v_d308b5, v_5193f8] = v_5ab095<"processing" | "success" | "failed">("processing");
  const [v_f0e6fe, v_d9d94d] = v_5ab095<string>("");

  const v_6e2788 = v_a832b3 || "KRW";

  v_c4deb2(() => {
    v_5193f8("processing");
    v_d9d94d("");
    v_af9234();
  }, [v_bfe9b9, v_a832b3]);

  const v_af9234 = async () => {
    if (!v_bfe9b9) {
      v_03e392.alert(v_8d41d7("userPaymentProcess.errNoMethodTitle"), v_8d41d7("userPaymentProcess.errNoMethodBody"));
      v_5193f8("failed");
      return;
    }

    const v_7d7d61 = v_5be600.filter((v_e2a85c) => v_e2a85c.currency === v_6e2788);
    const v_a3d7a5 = v_4622b9.filter((v_ebec57) => {
      if (v_ebec57.flexibleAmount) return (v_ebec57.product.flexible_currency ?? "KRW") === v_6e2788;
      return v_6e2788 === "KRW";
    });

    console.log("[payment-process] debug:", JSON.stringify({
      targetCurrency: v_6e2788,
      method: v_bfe9b9,
      totalItems: v_4622b9.length,
      itemDetails: v_4622b9.map(v_ebec57 => ({
        id: v_ebec57.product.id,
        flexAmt: v_ebec57.flexibleAmount,
        flexCur: v_ebec57.product.flexible_currency,
        productType: v_ebec57.product.product_type,
      })),
      targetItemsCount: v_a3d7a5.length,
      targetPackagesCount: v_7d7d61.length,
    }));

    if (!v_7d7d61.length && !v_a3d7a5.length) {
      v_03e392.alert(
        v_8d41d7("userPaymentProcess.errNoMethodTitle"),
        v_8d41d7("userPaymentProcess.errNoItems")
          .replace("{{currency}}", v_6e2788)
          .replace("{{cartCount}}", String(v_4622b9.length)),
      );
      v_5193f8("failed");
      return;
    }

    try {

      for (const v_e42213 of v_7d7d61) {
        const v_247d1d = v_e42213.composition;
        if (!v_247d1d) {
          v_03e392.alert(v_8d41d7("userPaymentProcess.errNoMethodTitle"), v_8d41d7("userPaymentProcess.errNoComposition"));
          v_5193f8("failed");
          return;
        }

        const v_8f00b9 = await v_331c13(
          v_247d1d.target_amount,
          v_e42213.currency,
          v_bfe9b9 as v_88a3f9,
          v_247d1d,
        );

        if (v_8f00b9.status === "completed" || v_bfe9b9 === "dev_pay") {
          continue;
        }

        if (v_8f00b9.redirect_url) {
          await v_2c8bdd.openBrowserAsync(v_8f00b9.redirect_url);
        }

        const v_0ba044 = await v_64ed55(v_8f00b9.payment_id);
        if (!v_0ba044) {
          v_03e392.alert(v_8d41d7("userPaymentProcess.pollFailTitle"), v_8d41d7("userPaymentProcess.pollFailBody"));
          v_5193f8("failed");
          return;
        }
      }

      for (const v_8c0b26 of v_a3d7a5) {
        const v_8f00b9 = await v_338caf(v_8c0b26.product.id, v_bfe9b9 as v_88a3f9, v_8c0b26.flexibleAmount);
        if (v_8f00b9.status !== "completed" && v_bfe9b9 !== "dev_pay") {
          if (v_8f00b9.redirect_url) await v_2c8bdd.openBrowserAsync(v_8f00b9.redirect_url);
          const v_0ba044 = await v_64ed55(v_8f00b9.payment_id);
          if (!v_0ba044) {
            v_5193f8("failed");
            return;
          }
        }
      }

      v_e3ba8c(v_6e2788);
      v_5193f8("success");
    } catch (v_49263d) {
      const v_3cfdfc = v_49263d.body?.error || v_49263d.message || v_8d41d7("userPaymentProcess.failDetailFallback");
      const v_49c6c7 = JSON.stringify(
        { status: v_49263d.status, body: v_49263d.body, message: v_49263d.message },
        null,
        2,
      );
      console.error("[payment-process] error:", v_49c6c7);
      v_d9d94d(v_49c6c7);
      v_03e392.alert(
        v_8d41d7("userPaymentProcess.failTitle"),
        v_8d41d7("userPaymentProcess.failBody")
          .replace("{{detail}}", v_3cfdfc)
          .replace("{{status}}", String(v_49263d.status ?? "unknown")),
      );
      v_5193f8("failed");
    }
  };

  const v_64ed55 = async (v_389afb): Promise<boolean> => {
    const v_3d627c = 30;
    for (let v_ebec57 = 0; v_ebec57 < v_3d627c; v_ebec57++) {
      try {
        const v_8f00b9 = await v_9f95ab(v_389afb);
        if (v_8f00b9.status === "completed") return true;
        if (v_8f00b9.status === "failed" || v_8f00b9.status === "expired") return false;
      } catch {

      }
      await new Promise((v_cb35cb) => setTimeout(v_cb35cb, 3000));
    }
    return false;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center px-6">
      {v_d308b5 === "processing" && (
        <View className="items-center">
          <ActivityIndicator size="large" color="#CE3630" />
          <Text className="text-lg font-semibold text-foreground mt-4">
            {v_8d41d7("userPaymentProcess.processing").replace("{{currency}}", v_6e2788)}
          </Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            {v_8d41d7("userPaymentProcess.processingHint")}
          </Text>
        </View>
      )}

      {v_d308b5 === "success" && (() => {

        const v_916658 = v_5be600.filter((v_e2a85c) => v_e2a85c.currency !== v_6e2788);
        const v_6bbe19 = v_916658.length > 0 || (v_6e2788 !== "KRW" && v_4622b9.length > 0);
        return (
          <View className="items-center">
            <CheckCircle size={64} color="#22c55e" />
            <Text className="text-xl font-bold text-foreground mt-4">
              {v_8d41d7("userPaymentProcess.successTitle").replace("{{currency}}", v_6e2788)}
            </Text>
            <Text className="text-sm text-muted-foreground mt-2 text-center">
              {v_8d41d7("userPaymentProcess.successIssued")}
              {v_6bbe19
                ? `\n${v_8d41d7("userPaymentProcess.successMoreInCart")}`
                : `\n${v_8d41d7("userPaymentProcess.successCheckMy")}`}
            </Text>
            {v_6bbe19 ? (
              <Button className="mt-6 w-full" onPress={() => v_904d46.replace("/(user)/cart")}>
                {v_8d41d7("userPaymentProcess.backToCart")}
              </Button>
            ) : (
              <Button className="mt-6 w-full" onPress={() => v_904d46.replace("/(user)/oth-path")}>
                {v_8d41d7("userPaymentProcess.viewMyGifti")}
              </Button>
            )}
          </View>
        );
      })()}

      {v_d308b5 === "failed" && (
        <View className="items-center">
          <XCircle size={64} color="#ef4444" />
          <Text className="text-xl font-bold text-foreground mt-4">{v_8d41d7("userPaymentProcess.failedTitle")}</Text>
          <Text className="text-sm text-muted-foreground mt-2 text-center">
            {v_8d41d7("userPaymentProcess.failedBody")}
          </Text>
          {v_f0e6fe ? (
            <Text className="text-xs text-red-400 mt-2 text-left font-mono" selectable>
              {v_f0e6fe}
            </Text>
          ) : null}
          <Button className="mt-6 w-full" onPress={() => v_904d46.back()}>
            {v_8d41d7("userPaymentProcess.goBack")}
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}
