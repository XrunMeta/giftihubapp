import { useNavigate } from "react-router";
import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Calculator, Layers, FileText } from "lucide-react";

const menuItems = [
  { icon: Calculator, label: "정산 목록/생성", desc: "월별/수동 정산 조회 및 생성", path: "/oth-path" },
  { icon: Layers, label: "번들 정산", desc: "번들 정산 목록/상세", path: "/oth-path" },
  { icon: FileText, label: "정산 기록", desc: "가맹점 정산 요청 내역", path: "/oth-path" },
];

export function SettlementsMenu() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">정산 관리</h1>
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
