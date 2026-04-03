import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Search, ShoppingBag, Tag, Calendar, ArrowLeft, Plus, ClipboardList, Loader2 } from "lucide-react";
import { marketplaceApi, type MarketplaceListing } from "../../lib/api";
import { isAuthenticated } from "../../lib/auth";

const CATEGORIES = [
  { value: "", label: "전체" },
  { value: "food", label: "음식" },
  { value: "culture", label: "문화" },
  { value: "convenience", label: "편의점" },
  { value: "beauty", label: "뷰티" },
  { value: "etc", label: "기타" },
] as const;

export function Marketplace() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const fetchListings = async (q?: string, cat?: string, s?: string) => {
    setLoading(true);
    setError("");
    try {
      const params: { q?: string; category?: string; sort?: string } = {};
      if (q) params.q = q;
      if (cat) params.category = cat;
      if (s && s !== "latest") params.sort = s;
      const data = await marketplaceApi.getListings(params);
      setListings(data.listings);
    } catch (e) {
      setError(e instanceof Error ? e.message : "목록을 불러오지 못했습니다");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(query, category, sort);
  }, [category, sort]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchListings(value, category, sort);
    }, 300);
  };

  const handleListingClick = (listing: MarketplaceListing) => {
    navigate(`/oth-path${listing.id}`);
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">중고마켓</h1>
              <p className="text-gray-500 text-xs">할인된 가격으로 기프티를 구매하세요</p>
            </div>
          </div>
          {isAuthenticated() && (
            <button
              onClick={() => navigate("/oth-path")}
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
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {}
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    category === cat.value
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <Select value={sort} onValueChange={setSort}>
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
          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
            </div>
          )}

          {}
          {error && !loading && (
            <div className="text-center py-8 text-red-500 text-sm">{error}</div>
          )}

          {}
          {!loading && !error && listings.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">판매 중인 기프티가 없습니다</p>
            </div>
          )}

          {}
          {!loading && listings.map((listing) => (
            <Card
              key={listing.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleListingClick(listing)}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {}
                  {(listing.thumb_url || listing.image_url) && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={listing.thumb_url || listing.image_url}
                        alt={listing.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">{listing.brand}</p>
                        <h3 className="font-semibold text-sm truncate">{listing.name}</h3>
                      </div>
                      {listing.discount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs whitespace-nowrap">
                          -{listing.discount}%
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div>
                        <p className="text-xs text-gray-400 line-through">
                          ${listing.original_price.toLocaleString()}
                        </p>
                        <p className="text-lg font-bold text-orange-600">
                          ${listing.selling_price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {listing.expiry_date
                          ? new Date(listing.expiry_date * 1000).toLocaleDateString("ko-KR")
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
        {isAuthenticated() && (
          <button
            onClick={() => navigate("/oth-path")}
            className="fixed bottom-20 right-4 w-14 h-14 bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>
    </UserLayout>
  );
}
