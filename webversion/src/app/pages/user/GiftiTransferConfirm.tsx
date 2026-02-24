import { v_5ab095 } from "bapkr";
import { v_be9b94, v_a04f9c, v_1a1e9e } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_c71054, v_3d81ea } from "nchqfqoebgwu";
import { v_32addd } from "../../data/mockData";

interface RecipientInfo {
  name: string;
  email: string;
}

export function v_342981() {
  const { id: v_389afb } = v_1a1e9e();
  const v_9b57fc = v_a04f9c();
  const v_a55f0b = v_be9b94();
  const [v_a8cd21, v_fd9c06] = v_5ab095("");

  const v_068c67 = sessionStorage.getItem('transferRecipient');
  const v_892c1f = v_068c67 ? JSON.parse(v_068c67) as RecipientInfo : null;
  const v_898e2e = v_32addd.find((v_206b88) => v_206b88.id === v_389afb);

  console.log("Location state:", v_a55f0b.state);
  console.log("Recipient from sessionStorage:", v_892c1f);
  console.log("Gifti:", v_898e2e);

  if (!v_898e2e || !v_892c1f) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4 space-y-4">
          <p>기프티 또는 받는 사람 정보를 찾을 수 없습니다</p>
          <Button
            onClick={() => v_9b57fc(-1)}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            이전으로
          </Button>
          <div className="text-xs text-gray-500">
            <p>Debug info:</p>
            <p>Gifti ID: {v_389afb}</p>
            <p>Recipient: {v_892c1f ? "있음" : "없음"}</p>
            <p>State: {JSON.stringify(v_a55f0b.state)}</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  const v_92e615 = () => {

    sessionStorage.setItem('transferComplete', JSON.stringify({
      giftiName: v_898e2e.name,
      giftiBalance: v_898e2e.balance,
      recipientName: v_892c1f.name,
    }));

    sessionStorage.removeItem('transferRecipient');
    v_9b57fc(`/oth-path${v_389afb}/transfer-complete`);
  };

  const v_484203 = 1385;
  const v_715f13 = Math.round(v_898e2e.balance * v_484203);

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => v_9b57fc(-1)} className="mr-3">
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
                    <span className="font-semibold text-lg">{v_898e2e.name}</span>
                    <span className="text-lg font-bold text-orange-600">
                      ${v_898e2e.originalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">잔액</span>
                    <div className="text-right">
                      <span className="font-semibold">
                        ${v_898e2e.balance.toLocaleString()}
                      </span>
                      <div className="text-xs text-gray-500">
                        ≈ ₩{v_715f13.toLocaleString()}
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
                  <p className="font-semibold">{v_892c1f.name}</p>
                  <p className="text-sm text-gray-600">{v_892c1f.email}</p>
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
              value={v_a8cd21}
              onChange={(v_9e86fd) => v_fd9c06(v_9e86fd.target.value)}
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
            onClick={v_92e615}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold"
          >
            양도하기
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}