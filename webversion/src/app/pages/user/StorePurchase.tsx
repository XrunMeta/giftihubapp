import { v_5ab095, v_c4deb2 } from "bapkr";
import { v_a04f9c, v_be9b94 } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_1a40c4 } from "../../components/ui/button";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_c71054, v_a07c02, v_3b9c43, v_84fd28, v_aa3f8f } from "nchqfqoebgwu";

interface LocationState {
  type: "package" | "merchant";
  name: string;
  amount: number;
  image?: string;
  category?: string;
}

export function v_715b9e() {
  const v_9b57fc = v_a04f9c();
  const v_a55f0b = v_be9b94();

  const [v_b6e533, v_1fa668] = v_5ab095<LocationState | null>(null);
  const [v_cd31a8, v_deef62] = v_5ab095(true);

  v_c4deb2(() => {
    console.log("=== StorePurchase useEffect ===");
    console.log("location.state:", v_a55f0b.state);

    if (v_a55f0b.state) {
      console.log("Using location.state");
      v_1fa668(v_a55f0b.state as LocationState);
      v_deef62(false);
      return;
    }

    const v_f1d91d = sessionStorage.getItem("purchaseData");
    console.log("savedData from sessionStorage:", v_f1d91d);

    if (v_f1d91d) {
      try {
        const v_75d360 = JSON.parse(v_f1d91d);
        console.log("Parsed data:", v_75d360);
        v_1fa668(v_75d360);

        sessionStorage.removeItem("purchaseData");
      } catch (v_5e9bfe) {
        console.error("Failed to parse purchase data:", v_5e9bfe);
      }
    }

    v_deef62(false);
  }, [v_a55f0b.state]);

  const [v_ac2689, v_c94a71] = v_5ab095(1);
  const [v_2891ab, v_e76757] = v_5ab095<
    "paypal" | "smileypay" | "usdt"
  >("paypal");

  if (v_cd31a8) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto">
          <div className="bg-white border-b p-4 flex items-center mb-4">
            <button onClick={() => v_9b57fc("/oth-path")} className="mr-3">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">구매하기</h1>
          </div>
          <div className="p-4">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">로딩 중...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </UserLayout>
    );
  }

  if (!v_b6e533 || !v_b6e533.name || !v_b6e533.amount) {
    console.error("Missing state data:", v_b6e533);
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto">
          <div className="bg-white border-b p-4 flex items-center mb-4">
            <button onClick={() => v_9b57fc("/oth-path")} className="mr-3">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">구매하기</h1>
          </div>
          <div className="p-4">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600 mb-4">상품 정보를 불러올 수 없습니다.</p>
                <p className="text-sm text-gray-500 mb-4">
                  스토어 페이지에서 상품을 선택해주세요.
                </p>
                <p className="text-xs text-red-500 mb-4">
                  Debug: {JSON.stringify(v_b6e533)}
                </p>
                <Button
                  onClick={() => v_9b57fc("/oth-path")}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  스토어로 돌아가기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </UserLayout>
    );
  }

  console.log("StorePurchase state:", v_b6e533);

  const v_2c49ad = v_b6e533.amount * v_ac2689;
  const v_1131b8 = v_2c49ad * 1300;

  const v_dfaad1 = () => {

    alert(`${v_2891ab.toUpperCase()}로 $${v_2c49ad} 결제가 완료되었습니다!`);
    v_9b57fc("/oth-path");
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">구매하기</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                {}
                <div className="flex-shrink-0">
                  {v_b6e533.image ? (
                    <img
                      src={v_b6e533.image}
                      alt={v_b6e533.name}
                      className="w-24 h-24 object-cover rounded-md border border-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                      <Gift className="w-10 h-10 text-gray-300" />
                    </div>
                  )}
                </div>

                {}
                <div className="flex-1">
                  {v_b6e533.category && (
                    <p className="text-xs text-gray-500 mb-1">
                      {v_b6e533.category === "cafe"
                        ? "카페"
                        : v_b6e533.category === "food"
                          ? "음식점"
                          : v_b6e533.category === "convenience"
                            ? "편의점"
                            : "패키지"}
                    </p>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {v_b6e533.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-5 h-5 text-orange-500" />
                    <span className="text-xl font-bold text-gray-900">
                      {v_b6e533.amount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    ₩{(v_b6e533.amount * 1300).toLocaleString()}
                  </p>
                </div>
              </div>

              {}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">유효기간</p>
                    <p className="font-medium text-gray-900">180일</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">사용처</p>
                    <p className="font-medium text-gray-900">전체 가맹점</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">양도</p>
                    <p className="font-medium text-gray-900">가능 (3회)</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">환불</p>
                    <p className="font-medium text-orange-600">가능</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">수량</h3>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => v_c94a71(Math.max(1, v_ac2689 - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={v_ac2689 <= 1}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold">{v_ac2689}</span>
                <button
                  onClick={() => v_c94a71(v_ac2689 + 1)}
                  className="w-10 h-10 rounded-full border-2 border-orange-600 bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">총 금액</span>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <DollarSign className="w-5 h-5 text-orange-500" />
                    <span className="text-2xl font-bold text-gray-900">
                      {v_2c49ad.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    ₩{v_1131b8.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">결제 수단</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={v_2891ab === "paypal"}
                    onChange={(v_9e86fd) =>
                      v_e76757(
                        v_9e86fd.target.value as "paypal" | "smileypay" | "usdt",
                      )
                    }
                    className="w-5 h-5 text-orange-600"
                  />
                  <span className="font-medium">PayPal</span>
                </label>

                <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="smileypay"
                    checked={v_2891ab === "smileypay"}
                    onChange={(v_9e86fd) =>
                      v_e76757(
                        v_9e86fd.target.value as "paypal" | "smileypay" | "usdt",
                      )
                    }
                    className="w-5 h-5 text-orange-600"
                  />
                  <span className="font-medium">SmileyPay</span>
                </label>

                <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="usdt"
                    checked={v_2891ab === "usdt"}
                    onChange={(v_9e86fd) =>
                      v_e76757(
                        v_9e86fd.target.value as "paypal" | "smileypay" | "usdt",
                      )
                    }
                    className="w-5 h-5 text-orange-600"
                  />
                  <span className="font-medium">USDT (Cryptocurrency)</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {}
          <Button
            onClick={() => {

              const v_7e41c8 = {
                paymentMethod: v_2891ab,
                totalAmount: v_2c49ad,
                productName: v_b6e533.name,
                quantity: v_ac2689,
              };
              sessionStorage.setItem("paymentData", JSON.stringify(v_7e41c8));
              console.log("Saved payment data to sessionStorage:", v_7e41c8);

              v_9b57fc("/oth-path");
            }}
            className="w-full h-14 text-lg font-semibold bg-orange-600 hover:bg-orange-700"
          >
            결제하기
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}