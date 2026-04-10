import { useNavigate } from "react-router";
import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent } from "../../components/ui/card";
import { DollarSign, Settings } from "lucide-react";

const menuItems = [
  { icon: DollarSign, label: "환율 관리", desc: "환율 조회, 이력, 수동 갱신", path: "/oth-path" },
  { icon: Settings, label: "시스템 설정", desc: "개발 모드, 전역 설정", path: "/oth-path" },
];

export function SystemMenu() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">시스템</h1>
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
