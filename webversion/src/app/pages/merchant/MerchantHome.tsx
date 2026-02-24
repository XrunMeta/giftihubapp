import { useState } from "react";
import { MerchantLayout } from "../../components/MerchantLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { QrCode, DollarSign, TrendingUp, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function MerchantHome() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const todayStats = {
    totalAmount: 125000,
    transactionCount: 23,
    avgTransaction: 5435,
  };

  const handleStartScan = () => {
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);

      navigate("/merchant/process", {
        state: {
          giftiId: "1",
          giftiName: "스타벅스 기프티콘",
          balance: 45000,
          customerName: "김** 고객",
        },
      });
    }, 2000);
  };

  return (
    <MerchantLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-6">
          <h1 className="text-xl font-semibold mb-2">가맹점 홈</h1>
          <p className="text-gray-600 text-sm">오늘의 거래 현황</p>
        </div>

        <div className="p-4 space-y-4">
          {}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                <p className="text-xs text-gray-600 mb-1">오늘 매출</p>
                <p className="text-lg font-bold">
                  ${todayStats.totalAmount.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <p className="text-xs text-gray-600 mb-1">처리 건수</p>
                <p className="text-lg font-bold">{todayStats.transactionCount}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <p className="text-xs text-gray-600 mb-1">평균 거래</p>
                <p className="text-lg font-bold">
                  ${todayStats.avgTransaction.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="bg-gray-100 w-48 h-48 mx-auto rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                  {isScanning ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-full h-1 bg-orange-600 animate-pulse" style={{ animation: "scan 1.5s ease-in-out infinite" }} />
                      <QrCode className="w-24 h-24 text-orange-600" />
                    </div>
                  ) : (
                    <QrCode className="w-24 h-24 text-gray-400" />
                  )}
                </div>

                <h2 className="text-xl font-semibold mb-2">
                  {isScanning ? "QR 코드 스캔 중..." : "QR 코드 스캔"}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {isScanning
                    ? "고객의 QR 코드를 인식하고 있습니다"
                    : "고객의 기프티 QR 코드를 스캔하세요"}
                </p>

                <Button
                  onClick={handleStartScan}
                  disabled={isScanning}
                  className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
                >
                  {isScanning ? "스캔 중..." : "스캔 시작"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-blue-900">안내</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 고객의 QR 코드를 카메라에 비춰주세요</li>
                <li>• 스캔 후 사용 금액을 입력합니다</li>
                <li>• 정산은 매월 10일에 진행됩니다</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </MerchantLayout>
  );
}