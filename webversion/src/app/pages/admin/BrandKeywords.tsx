import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Check, Store } from "lucide-react";

interface Keyword { id: number; name: string; display_order: number }
interface Brand { slug: string; name: string; logo_url: string | null }

const API_BASE = import.meta.env.VITE_API_BASE ?? "https://giftihubapi.pages.dev/oth-path";

function getToken() { return localStorage.getItem("token"); }

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `API error ${res.status}`);
  return data as T;
}

export function BrandKeywords() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [brandKeywordIds, setBrandKeywordIds] = useState<Set<number>>(new Set());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api<{ brands: Brand[] }>("/oth-path"),
      api<{ keywords: Keyword[] }>("/keywords"),
    ]).then(([b, k]) => {
      setBrands(b.brands);
      setKeywords(k.keywords);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const selectBrand = async (slug: string) => {
    setSelectedBrand(slug);
    try {
      const res = await api<{ keywords: Keyword[] }>(`/keywords/brands/${slug}`);
      setBrandKeywordIds(new Set(res.keywords.map((k) => k.id)));
    } catch {
      setBrandKeywordIds(new Set());
    }
  };

  const toggleKeyword = (id: number) => {
    setBrandKeywordIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const save = async () => {
    if (!selectedBrand) return;
    setSaving(true);
    try {
      await api(`/keywords/brands/${selectedBrand}`, {
        method: "PUT",
        body: JSON.stringify({ keyword_ids: Array.from(brandKeywordIds) }),
      });
      alert("저장되었습니다");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
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
          {loading ? (
            <p className="text-gray-500 text-center py-8">로딩 중...</p>
          ) : (
            <>
              {}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">브랜드 선택</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {brands.map((b) => (
                      <button
                        key={b.slug}
                        onClick={() => selectBrand(b.slug)}
                        className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                          selectedBrand === b.slug
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {b.logo_url ? (
                          <img
                            src={b.logo_url.startsWith("http") ? b.logo_url : `${API_BASE.replace("/oth-path", "")}${b.logo_url}`}
                            alt={b.name}
                            className="w-10 h-10 rounded-lg object-contain"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <Store className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <span className="text-xs mt-1 text-center leading-tight">{b.name}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {}
              {selectedBrand && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">
                      키워드 할당 — {brands.find((b) => b.slug === selectedBrand)?.name}
                    </h3>
                    {keywords.length === 0 ? (
                      <p className="text-gray-500 text-sm">키워드를 먼저 등록해주세요</p>
                    ) : (
                      <>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {keywords.map((kw) => {
                            const selected = brandKeywordIds.has(kw.id);
                            return (
                              <button
                                key={kw.id}
                                onClick={() => toggleKeyword(kw.id)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-colors ${
                                  selected
                                    ? "border-orange-500 bg-orange-50 text-orange-700"
                                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                                }`}
                              >
                                {selected && <Check className="w-3.5 h-3.5" />}
                                {kw.name}
                              </button>
                            );
                          })}
                        </div>
                        <Button onClick={save} disabled={saving} className="w-full">
                          {saving ? "저장 중..." : "저장"}
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
