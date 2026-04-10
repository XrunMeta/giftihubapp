import { v_a04f9c } from "wtmgqhsnsiyp";
import { v_611d57 } from "../../components/AdminLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_aa53ff, v_dc4a73, v_19ca5b } from "nchqfqoebgwu";

const v_0dea6d = [
  { icon: v_aa53ff, label: "번들 관리", desc: "바우처 세트 목록/상세 조회", path: "/oth-path" },
  { icon: v_dc4a73, label: "취소/환불 처리", desc: "취소 요청 승인/거절, 환불/보상", path: "/oth-path" },
  { icon: v_19ca5b, label: "바코드 검증", desc: "바코드 유효성 확인", path: "/oth-path" },
];

export function v_9c07f6() {
  const v_9b57fc = v_a04f9c();

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">거래 관리</h1>
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
