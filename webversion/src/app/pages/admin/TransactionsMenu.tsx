import { useNavigate } from "react-router";
import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Layers, XCircle, QrCode } from "lucide-react";

const menuItems = [
  { icon: Layers, label: "번들 관리", desc: "바우처 세트 목록/상세 조회", path: "/oth-path" },
  { icon: XCircle, label: "취소/환불 처리", desc: "취소 요청 승인/거절, 환불/보상", path: "/oth-path" },
  { icon: QrCode, label: "바코드 검증", desc: "바코드 유효성 확인", path: "/oth-path" },
];

export function TransactionsMenu() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">거래 관리</h1>
        </div>
        <div className="p-4 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.path} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(item.path)}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.label}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
