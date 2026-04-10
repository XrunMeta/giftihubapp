import { useNavigate } from "react-router";
import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent } from "../../components/ui/card";
import { User, Store, ShieldCheck } from "lucide-react";

const menuItems = [
  { icon: User, label: "사용자/바우처 조회", desc: "사용자 목록, 보유 바우처 확인", path: "/oth-path" },
  { icon: Store, label: "가맹점 관리", desc: "가맹점 등록/삭제, 브랜드 배정", path: "/oth-path" },
  { icon: ShieldCheck, label: "관리자 관리", desc: "관리자 등록/해제", path: "/oth-path" },
];

export function MembersMenu() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">회원 관리</h1>
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
