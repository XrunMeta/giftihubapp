import { v_5ab095, v_c4deb2 } from "bapkr";
import { v_a04f9c, v_be9b94 } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_1a40c4 } from "../../components/ui/button";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_c71054, v_20f6a6, v_4013d8 } from "nchqfqoebgwu";

interface PaymentState {
  paymentMethod: string;
  totalAmount: number;
  productName: string;
  quantity: number;
}

export function v_53ef45() {
  const v_9b57fc = v_a04f9c();
  const v_a55f0b = v_be9b94();

  const [v_b6e533, v_1fa668] = v_5ab095<PaymentState | null>(null);
  const [v_cd31a8, v_deef62] = v_5ab095(true);
  const [v_1be683, v_fb20f7] = v_5ab095(900); 
  const [v_a63fde, v_6306c3] = v_5ab095(0);

  v_c4deb2(() => {
    console.log("=== PaymentProcess useEffect ===");
    console.log("location.state:", v_a55f0b.state);

    if (v_a55f0b.state) {
      console.log("Using location.state");
      v_1fa668(v_a55f0b.state as PaymentState);
      v_deef62(false);
      return;
    }

    const v_f1d91d = sessionStorage.getItem("paymentData");
    console.log("savedData from sessionStorage:", v_f1d91d);

    if (v_f1d91d) {
      try {
        const v_75d360 = JSON.parse(v_f1d91d);
        console.log("Parsed payment data:", v_75d360);
        v_1fa668(v_75d360);

        sessionStorage.removeItem("paymentData");
      } catch (v_5e9bfe) {
        console.error("Failed to parse payment data:", v_5e9bfe);
      }
    }

    v_deef62(false);
  }, [v_a55f0b.state]);

  v_c4deb2(() => {
    if (!v_b6e533) return;

    const v_cb36b1 = setInterval(() => {
      v_fb20f7((v_ba2215) => {
        if (v_ba2215 <= 0) {
          clearInterval(v_cb36b1);
          return 0;
        }
        return v_ba2215 - 1;
      });
    }, 1000);

    const v_1d2b7e = setInterval(() => {
      v_6306c3((v_ba2215) => {
        if (v_ba2215 >= 60) {
          clearInterval(v_1d2b7e);
          return v_ba2215;
        }
        return v_ba2215 + 1;
      });
    }, 200);

    return () => {
      clearInterval(v_cb36b1);
      clearInterval(v_1d2b7e);
    };
  }, [v_b6e533]);

  if (v_cd31a8) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto">
          <div className="bg-white border-b p-4 flex items-center">
            <button onClick={() => v_9b57fc(-1)} className="mr-3">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">결제 진행</h1>
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

  if (!v_b6e533 || !v_b6e533.totalAmount) {
    console.error("Missing payment data:", v_b6e533);
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto">
          <div className="bg-white border-b p-4 flex items-center">
            <button onClick={() => v_9b57fc("/oth-path")} className="mr-3">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">결제 진행</h1>
          </div>
          <div className="p-4">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600 mb-4">결제 정보를 불러올 수 없습니다.</p>
                <p className="text-sm text-gray-500 mb-4">
                  구매 페이지에서 다시 시도해주세요.
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

  const v_ef3543 = Math.floor(v_1be683 / 60);
  const v_ec1a55 = v_1be683 % 60;

  const v_5ca23e = () => {
    if (confirm("결제를 취소하시겠습니까?")) {
      v_9b57fc("/oth-path");
    }
  };

  const v_fec474 = () => {
    switch (v_b6e533.paymentMethod) {
      case "paypal":
        return "PayPal";
      case "smileypay":
        return "SmileyPay";
      case "usdt":
        return "USDT";
      default:
        return "PayPal";
    }
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto min-h-screen bg-gray-50">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">결제 진행</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💳</span>
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  {v_fec474()} 결제 페이지로
                </h2>
                <p className="text-gray-600 mb-4">이동합니다</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-1">결제 금액</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${v_b6e533.totalAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ₩{(v_b6e533.totalAmount * 1300).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />
                <h3 className="font-semibold">결제 승인 대기 중...</h3>
              </div>

              {}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-orange-600 h-full transition-all duration-200 ease-out"
                    style={{ width: `${v_a63fde}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {v_fec474()} 결제 확인 중...
                </p>
              </div>

              {}
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">상품명</span>
                  <span className="font-medium">{v_b6e533.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">수량</span>
                  <span className="font-medium">{v_b6e533.quantity}개</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">남은 시간</span>
                </div>
                <span className="text-2xl font-bold text-orange-600">
                  {String(v_ef3543).padStart(2, "0")}:
                  {String(v_ec1a55).padStart(2, "0")}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                시간 내에 결제를 완료해주세요
              </p>
            </CardContent>
          </Card>

          {}
          <Button
            onClick={v_5ca23e}
            variant="outline"
            className="w-full h-12 text-base border-2 border-gray-300 hover:bg-gray-50"
          >
            결제 취소
          </Button>

          {}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              💡 {v_fec474()} 창에서 결제를 완료하시면 자동으로
              처리됩니다.
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}