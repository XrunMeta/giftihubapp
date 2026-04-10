import { v_a04f9c } from "wtmgqhsnsiyp";
import { v_611d57 } from "../../components/AdminLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_283e93, v_aa53ff, v_32e130 } from "nchqfqoebgwu";

const v_0dea6d = [
  { icon: v_283e93, label: "정산 목록/생성", desc: "월별/수동 정산 조회 및 생성", path: "/oth-path" },
  { icon: v_aa53ff, label: "번들 정산", desc: "번들 정산 목록/상세", path: "/oth-path" },
  { icon: v_32e130, label: "정산 기록", desc: "가맹점 정산 요청 내역", path: "/oth-path" },
];

export function v_b64d7d() {
  const v_9b57fc = v_a04f9c();

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">정산 관리</h1>
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
