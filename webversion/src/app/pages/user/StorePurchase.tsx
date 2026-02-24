import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Plus, Minus, Gift, DollarSign } from "lucide-react";

interface LocationState {
  type: "package" | "merchant";
  name: string;
  amount: number;
  image?: string;
  category?: string;
}

export function StorePurchase() {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState<LocationState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("=== StorePurchase useEffect ===");
    console.log("location.state:", location.state);

    if (location.state) {
      console.log("Using location.state");
      setState(location.state as LocationState);
      setIsLoading(false);
      return;
    }

    const savedData = sessionStorage.getItem("purchaseData");
    console.log("savedData from sessionStorage:", savedData);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("Parsed data:", parsedData);
        setState(parsedData);

        sessionStorage.removeItem("purchaseData");
      } catch (error) {
        console.error("Failed to parse purchase data:", error);
      }
    }

    setIsLoading(false);
  }, [location.state]);

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<
    "paypal" | "smileypay" | "usdt"
  >("paypal");

  if (isLoading) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto">
          <div className="bg-white border-b p-4 flex items-center mb-4">
            <button onClick={() => navigate("/oth-path")} className="mr-3">
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

  if (!state || !state.name || !state.amount) {
    console.error("Missing state data:", state);
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto">
          <div className="bg-white border-b p-4 flex items-center mb-4">
            <button onClick={() => navigate("/oth-path")} className="mr-3">
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
                  Debug: {JSON.stringify(state)}
                </p>
                <Button
                  onClick={() => navigate("/oth-path")}
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

  console.log("StorePurchase state:", state);

  const totalAmount = state.amount * quantity;
  const totalKRW = totalAmount * 1300;

  const handlePurchase = () => {

    alert(`${paymentMethod.toUpperCase()}로 $${totalAmount} 결제가 완료되었습니다!`);
    navigate("/oth-path");
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
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
                  {state.image ? (
                    <img
                      src={state.image}
                      alt={state.name}
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
                  {state.category && (
                    <p className="text-xs text-gray-500 mb-1">
                      {state.category === "cafe"
                        ? "카페"
                        : state.category === "food"
                          ? "음식점"
                          : state.category === "convenience"
                            ? "편의점"
                            : "패키지"}
                    </p>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {state.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-5 h-5 text-orange-500" />
                    <span className="text-xl font-bold text-gray-900">
                      {state.amount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    ₩{(state.amount * 1300).toLocaleString()}
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
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
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
                      {totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    ₩{totalKRW.toLocaleString()}
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
                    checked={paymentMethod === "paypal"}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value as "paypal" | "smileypay" | "usdt",
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
                    checked={paymentMethod === "smileypay"}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value as "paypal" | "smileypay" | "usdt",
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
                    checked={paymentMethod === "usdt"}
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value as "paypal" | "smileypay" | "usdt",
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

              const paymentData = {
                paymentMethod,
                totalAmount,
                productName: state.name,
                quantity,
              };
              sessionStorage.setItem("paymentData", JSON.stringify(paymentData));
              console.log("Saved payment data to sessionStorage:", paymentData);

              navigate("/oth-path");
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