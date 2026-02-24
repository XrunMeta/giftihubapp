import { v_5ab095 } from "bapkr";
import { v_2e5340 } from "../../components/MerchantLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_19ca5b, v_aa3f8f, v_e91344, v_24c64e } from "nchqfqoebgwu";
import { v_a04f9c } from "wtmgqhsnsiyp";

export function v_e61cfa() {
  const v_9b57fc = v_a04f9c();
  const [v_81e4dd, v_92a5a6] = v_5ab095(false);

  const v_f00c5a = {
    totalAmount: 125000,
    transactionCount: 23,
    avgTransaction: 5435,
  };

  const v_8e8c9f = () => {
    v_92a5a6(true);

    setTimeout(() => {
      v_92a5a6(false);

      v_9b57fc("/merchant/process", {
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
                  ${v_f00c5a.totalAmount.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 mx-auto text-green-600 mb-2" />
                <p className="text-xs text-gray-600 mb-1">처리 건수</p>
                <p className="text-lg font-bold">{v_f00c5a.transactionCount}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                <p className="text-xs text-gray-600 mb-1">평균 거래</p>
                <p className="text-lg font-bold">
                  ${v_f00c5a.avgTransaction.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="bg-gray-100 w-48 h-48 mx-auto rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                  {v_81e4dd ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-full h-1 bg-orange-600 animate-pulse" style={{ animation: "scan 1.5s ease-in-out infinite" }} />
                      <QrCode className="w-24 h-24 text-orange-600" />
                    </div>
                  ) : (
                    <QrCode className="w-24 h-24 text-gray-400" />
                  )}
                </div>

                <h2 className="text-xl font-semibold mb-2">
                  {v_81e4dd ? "QR 코드 스캔 중..." : "QR 코드 스캔"}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {v_81e4dd
                    ? "고객의 QR 코드를 인식하고 있습니다"
                    : "고객의 기프티 QR 코드를 스캔하세요"}
                </p>

                <Button
                  onClick={v_8e8c9f}
                  disabled={v_81e4dd}
                  className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
                >
                  {v_81e4dd ? "스캔 중..." : "스캔 시작"}
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