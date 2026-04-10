import { v_a04f9c } from "wtmgqhsnsiyp";
import { v_611d57 } from "../../components/AdminLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_aa3f8f, v_5dcc4b } from "nchqfqoebgwu";

const v_0dea6d = [
  { icon: v_aa3f8f, label: "환율 관리", desc: "환율 조회, 이력, 수동 갱신", path: "/oth-path" },
  { icon: v_5dcc4b, label: "시스템 설정", desc: "개발 모드, 전역 설정", path: "/oth-path" },
];

export function v_938e4d() {
  const v_9b57fc = v_a04f9c();

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">시스템</h1>
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
