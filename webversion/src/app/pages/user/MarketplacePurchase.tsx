import { v_5ab095, v_c4deb2 } from "bapkr";
import { v_1a1e9e, v_a04f9c } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_3cd08e, v_8bef26 } from "../../components/ui/radio-group";
import { v_92fe6b } from "../../components/ui/label";
import { v_c71054, v_d84748, v_4013d8, v_27dabc } from "nchqfqoebgwu";
import { v_75ac97, v_aef059, type v_5e360c } from "../../lib/api";

type PaymentMethod = "dev_pay" | "paypal" | "smileypay" | "usdt_trc20";

const v_730aab = [
  { value: "dev_pay", label: "개발페이", description: "즉시 결제 완료 (개발 모드)", devOnly: true },
  { value: "paypal", label: "PayPal", description: "신용/체크카드, PayPal 잔액" },
  { value: "smileypay", label: "SmileyPay", description: "말레이시아 간편결제" },
  { value: "usdt_trc20", label: "USDT (TRC-20)", description: "트론 네트워크 USDT 송금" },
];

export function v_61aaea() {
  const { id: v_389afb } = v_1a1e9e();
  const v_9b57fc = v_a04f9c();
  const [v_a8fb42, v_ce7034] = v_5ab095<v_5e360c | null>(null);
  const [v_36b75f, v_f99445] = v_5ab095(false);
  const [v_bfe9b9, v_f12919] = v_5ab095<PaymentMethod>("paypal");
  const [v_683210, v_34a50a] = v_5ab095(false);
  const [v_5e9bfe, v_3a7d09] = v_5ab095("");

  v_c4deb2(() => {

    const v_5885b8 = sessionStorage.getItem("marketplacePurchaseData");
    if (v_5885b8) {
      try { v_ce7034(JSON.parse(v_5885b8)); } catch {}
    } else if (v_389afb) {
      v_75ac97.getDetail(v_389afb).then((v_d5dda0) => v_ce7034(v_d5dda0.listing)).catch(() => {});
    }

    v_aef059.getDevMode().then((v_cb35cb) => {
      v_f99445(v_cb35cb.dev_mode);
      if (v_cb35cb.dev_mode) v_f12919("dev_pay");
    }).catch(() => {});
  }, [v_389afb]);

  const v_dfaad1 = async () => {
    if (!v_389afb) return;
    v_34a50a(true);
    v_3a7d09("");
    try {
      const v_43c42e = await v_75ac97.purchase(v_389afb, { payment_method: v_bfe9b9 });

      if (v_43c42e.status === "completed" || v_bfe9b9 === "dev_pay") {

        sessionStorage.setItem("marketplacePurchaseResult", JSON.stringify({
          ...v_43c42e,
          listing: v_a8fb42,
        }));
        v_9b57fc(`/oth-path${v_389afb}/complete`);
      } else if (v_43c42e.redirect_url) {

        window.location.href = v_43c42e.redirect_url;
      } else if (v_43c42e.wallet_address) {

        sessionStorage.setItem("marketplaceUsdtData", JSON.stringify(v_43c42e));

        alert(`USDT ${v_43c42e.amount_usdt} 를 ${v_43c42e.wallet_address}로 송금해주세요`);
      }
    } catch (v_9e86fd) {
      v_3a7d09(v_9e86fd instanceof Error ? v_9e86fd.message : "결제에 실패했습니다");
    } finally {
      v_34a50a(false);
    }
  };

  if (!v_a8fb42) {
    return (
      <UserLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
        </div>
      </UserLayout>
    );
  }

  const v_94f48f = v_730aab.filter((v_b6c474) => !v_b6c474.devOnly || v_36b75f);

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">결제</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">{v_a8fb42.brand}</p>
              <h2 className="font-semibold">{v_a8fb42.name}</h2>
              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                <span className="text-sm text-gray-500">결제 금액</span>
                <span className="text-xl font-bold text-orange-600">
                  ${v_a8fb42.selling_price.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                결제 수단
              </h3>
              <RadioGroup value={v_bfe9b9} onValueChange={(v_81e2ef) => v_f12919(v_81e2ef as PaymentMethod)}>
                <div className="space-y-3">
                  {v_94f48f.map((v_68b2be) => (
                    <div key={v_68b2be.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={v_68b2be.value} id={v_68b2be.value} />
                      <Label htmlFor={v_68b2be.value} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{v_68b2be.label}</span>
                          {v_68b2be.devOnly && <Zap className="w-3 h-3 text-blue-500" />}
                        </div>
                        <p className="text-xs text-gray-400">{v_68b2be.description}</p>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {v_5e9bfe && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
              {v_5e9bfe}
            </div>
          )}

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-base"
            onClick={v_dfaad1}
            disabled={v_683210}
          >
            {v_683210 && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            결제하기
          </Button>

          <p className="text-xs text-gray-400 text-center">
            결제 완료 시 기프티 소유권이 즉시 이전됩니다
          </p>
        </div>
      </div>
    </UserLayout>
  );
}
