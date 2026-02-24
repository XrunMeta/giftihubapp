import { v_5ab095 } from "bapkr";
import { v_1a1e9e, v_a04f9c } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_c71054, v_66816c } from "nchqfqoebgwu";
import { v_32addd } from "../../data/mockData";

interface SearchResult {
  id: string;
  name: string;
  email: string;
}

export function v_4334a5() {
  const { id: v_389afb } = v_1a1e9e();
  const v_9b57fc = v_a04f9c();
  const v_898e2e = v_32addd.find((v_206b88) => v_206b88.id === v_389afb);
  const [v_e0c7e8, v_fedf34] = v_5ab095("");
  const [v_76148b, v_ff2199] = v_5ab095<SearchResult[]>([]);
  const [v_2e8dde, v_961b02] = v_5ab095<SearchResult | null>(null);

  if (!v_898e2e) {
    return (
      <UserLayout>
        <div className="max-w-lg mx-auto p-4">
          <p>기프티를 찾을 수 없습니다</p>
        </div>
      </UserLayout>
    );
  }

  const v_5e757d = () => {

    if (v_e0c7e8.includes("@")) {
      v_ff2199([
        {
          id: "1",
          name: "김*수",
          email: "ki***@gmail.com",
        },
      ]);
      v_961b02(null);
    } else {
      v_ff2199([]);
      v_961b02(null);
    }
  };

  const v_bc3cbf = (v_892c1f) => {
    v_961b02(v_892c1f);
    v_ff2199([]);
  };

  const v_eb5366 = (v_892c1f) => {

    console.log("Transferring to recipient:", v_892c1f);
    sessionStorage.setItem('transferRecipient', JSON.stringify(v_892c1f));
    v_9b57fc(`/oth-path${v_389afb}/transfer-confirm`);
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
          <h1 className="text-lg font-semibold">기프티 양도</h1>
        </div>

        <div className="p-4 space-y-6">
          {}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              양도할 기프티
            </h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{v_898e2e.name}</span>
                    <span className="text-lg font-bold text-orange-600">
                      ${v_898e2e.balance}
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
              받는 사람 찾기
            </h2>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="이메일 주소"
                value={v_e0c7e8}
                onChange={(v_9e86fd) => v_fedf34(v_9e86fd.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              />
              <Button
                onClick={v_5e757d}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                검색
              </Button>
            </div>
          </div>

          {}
          {v_76148b.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-2 text-gray-700">
                검색 결과
              </h2>
              <div className="space-y-2">
                {v_76148b.map((v_43c42e) => (
                  <Card key={v_43c42e.id} className="cursor-pointer hover:border-orange-600 transition-colors">
                    <CardContent className="p-4">
                      <button 
                        onClick={() => v_bc3cbf(v_43c42e)}
                        className="w-full text-left"
                      >
                        <div>
                          <p className="font-semibold">{v_43c42e.name}</p>
                          <p className="text-sm text-gray-600">{v_43c42e.email}</p>
                        </div>
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {}
          {v_2e8dde && (
            <div>
              <h2 className="text-sm font-semibold mb-2 text-gray-700">
                선택된 받는 사람
              </h2>
              <Card className="border-orange-600">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">{v_2e8dde.name}</p>
                      <p className="text-sm text-gray-600">{v_2e8dde.email}</p>
                    </div>
                    <Button
                      onClick={() => v_eb5366(v_2e8dde)}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      이 사람에게 양도
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {}
          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">양도 수수료</span>
                <span className="font-semibold text-green-600">무료</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">양도 횟수</span>
                <span className="font-semibold">
                  {v_898e2e.transferCount}/3회 사용
                </span>
              </div>
            </CardContent>
          </Card>

          {}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-800">
              <strong>안내사항</strong>
              <br />• 양도는 최대 3회까지 가능합니다
              <br />• 양도된 기프티는 취소할 수 없습니다
              <br />• 받는 사람의 이메일 주소를 정확히 입력해주세요
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}