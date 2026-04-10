import { v_c4deb2, v_5ab095 } from "bapkr";
import { v_611d57 } from "../../components/AdminLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_3ebb07, v_51bb20 } from "nchqfqoebgwu";

interface Keyword { id: number; name: string; display_order: number }
interface Brand { slug: string; name: string; logo_url: string | null }

const v_cc9198 = import.meta.env.VITE_API_BASE ?? "https://oth-path-8f7f45.example.invalid/oth-path";

function v_499b6e() { return localStorage.getItem("token"); }

async function v_05a921<T>(v_9fe22d, v_b36f96 = {}): Promise<T> {
  const v_21cc31 = v_499b6e();
  const v_3f4675 = {
    "Content-Type": "application/json",
    ...(v_b36f96.headers as Record<string, string> ?? {}),
  };
  if (v_21cc31) v_3f4675["Authorization"] = `Bearer ${v_21cc31}`;
  const v_8f00b9 = await fetch(`${v_cc9198}${v_9fe22d}`, { ...v_b36f96, headers: v_3f4675 });
  const v_9390e8 = await v_8f00b9.json();
  if (!v_8f00b9.ok) throw new Error((v_9390e8 as { error?: string }).error ?? `API error ${v_8f00b9.status}`);
  return v_9390e8 as T;
}

export function v_d2337d() {
  const [v_eb1591, v_7ece7e] = v_5ab095<Brand[]>([]);
  const [v_7a80c2, v_0198e2] = v_5ab095<Keyword[]>([]);
  const [v_ed4947, v_646e99] = v_5ab095<string | null>(null);
  const [v_b7533c, v_fb7255] = v_5ab095<Set<number>>(new Set());
  const [v_35bf26, v_04e389] = v_5ab095(false);
  const [v_683210, v_34a50a] = v_5ab095(true);

  v_c4deb2(() => {
    Promise.all([
      v_05a921<{ brands: Brand[] }>("/oth-path"),
      v_05a921<{ keywords: Keyword[] }>("/keywords"),
    ]).then(([v_148ff6, v_0eb677]) => {
      v_7ece7e(v_148ff6.brands);
      v_0198e2(v_0eb677.keywords);
    }).catch(console.error).finally(() => v_34a50a(false));
  }, []);

  const v_3d29d2 = async (v_42e14f) => {
    v_646e99(v_42e14f);
    try {
      const v_8f00b9 = await v_05a921<{ keywords: Keyword[] }>(`/keywords/brands/${v_42e14f}`);
      v_fb7255(new Set(v_8f00b9.keywords.map((v_0eb677) => v_0eb677.id)));
    } catch {
      v_fb7255(new Set());
    }
  };

  const v_fcc7fb = (v_389afb) => {
    v_fb7255((v_ba2215) => {
      const v_a448ad = new Set(v_ba2215);
      if (v_a448ad.has(v_389afb)) v_a448ad.delete(v_389afb);
      else v_a448ad.add(v_389afb);
      return v_a448ad;
    });
  };

  const v_1e693b = async () => {
    if (!v_ed4947) return;
    v_04e389(true);
    try {
      await v_05a921(`/keywords/brands/${v_ed4947}`, {
        method: "PUT",
        body: JSON.stringify({ keyword_ids: Array.from(v_b7533c) }),
      });
      alert("저장되었습니다");
    } catch (v_9e86fd) {
      alert(v_9e86fd.message);
    } finally {
      v_04e389(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto">
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold">브랜드 키워드 설정</h1>
          <p className="text-sm text-gray-500 mt-1">브랜드에 키워드를 할당하여 마켓 필터를 구성합니다</p>
        </div>

        <div className="p-4 space-y-4">
          {v_683210 ? (
            <p className="text-gray-500 text-center py-8">로딩 중...</p>
          ) : (
            <>
              {}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">브랜드 선택</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {v_eb1591.map((v_148ff6) => (
                      <button
                        key={v_148ff6.slug}
                        onClick={() => v_3d29d2(v_148ff6.slug)}
                        className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                          v_ed4947 === v_148ff6.slug
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {v_148ff6.logo_url ? (
                          <img
                            src={v_148ff6.logo_url.startsWith("http") ? v_148ff6.logo_url : `${v_cc9198.replace("/oth-path", "")}${v_148ff6.logo_url}`}
                            alt={v_148ff6.name}
                            className="w-10 h-10 rounded-lg object-contain"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <Store className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <span className="text-xs mt-1 text-center leading-tight">{v_148ff6.name}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {}
              {v_ed4947 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">
                      키워드 할당 — {v_eb1591.find((v_148ff6) => v_148ff6.slug === v_ed4947)?.name}
                    </h3>
                    {v_7a80c2.length === 0 ? (
                      <p className="text-gray-500 text-sm">키워드를 먼저 등록해주세요</p>
                    ) : (
                      <>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {v_7a80c2.map((v_0dcbd9) => {
                            const v_587413 = v_b7533c.has(v_0dcbd9.id);
                            return (
                              <button
                                key={v_0dcbd9.id}
                                onClick={() => v_fcc7fb(v_0dcbd9.id)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-colors ${
                                  v_587413
                                    ? "border-orange-500 bg-orange-50 text-orange-700"
                                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                                }`}
                              >
                                {v_587413 && <Check className="w-3.5 h-3.5" />}
                                {v_0dcbd9.name}
                              </button>
                            );
                          })}
                        </div>
                        <Button onClick={v_1e693b} disabled={v_35bf26} className="w-full">
                          {v_35bf26 ? "저장 중..." : "저장"}
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
