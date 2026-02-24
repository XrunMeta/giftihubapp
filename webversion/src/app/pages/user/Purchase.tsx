import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { ArrowLeft, CreditCard, Wallet, Bitcoin } from "lucide-react";

export function Purchase() {
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount || 0;
  const [paymentMethod, setPaymentMethod] = useState<string>("paypal");

  const paymentMethods = [
    { id: "paypal", name: "PayPal", icon: CreditCard, color: "blue" },
    { id: "smileypay", name: "SmileyPay", icon: Wallet, color: "purple" },
    { id: "usdt", name: "USDT (Crypto)", icon: Bitcoin, color: "green" },
  ];

  const handlePurchase = () => {

    alert(`결제가 완료되었습니다!\n금액: $${amount.toLocaleString()}\n결제수단: ${paymentMethods.find(m => m.id === paymentMethod)?.name}`);
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
          <h1 className="text-lg font-semibold">결제하기</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">결제 금액</p>
                <p className="text-4xl font-bold text-orange-600">
                  ${amount.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">결제 수단 선택</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div
                        key={method.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? `border-${method.color}-600 bg-${method.color}-50`
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label
                            htmlFor={method.id}
                            className="flex items-center flex-1 cursor-pointer"
                          >
                            <Icon className={`w-6 h-6 mr-3 text-${method.color}-600`} />
                            <span className="font-medium">{method.name}</span>
                          </Label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">안내:</span> 결제는 안전하게 처리되며, 
                결제 완료 후 즉시 기프티로 충전됩니다.
              </p>
            </CardContent>
          </Card>

          {}
          <Button
            onClick={handlePurchase}
            className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
          >
            ${amount.toLocaleString()} 결제하기
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}