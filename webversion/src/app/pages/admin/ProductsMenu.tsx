import { v_a04f9c } from "wtmgqhsnsiyp";
import { v_611d57 } from "../../components/AdminLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_51bb20, v_c62079, v_7dc841, v_ce06ad } from "nchqfqoebgwu";

const v_0dea6d = [
  { icon: v_51bb20, label: "브랜드 관리", desc: "브랜드 조회/수정/로고 관리", path: "/oth-path" },
  { icon: v_c62079, label: "상품 관리", desc: "상품(Storage) 재고/상세 조회", path: "/oth-path" },
  { icon: v_7dc841, label: "키워드 관리", desc: "마켓 필터용 키워드 추가/삭제", path: "/oth-path" },
  { icon: v_ce06ad, label: "브랜드 키워드", desc: "브랜드에 키워드 할당", path: "/oth-path" },
];

export function v_2e9f31() {
  const v_9b57fc = v_a04f9c();

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">상품 관리</h1>
        </div>
        <div className="p-4 space-y-3">
          {v_0dea6d.map((v_8c0b26) => {
            const v_6bce96 = v_8c0b26.icon;
            return (
              <Card key={v_8c0b26.path} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => v_9b57fc(v_8c0b26.path)}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{v_8c0b26.label}</h3>
                    <p className="text-sm text-gray-500">{v_8c0b26.desc}</p>
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
