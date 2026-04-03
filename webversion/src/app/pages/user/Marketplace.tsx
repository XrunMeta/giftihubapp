import { v_5ab095, v_c4deb2, v_e662ae } from "bapkr";
import { v_a04f9c } from "wtmgqhsnsiyp";
import { v_348e5f } from "../../components/UserLayout";
import { v_2dc782, v_e7d43c } from "../../components/ui/card";
import { v_1a40c4 } from "../../components/ui/button";
import { v_6185b9 } from "../../components/ui/badge";
import { v_1b353f } from "../../components/ui/input";
import {
  v_ed7c3b,
  v_38670c,
  v_63e833,
  v_afb4f7,
  v_36bbe2,
} from "../../components/ui/select";
import { v_66816c, v_e4f0c5, v_7dc841, v_429ab0, v_c71054, v_a07c02, v_a43dd8, v_4013d8 } from "nchqfqoebgwu";
import { v_75ac97, type v_ff021d } from "../../lib/api";
import { v_c55bb9 } from "../../lib/auth";

const v_6e79a1 = [
  { value: "", label: "전체" },
  { value: "food", label: "음식" },
  { value: "culture", label: "문화" },
  { value: "convenience", label: "편의점" },
  { value: "beauty", label: "뷰티" },
  { value: "etc", label: "기타" },
] as const;

export function v_11d8d2() {
  const v_9b57fc = v_a04f9c();
  const [v_795bbd, v_c90f4e] = v_5ab095<v_ff021d[]>([]);
  const [v_683210, v_34a50a] = v_5ab095(true);
  const [v_5e9bfe, v_3a7d09] = v_5ab095("");
  const [v_7c5791, v_c57190] = v_5ab095("");
  const [v_8b9cd4, v_f38b96] = v_5ab095("");
  const [v_71d48b, v_0b24a9] = v_5ab095("latest");
  const v_445b5f = v_e662ae<ReturnType<typeof setTimeout>>();

  const v_60f420 = async (v_ab6401, v_9bf432, v_fd5f43) => {
    v_34a50a(true);
    v_3a7d09("");
    try {
      const v_24baff = {};
      if (v_ab6401) v_24baff.q = v_ab6401;
      if (v_9bf432) v_24baff.category = v_9bf432;
      if (v_fd5f43 && v_fd5f43 !== "latest") v_24baff.sort = v_fd5f43;
      const v_9390e8 = await v_75ac97.getListings(v_24baff);
      v_c90f4e(v_9390e8.listings);
    } catch (v_9e86fd) {
      v_3a7d09(v_9e86fd instanceof Error ? v_9e86fd.message : "목록을 불러오지 못했습니다");
    } finally {
      v_34a50a(false);
    }
  };

  v_c4deb2(() => {
    v_60f420(v_7c5791, v_8b9cd4, v_71d48b);
  }, [v_8b9cd4, v_71d48b]);

  const v_5e757d = (v_3b402b) => {
    v_c57190(v_3b402b);
    if (v_445b5f.current) clearTimeout(v_445b5f.current);
    v_445b5f.current = setTimeout(() => {
      v_60f420(v_3b402b, v_8b9cd4, v_71d48b);
    }, 300);
  };

  const v_515644 = (listing: v_ff021d) => {
    v_9b57fc(`/oth-path${v_a8fb42.id}`);
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => v_9b57fc(-1)} className="mr-3">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">중고마켓</h1>
              <p className="text-gray-500 text-xs">할인된 가격으로 기프티를 구매하세요</p>
            </div>
          </div>
          {v_c55bb9() && (
            <button
              onClick={() => v_9b57fc("/oth-path")}
              className="text-gray-500 hover:text-gray-700"
            >
              <ClipboardList className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-4 space-y-4">
          {}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="브랜드 또는 상품명 검색"
              value={v_7c5791}
              onChange={(v_9e86fd) => v_5e757d(v_9e86fd.target.value)}
              className="pl-9"
            />
          </div>

          {}
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
              {v_6e79a1.map((v_9bf432) => (
                <button
                  key={v_9bf432.value}
                  onClick={() => v_f38b96(v_9bf432.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    v_8b9cd4 === v_9bf432.value
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {v_9bf432.label}
                </button>
              ))}
            </div>
            <Select value={v_71d48b} onValueChange={v_0b24a9}>
              <SelectTrigger className="w-[110px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="price_asc">가격 낮은순</SelectItem>
                <SelectItem value="price_desc">가격 높은순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {}
          {v_683210 && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
            </div>
          )}

          {}
          {v_5e9bfe && !v_683210 && (
            <div className="text-center py-8 text-red-500 text-sm">{v_5e9bfe}</div>
          )}

          {}
          {!v_683210 && !v_5e9bfe && v_795bbd.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">판매 중인 기프티가 없습니다</p>
            </div>
          )}

          {}
          {!v_683210 && v_795bbd.map((v_a8fb42) => (
            <Card
              key={v_a8fb42.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => v_515644(v_a8fb42)}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {}
                  {(v_a8fb42.thumb_url || v_a8fb42.image_url) && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={v_a8fb42.thumb_url || v_a8fb42.image_url}
                        alt={v_a8fb42.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">{v_a8fb42.brand}</p>
                        <h3 className="font-semibold text-sm truncate">{v_a8fb42.name}</h3>
                      </div>
                      {v_a8fb42.discount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs whitespace-nowrap">
                          -{v_a8fb42.discount}%
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div>
                        <p className="text-xs text-gray-400 line-through">
                          ${v_a8fb42.original_price.toLocaleString()}
                        </p>
                        <p className="text-lg font-bold text-orange-600">
                          ${v_a8fb42.selling_price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {v_a8fb42.expiry_date
                          ? new Date(v_a8fb42.expiry_date * 1000).toLocaleDateString("ko-KR")
                          : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {}
        {v_c55bb9() && (
          <button
            onClick={() => v_9b57fc("/oth-path")}
            className="fixed bottom-20 right-4 w-14 h-14 bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>
    </UserLayout>
  );
}
