import { v_be9b94, v_a04f9c } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_24c64e } from "nchqfqoebgwu";

interface TransferCompleteState {
  giftiName: string;
  giftiBalance: number;
  recipientName: string;
}

export function v_d0bc80() {
  const v_9b57fc = v_a04f9c();
  const v_a55f0b = v_be9b94();

  const v_744799 = sessionStorage.getItem('transferComplete');
  const v_b6e533 = v_744799 ? JSON.parse(v_744799) as TransferCompleteState : null;

  if (!v_b6e533) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4">
          <p>전달 정보를 찾을 수 없습니다</p>
          <Button
            onClick={() => v_9b57fc("/oth-path")}
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white"
          >
            내 기프티로
          </Button>
        </div>
      </UserLayout>
    );
  }

  const v_03cae9 = () => {

    sessionStorage.removeItem('transferComplete');
    v_9b57fc("/oth-path");
  };

  const v_484203 = 1385;
  const v_715f13 = Math.round(v_b6e533.giftiBalance * v_484203);

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
                  {v_b6e533.giftiName}
                </p>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">잔액: </span>
                  <span className="font-semibold text-gray-900">
                    ${v_b6e533.giftiBalance.toLocaleString()}
                  </span>
                  <div className="text-xs text-gray-500">
                    ≈ ₩{v_715f13.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  → <span className="font-semibold text-gray-900">{v_b6e533.recipientName}</span> 님에게 전달됨
                </p>
              </div>
            </CardContent>
          </Card>

          {}
          <Button
            onClick={v_03cae9}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold"
          >
            확인
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}