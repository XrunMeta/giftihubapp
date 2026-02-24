import { v_a04f9c } from "wtmgqhsnsiyp";
import { v_2e5340 } from "../../components/MerchantLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_2e391c, v_40db37 } from "../../components/ui/avatar";
import { v_5dcc4b, v_51bb20, v_0ae9ff, v_c72ef2, v_32e130, v_0c9ab6, v_6a6a7c } from "nchqfqoebgwu";

export function v_40d611() {
  const v_9b57fc = v_a04f9c();
  const v_1c28a2 = localStorage.getItem("userName") || "가맹점";

  const v_06b8a4 = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    v_9b57fc("/login");
  };

  const v_0dea6d = [
    { icon: v_51bb20, label: "가맹점 정보", action: () => {} },
    { icon: v_5dcc4b, label: "계정 설정", action: () => {} },
    { icon: v_0ae9ff, label: "알림 설정", action: () => {} },
    { icon: v_32e130, label: "약관 및 정책", action: () => {} },
    { icon: v_c72ef2, label: "고객 지원", action: () => {} },
  ];

  return (
    <MerchantLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">설정</h1>
        </div>

        <div className="p-4 space-y-4">
          {}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-orange-600 text-white text-xl">
                    {v_1c28a2.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{v_1c28a2}</h2>
                  <p className="text-sm text-gray-600">가맹점 계정</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      승인됨
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">사업자 정보</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">사업자명</span>
                  <span className="font-semibold">{v_1c28a2} 상점</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">사업자번호</span>
                  <span className="font-mono">123-45-67890</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">업종</span>
                  <span>음식점/카페</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">가입일</span>
                  <span>2025-01-15</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="p-0">
              {v_0dea6d.map((v_8c0b26, v_a56041) => {
                const v_6bce96 = v_8c0b26.icon;
                return (
                  <button
                    key={v_a56041}
                    onClick={v_8c0b26.action}
                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                      v_a56041 !== v_0dea6d.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span>{v_8c0b26.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {}
          <Button
            onClick={v_06b8a4}
            variant="outline"
            className="w-full border-red-500 text-red-500 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>

          {}
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>GiftiHub 가맹점 v1.0.0</p>
            <p className="mt-1">© 2026 GiftiHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </MerchantLayout>
  );
}