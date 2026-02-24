import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_6b9090, v_e91344, v_f235de } from "nchqfqoebgwu";
import { v_80cb8d } from "wtmgqhsnsiyp";
import { v_32addd } from "../../data/mockData";

export function v_9a33fc() {
  const v_309afe = v_32addd.filter(
    (v_206b88) => v_206b88.status === "active",
  );
  const v_c15e22 = v_309afe.reduce(
    (v_dce0a8, v_206b88) => v_dce0a8 + v_206b88.balance,
    0,
  );

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-6">
          <h1 className="text-xl font-semibold mb-6">
            GiftiHub
          </h1>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              총 보유 잔액
            </p>
            <p className="text-4xl font-bold">
              ${v_c15e22.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              ₩{(v_c15e22 * 1300).toLocaleString()}
            </p>
          </div>

          {}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Link to="/oth-path">
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                스토어
              </Button>
            </Link>
            <Link to="/oth-path">
              <Button variant="outline" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                중고마켓
              </Button>
            </Link>
          </div>
        </div>

        {}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold flex items-center">
              <Wallet className="w-5 h-5 mr-2 text-gray-600" />
              내 기프티
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({v_309afe.length}개)
              </span>
            </h2>
            <Link
              to="/oth-path"
              className="text-sm text-orange-600 font-medium"
            >
              전체보기 →
            </Link>
          </div>

          {v_309afe.slice(0, 3).map((v_898e2e) => (
            <Link key={v_898e2e.id} to={`/oth-path${v_898e2e.id}`}>
              <Card className="hover:shadow-md transition-shadow mb-2">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {v_898e2e.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        만료일:{" "}
                        {new Date(
                          v_898e2e.expiryDate,
                        ).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">
                        ${v_898e2e.balance.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        / ₩
                        {(v_898e2e.originalAmount * 1300).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {v_309afe.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Wallet className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">
                  보유한 기프티가 없습니다
                </p>
                <Link to="/oth-path">
                  <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                    기프티 구매하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </UserLayout>
  );
}