import { v_1a40c4 } from "qdgvidsewwtecwvcsfolnn";
import { v_15e817, v_7a943b } from "dxfmfnfvriitbtghyppor";
import { v_678659 } from "sjckgizoxjyhghfnkltjj";
import { v_331c13 } from "uugztyivrmtvweuio";
import { v_9f95ab } from "ztkoagfdprzignsbie";
import { v_338caf, type v_88a3f9 } from "vhkgxwheyyipiczd";
import { v_cf763b, v_d1a7ac, v_d1d90c } from "rkmroqyctko";
import * as v_2c8bdd from "refjsvmnhpbvuhzr";
import { v_24c64e, v_dc4a73 } from "wjvlskvsbzsrojdbjsl";
import v_a3453e, { v_c4deb2, v_e662ae, v_5ab095 } from "bapkr";
import { v_39a996, v_19b633, v_3094a2 } from "rcmrninabrnb";
import { v_acfdec } from "vvfgtwbmdpbnvhtfbtbgudicfmpscw";

import { v_2bd2c5 } from "hlsbiqaseofpjggplzcrgbjcth";
export default function v_14045c() {
  const { t: v_8d41d7 } = v_678659();
  const v_5c50c0 = v_2bd2c5();
  const { method: v_bfe9b9, currency: v_a832b3, nonce: v_0b0bec } = v_d1a7ac<{ method: string; currency?: string; nonce?: string }>();
  const v_904d46 = v_d1d90c();
  const { items: v_4622b9, packageItems: v_5be600, clearByCurrency: v_e3ba8c, clearCart: v_340590, selectedItemIds: v_6e7be8, selectedPackageIds: v_942cd6, removeFromCart: v_af112b, removePackage: v_dbcdf7 } = v_7a943b();
  const [v_d308b5, v_5193f8] = v_5ab095<"processing" | "success" | "failed">("processing");
  const [v_f0e6fe, v_d9d94d] = v_5ab095<string>("");
  const v_fab846 = v_e662ae<string | null>(null);

  const v_6e2788 = v_a832b3 || "KRW";

  v_c4deb2(() => {
    const v_b24339 = `${v_bfe9b9}|${v_a832b3}|${v_0b0bec ?? "none"}`;
    if (v_fab846.current === v_b24339) {
      console.log(`[pay] skip duplicate key=${v_b24339}`);
      return;
    }
    v_fab846.current = v_b24339;
    console.log(`[pay] trigger key=${v_b24339} itemsLen=${v_4622b9.length} pkgLen=${v_5be600.length}`);
    v_5193f8("processing");
    v_d9d94d("");
    v_af9234();
  }, [v_bfe9b9, v_a832b3, v_0b0bec]);

  const v_af9234 = async () => {
    if (!v_bfe9b9) {
      v_5c50c0(v_8d41d7("userPaymentProcess.errNoMethodTitle"), v_8d41d7("userPaymentProcess.errNoMethodBody"));
      v_5193f8("failed");
      return;
    }

    const v_7d7d61 = v_5be600.filter(
      (v_e2a85c) => v_e2a85c.currency === v_6e2788 && v_e2a85c.id && v_942cd6.has(v_e2a85c.id),
    );
    const v_a3d7a5 = v_4622b9.filter(
      (v_ebec57) => v_15e817(v_ebec57) === v_6e2788 && v_ebec57.cartId && v_6e7be8.has(v_ebec57.cartId),
    );

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
      v_5c50c0(
        v_8d41d7("userPaymentProcess.errNoMethodTitle"),
        v_8d41d7("userPaymentProcess.errNoItems")
          .replace("{{currency}}", v_6e2788)
          .replace("{{cartCount}}", String(v_4622b9.length)),
      );
      v_5193f8("failed");
      return;
    }

    try {
      console.log(`[pay] START loop pkgs=${v_7d7d61.length} items=${v_a3d7a5.length}`);

      for (let v_66d3ef = 0; v_66d3ef < v_7d7d61.length; v_66d3ef++) {
        const v_e42213 = v_7d7d61[v_66d3ef];
        console.log(`[pay] pkg[${v_66d3ef}] cur=${v_e42213.currency} amt=${v_e42213.composition?.target_amount}`);
        const v_247d1d = v_e42213.composition;
        if (!v_247d1d) {
          console.error(`[pay] pkg[${v_66d3ef}] NO COMPOSITION`);
          v_5c50c0(v_8d41d7("userPaymentProcess.errNoMethodTitle"), v_8d41d7("userPaymentProcess.errNoComposition"));
          v_5193f8("failed");
          return;
        }

        console.log(`[pay] pkg[${v_66d3ef}] calling purchaseBundle...`);
        const v_8f00b9 = await v_331c13(
          v_247d1d.target_amount,
          v_e42213.currency,
          v_bfe9b9 as v_88a3f9,
          v_247d1d,
        );
        console.log(`[pay] pkg[${v_66d3ef}] bundleRes=${JSON.stringify({ status: v_8f00b9.status, payment_id: v_8f00b9.payment_id, redirect: !!v_8f00b9.redirect_url })}`);

        if (v_8f00b9.status === "completed" || v_bfe9b9 === "dev_pay") {
          console.log(`[pay] pkg[${v_66d3ef}] SKIP poll (status=${v_8f00b9.status}, method=${v_bfe9b9})`);
          continue;
        }

        if (v_8f00b9.redirect_url) {
          console.log(`[pay] pkg[${v_66d3ef}] opening redirect`);
          await v_2c8bdd.openBrowserAsync(v_8f00b9.redirect_url);
        }

        const v_0ba044 = await v_64ed55(v_8f00b9.payment_id);
        console.log(`[pay] pkg[${v_66d3ef}] polled=${v_0ba044}`);
        if (!v_0ba044) {
          v_5c50c0(v_8d41d7("userPaymentProcess.pollFailTitle"), v_8d41d7("userPaymentProcess.pollFailBody"));
          v_5193f8("failed");
          return;
        }
      }

      for (let v_2099d2 = 0; v_2099d2 < v_a3d7a5.length; v_2099d2++) {
        const v_8c0b26 = v_a3d7a5[v_2099d2];
        console.log(`[pay] item[${v_2099d2}] id=${v_8c0b26.product.id} name=${v_8c0b26.product.name} flexAmt=${v_8c0b26.flexibleAmount}`);
        console.log(`[pay] item[${v_2099d2}] calling purchaseProduct...`);
        const v_8f00b9 = await v_338caf(v_8c0b26.product.id, v_bfe9b9 as v_88a3f9, v_8c0b26.flexibleAmount);
        console.log(`[pay] item[${v_2099d2}] res=${JSON.stringify({ status: v_8f00b9.status, payment_id: v_8f00b9.payment_id, redirect: !!v_8f00b9.redirect_url })}`);
        if (v_8f00b9.status !== "completed" && v_bfe9b9 !== "dev_pay") {
          if (v_8f00b9.redirect_url) {
            console.log(`[pay] item[${v_2099d2}] opening redirect`);
            await v_2c8bdd.openBrowserAsync(v_8f00b9.redirect_url);
          }
          const v_0ba044 = await v_64ed55(v_8f00b9.payment_id);
          console.log(`[pay] item[${v_2099d2}] polled=${v_0ba044}`);
          if (!v_0ba044) {
            v_5193f8("failed");
            return;
          }
        } else {
          console.log(`[pay] item[${v_2099d2}] SKIP poll (status=${v_8f00b9.status}, method=${v_bfe9b9})`);
        }
      }

      console.log(`[pay] LOOP DONE — removing purchased items only, setting success`);

      for (const v_23805a of v_a3d7a5) {
        if (v_23805a.cartId) v_af112b(v_23805a.cartId);
      }
      for (const v_e42213 of v_7d7d61) {
        const v_e86ad8 = v_5be600.findIndex((v_e2a85c) => v_e2a85c.id === v_e42213.id);
        if (v_e86ad8 >= 0) v_dbcdf7(v_e86ad8);
      }
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
      v_5c50c0(
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
    let v_2bbf20 = 0;
    for (let v_ebec57 = 0; v_ebec57 < v_3d627c; v_ebec57++) {
      try {
        const v_8f00b9 = await v_9f95ab(v_389afb);
        console.log(`[payment-process] poll #${v_ebec57 + 1} payment_id=${v_389afb} status=${v_8f00b9.status}`);
        v_2bbf20 = 0;
        if (v_8f00b9.status === "completed") return true;
        if (v_8f00b9.status === "failed" || v_8f00b9.status === "expired") return false;
      } catch (v_49263d) {
        v_2bbf20 += 1;
        const v_34d5e3 = {
          attempt: v_ebec57 + 1,
          payment_id: v_389afb,
          status: v_49263d?.status,
          body: v_49263d?.body,
          message: v_49263d?.message,
        };
        console.error("[payment-process] poll error:", JSON.stringify(v_34d5e3));
        v_d9d94d(JSON.stringify(v_34d5e3, null, 2));
        if (v_2bbf20 >= 3) {
          v_5c50c0(
            v_8d41d7("userPaymentProcess.pollFailTitle"),
            `poll error x${v_2bbf20}\nstatus=${v_49263d?.status}\n${v_49263d?.message ?? ""}`,
          );
          return false;
        }
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
