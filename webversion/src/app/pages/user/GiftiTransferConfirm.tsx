import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { mockGiftis } from "../../data/mockData";

interface RecipientInfo {
  name: string;
  email: string;
}

export function GiftiTransferConfirm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");

  const recipientData = sessionStorage.getItem('transferRecipient');
  const recipient = recipientData ? JSON.parse(recipientData) as RecipientInfo : null;
  const gifti = mockGiftis.find((g) => g.id === id);

  console.log("Location state:", location.state);
  console.log("Recipient from sessionStorage:", recipient);
  console.log("Gifti:", gifti);

  if (!gifti || !recipient) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4 space-y-4">
          <p>기프티 또는 받는 사람 정보를 찾을 수 없습니다</p>
          <Button
            onClick={() => navigate(-1)}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            이전으로
          </Button>
          <div className="text-xs text-gray-500">
            <p>Debug info:</p>
            <p>Gifti ID: {id}</p>
            <p>Recipient: {recipient ? "있음" : "없음"}</p>
            <p>State: {JSON.stringify(location.state)}</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  const handleConfirmTransfer = () => {

    sessionStorage.setItem('transferComplete', JSON.stringify({
      giftiName: gifti.name,
      giftiBalance: gifti.balance,
      recipientName: recipient.name,
    }));

    sessionStorage.removeItem('transferRecipient');
    navigate(`/oth-path${id}/transfer-complete`);
  };

  const exchangeRate = 1385;
  const balanceInKRW = Math.round(gifti.balance * exchangeRate);

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">양도 확인</h1>
        </div>

        <div className="p-4 space-y-6">
          {}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              양도 기프티
            </h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{gifti.name}</span>
                    <span className="text-lg font-bold text-orange-600">
                      ${gifti.originalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">잔액</span>
                    <div className="text-right">
                      <span className="font-semibold">
                        ${gifti.balance.toLocaleString()}
                      </span>
                      <div className="text-xs text-gray-500">
                        ≈ ₩{balanceInKRW.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              받는 사람
            </h2>
            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="font-semibold">{recipient.name}</p>
                  <p className="text-sm text-gray-600">{recipient.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              메시지 (선택)
            </h2>
            <textarea
              placeholder="생일 축하해!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent resize-none"
            />
          </div>

          {}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">양도 수수료</span>
                <span className="font-semibold text-green-600">무료</span>
              </div>
            </CardContent>
          </Card>

          {}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-orange-800">
                <strong>주의</strong>
                <br />
                양도 후에는 되돌릴 수 없습니다. 새 QR이 상대방에게 발급됩니다.
              </p>
            </div>
          </div>

          {}
          <Button
            onClick={handleConfirmTransfer}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold"
          >
            양도하기
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}