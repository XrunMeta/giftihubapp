import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ShoppingCart, TrendingUp, Wallet } from "lucide-react";
import { Link } from "react-router";
import { mockGiftis } from "../../data/mockData";

export function UserHome() {
  const activeGiftis = mockGiftis.filter(
    (g) => g.status === "active",
  );
  const totalBalance = activeGiftis.reduce(
    (sum, g) => sum + g.balance,
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
              ${totalBalance.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              ₩{(totalBalance * 1300).toLocaleString()}
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
                ({activeGiftis.length}개)
              </span>
            </h2>
            <Link
              to="/oth-path"
              className="text-sm text-orange-600 font-medium"
            >
              전체보기 →
            </Link>
          </div>

          {activeGiftis.slice(0, 3).map((gifti) => (
            <Link key={gifti.id} to={`/oth-path${gifti.id}`}>
              <Card className="hover:shadow-md transition-shadow mb-2">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {gifti.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        만료일:{" "}
                        {new Date(
                          gifti.expiryDate,
                        ).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">
                        ${gifti.balance.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        / ₩
                        {(gifti.originalAmount * 1300).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {activeGiftis.length === 0 && (
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