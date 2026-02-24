import { useLocation, useNavigate } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CheckCircle } from "lucide-react";

interface TransferCompleteState {
  giftiName: string;
  giftiBalance: number;
  recipientName: string;
}

export function GiftiTransferComplete() {
  const navigate = useNavigate();
  const location = useLocation();

  const transferData = sessionStorage.getItem('transferComplete');
  const state = transferData ? JSON.parse(transferData) as TransferCompleteState : null;

  if (!state) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4">
          <p>전달 정보를 찾을 수 없습니다</p>
          <Button
            onClick={() => navigate("/oth-path")}
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white"
          >
            내 기프티로
          </Button>
        </div>
      </UserLayout>
    );
  }

  const handleConfirm = () => {

    sessionStorage.removeItem('transferComplete');
    navigate("/oth-path");
  };

  const exchangeRate = 1385;
  const balanceInKRW = Math.round(state.giftiBalance * exchangeRate);

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto min-h-screen flex items-center justify-center p-4">
        <div className="w-full space-y-6 text-center">
          {}
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>

          {}
          <h1 className="text-2xl font-bold text-gray-900">
            양도가 완료되었습니다
          </h1>

          {}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {state.giftiName}
                </p>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">잔액: </span>
                  <span className="font-semibold text-gray-900">
                    ${state.giftiBalance.toLocaleString()}
                  </span>
                  <div className="text-xs text-gray-500">
                    ≈ ₩{balanceInKRW.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  → <span className="font-semibold text-gray-900">{state.recipientName}</span> 님에게 전달됨
                </p>
              </div>
            </CardContent>
          </Card>

          {}
          <Button
            onClick={handleConfirm}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold"
          >
            확인
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}