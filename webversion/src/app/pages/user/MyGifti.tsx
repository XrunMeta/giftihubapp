import { useState } from "react";
import { Link } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Wallet } from "lucide-react";
import { mockGiftis } from "../../data/mockData";

export function MyGifti() {
  const [filter, setFilter] = useState<
    "all" | "active" | "used" | "expired"
  >("all");

  const filteredGiftis = mockGiftis.filter((g) => {
    if (filter === "all") return true;
    return g.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500">사용 가능</Badge>
        );
      case "used":
        return <Badge className="bg-gray-500">사용 완료</Badge>;
      case "expired":
        return <Badge className="bg-red-500">만료</Badge>;
      case "selling":
        return <Badge className="bg-blue-500">판매 중</Badge>;
      default:
        return null;
    }
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold flex items-center">
            <Wallet className="w-6 h-6 mr-2 text-gray-700" />내
            기프티
          </h1>
        </div>

        <div className="p-4">
          {}
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as any)}
            className="mb-4"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="active">
                사용 가능
              </TabsTrigger>
              <TabsTrigger value="used">사용 완료</TabsTrigger>
              <TabsTrigger value="expired">만료</TabsTrigger>
            </TabsList>
          </Tabs>

          {}
          <div className="space-y-3">
            {filteredGiftis.map((gifti) => (
              <Link
                key={gifti.id}
                to={`/oth-path${gifti.id}`}
              >
                <Card className="hover:shadow-md transition-shadow mb-2">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {gifti.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          만료일:{" "}
                          {new Date(
                            gifti.expiryDate,
                          ).toLocaleDateString("ko-KR")}
                        </p>
                      </div>
                      {getStatusBadge(gifti.status)}
                    </div>

                    <div className="text-2xl font-bold text-orange-600">
                      ${gifti.balance.toLocaleString()}{" "}
                      <span className="text-base font-normal text-gray-500 text-sm">
                        {" "}
                        / ₩
                        {(
                          gifti.balance * 1300
                        ).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {filteredGiftis.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Wallet className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500">
                    {filter === "all"
                      ? "보유한 기프티가 없습니다"
                      : `${
                          filter === "active"
                            ? "사용 가능한"
                            : filter === "used"
                              ? "사용 완료된"
                              : "만료된"
                        } 기프티가 없습니다`}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}