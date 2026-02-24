import { v_5ab095 } from "bapkr";
import { v_80cb8d } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import {
  v_373248,
  v_ed7019,
  v_2b3568,
  v_40f7a7,
} from "../../components/ui/tabs";
import { v_6185b9 } from "../../components/ui/badge";
import { v_f235de } from "nchqfqoebgwu";
import { v_32addd } from "../../data/mockData";

export function v_4d54ab() {
  const [v_f21110, v_d217e7] = v_5ab095<
    "all" | "active" | "used" | "expired"
  >("all");

  const v_53d888 = v_32addd.filter((v_206b88) => {
    if (v_f21110 === "all") return true;
    return v_206b88.status === v_f21110;
  });

  const v_395974 = (v_d308b5) => {
    switch (v_d308b5) {
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
            value={v_f21110}
            onValueChange={(v_81e2ef) => v_d217e7(v_81e2ef as any)}
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
            {v_53d888.map((v_898e2e) => (
              <Link
                key={v_898e2e.id}
                to={`/oth-path${v_898e2e.id}`}
              >
                <Card className="hover:shadow-md transition-shadow mb-2">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {v_898e2e.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          만료일:{" "}
                          {new Date(
                            v_898e2e.expiryDate,
                          ).toLocaleDateString("ko-KR")}
                        </p>
                      </div>
                      {v_395974(v_898e2e.status)}
                    </div>

                    <div className="text-2xl font-bold text-orange-600">
                      ${v_898e2e.balance.toLocaleString()}{" "}
                      <span className="text-base font-normal text-gray-500 text-sm">
                        {" "}
                        / ₩
                        {(
                          v_898e2e.balance * 1300
                        ).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {v_53d888.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Wallet className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500">
                    {v_f21110 === "all"
                      ? "보유한 기프티가 없습니다"
                      : `${
                          v_f21110 === "active"
                            ? "사용 가능한"
                            : v_f21110 === "used"
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