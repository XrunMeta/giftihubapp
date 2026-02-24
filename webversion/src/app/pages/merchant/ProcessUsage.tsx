import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MerchantLayout } from "../../components/MerchantLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CheckCircle, User, Wallet, ArrowLeft } from "lucide-react";

export function ProcessUsage() {
  const location = useLocation();
  const navigate = useNavigate();
  const giftiData = location.state || {
    giftiName: "기프티콘",
    balance: 0,
    customerName: "고객",
  };

  const [amount, setAmount] = useState("");

  const handleNumberClick = (num: string) => {
    if (num === "clear") {
      setAmount("");
    } else if (num === "backspace") {
      setAmount((prev) => prev.slice(0, -1));
    } else {
      const newAmount = amount + num;
      if (parseInt(newAmount) <= giftiData.balance) {
        setAmount(newAmount);
      }
    }
  };

  const handleProcess = () => {
    if (!amount || parseInt(amount) === 0) {
      alert("사용 금액을 입력해주세요");
      return;
    }
    alert(`결제가 완료되었습니다!\n사용 금액: $${parseInt(amount).toLocaleString()}`);
    navigate("/merchant");
  };

  const handleFullAmount = () => {
    setAmount(giftiData.balance.toString());
  };

  const numberPad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["clear", "0", "backspace"],
  ];

  return (
    <MerchantLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">사용 처리</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">고객명</span>
                  </div>
                  <span className="font-semibold">{giftiData.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm">기프티</span>
                  </div>
                  <span className="font-semibold">{giftiData.giftiName}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-gray-600 text-sm">잔액</span>
                  <span className="text-xl font-bold text-orange-600">
                    ${giftiData.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">사용 금액</p>
                <div className="text-4xl font-bold text-orange-600 mb-4 min-h-[3rem] flex items-center justify-center">
                  ${amount ? parseInt(amount).toLocaleString() : "0"}
                </div>
                <Button
                  onClick={handleFullAmount}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  전액 사용
                </Button>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {numberPad.map((row, rowIndex) =>
                  row.map((key, keyIndex) => (
                    <Button
                      key={`${rowIndex}-${keyIndex}`}
                      onClick={() => handleNumberClick(key)}
                      variant="outline"
                      className="h-16 text-xl font-semibold"
                    >
                      {key === "clear" ? "C" : key === "backspace" ? "⌫" : key}
                    </Button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {}
          <Button
            onClick={handleProcess}
            className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
            disabled={!amount || parseInt(amount) === 0}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            사용 처리 완료
          </Button>
        </div>
      </div>
    </MerchantLayout>
  );
}