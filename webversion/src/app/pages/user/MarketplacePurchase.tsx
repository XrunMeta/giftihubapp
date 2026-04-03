import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { ArrowLeft, CreditCard, Loader2, Zap } from "lucide-react";
import { marketplaceApi, systemApi, type MarketplaceDetail } from "../../lib/api";

type PaymentMethod = "dev_pay" | "paypal" | "smileypay" | "usdt_trc20";

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; description: string; devOnly?: boolean }[] = [
  { value: "dev_pay", label: "개발페이", description: "즉시 결제 완료 (개발 모드)", devOnly: true },
  { value: "paypal", label: "PayPal", description: "신용/체크카드, PayPal 잔액" },
  { value: "smileypay", label: "SmileyPay", description: "말레이시아 간편결제" },
  { value: "usdt_trc20", label: "USDT (TRC-20)", description: "트론 네트워크 USDT 송금" },
];

export function MarketplacePurchase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<MarketplaceDetail | null>(null);
  const [devMode, setDevMode] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("paypal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    const stored = sessionStorage.getItem("marketplacePurchaseData");
    if (stored) {
      try { setListing(JSON.parse(stored)); } catch {}
    } else if (id) {
      marketplaceApi.getDetail(id).then((d) => setListing(d.listing)).catch(() => {});
    }

    systemApi.getDevMode().then((r) => {
      setDevMode(r.dev_mode);
      if (r.dev_mode) setMethod("dev_pay");
    }).catch(() => {});
  }, [id]);

  const handlePurchase = async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const result = await marketplaceApi.purchase(id, { payment_method: method });

      if (result.status === "completed" || method === "dev_pay") {

        sessionStorage.setItem("marketplacePurchaseResult", JSON.stringify({
          ...result,
          listing,
        }));
        navigate(`/oth-path${id}/complete`);
      } else if (result.redirect_url) {

        window.location.href = result.redirect_url;
      } else if (result.wallet_address) {

        sessionStorage.setItem("marketplaceUsdtData", JSON.stringify(result));

        alert(`USDT ${result.amount_usdt} 를 ${result.wallet_address}로 송금해주세요`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "결제에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  if (!listing) {
    return (
      <UserLayout>
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
        </div>
      </UserLayout>
    );
  }

  const availableOptions = PAYMENT_OPTIONS.filter((o) => !o.devOnly || devMode);

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">결제</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">{listing.brand}</p>
              <h2 className="font-semibold">{listing.name}</h2>
              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                <span className="text-sm text-gray-500">결제 금액</span>
                <span className="text-xl font-bold text-orange-600">
                  ${listing.selling_price.toLocaleString()}
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
              <RadioGroup value={method} onValueChange={(v) => setMethod(v as PaymentMethod)}>
                <div className="space-y-3">
                  {availableOptions.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={opt.value} id={opt.value} />
                      <Label htmlFor={opt.value} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{opt.label}</span>
                          {opt.devOnly && <Zap className="w-3 h-3 text-blue-500" />}
                        </div>
                        <p className="text-xs text-gray-400">{opt.description}</p>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
              {error}
            </div>
          )}

          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-base"
            onClick={handlePurchase}
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
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
