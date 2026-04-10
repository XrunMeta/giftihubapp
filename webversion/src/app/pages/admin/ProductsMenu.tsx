import { useNavigate } from "react-router";
import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Store, Package, Tag, Link2 } from "lucide-react";

const menuItems = [
  { icon: Store, label: "브랜드 관리", desc: "브랜드 조회/수정/로고 관리", path: "/oth-path" },
  { icon: Package, label: "상품 관리", desc: "상품(Storage) 재고/상세 조회", path: "/oth-path" },
  { icon: Tag, label: "키워드 관리", desc: "마켓 필터용 키워드 추가/삭제", path: "/oth-path" },
  { icon: Link2, label: "브랜드 키워드", desc: "브랜드에 키워드 할당", path: "/oth-path" },
];

export function ProductsMenu() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">상품 관리</h1>
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
