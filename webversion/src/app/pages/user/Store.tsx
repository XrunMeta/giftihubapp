import { useNavigate, Link } from "react-router";
import { UserLayout } from "../../components/UserLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import {
  ArrowLeft,
  Star,
  Gift,
  Store as StoreIcon,
  DollarSign,
  Trophy,
  Coins,
} from "lucide-react";
import { storePackages } from "../../data/mockData";
import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export function Store() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [emblaRef1] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [emblaRef2] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const handlePackageClick = (pkg: any) => {
    console.log("=== Package Click Handler ===");
    console.log("Package clicked:", pkg);

    const stateData = {
      type: "package" as const,
      name: pkg.name,
      amount: pkg.amount,
      image: pkg.image,
      category: "package",
    };

    sessionStorage.setItem("purchaseData", JSON.stringify(stateData));
    console.log("Data saved to sessionStorage:", stateData);

    navigate("/oth-path");
  };

  const handleMerchantClick = (gifti: any) => {
    console.log("Merchant gifti clicked:", gifti);
    const stateData = {
      type: "merchant" as const,
      name: gifti.name,
      amount: gifti.amount,
      image: gifti.image,
      category: gifti.category,
    };

    sessionStorage.setItem("purchaseData", JSON.stringify(stateData));
    console.log("Data saved to sessionStorage:", stateData);

    navigate("/oth-path");
  };

  const merchantGiftis = [
    {
      id: 1,
      name: "스타벅스",
      amount: 50,
      image:
        "https://images.unsplash.com/photo-1589476993333-f55b84301219?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyYnVja3MlMjBjb2ZmZWV8ZW58MXx8fHwxNzcxOTI2NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "cafe",
    },
    {
      id: 2,
      name: "BBQ 치킨",
      amount: 30,
      image:
        "https://images.unsplash.com/photo-1694853651800-3e9b4aa96a42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjBmb29kfGVufDF8fHx8MTc3MTkyNjU2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "food",
    },
    {
      id: 3,
      name: "세븐일레븐",
      amount: 20,
      image:
        "https://images.unsplash.com/photo-1641440616173-7241e6fe6be9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZW5pZW5jZSUyMHN0b3JlfGVufDF8fHx8MTc3MTg1ODg2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "convenience",
    },
    {
      id: 4,
      name: "도미노피자",
      amount: 40,
      image:
        "https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzcxODg1MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "food",
    },
    {
      id: 5,
      name: "투썸플레이스",
      amount: 25,
      image:
        "https://images.unsplash.com/photo-1506372023823-741c83b836fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwbGF0dGV8ZW58MXx8fHwxNzcxOTI2NTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "cafe",
    },
    {
      id: 6,
      name: "맥도날드",
      amount: 15,
      image:
        "https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NzE4OTg3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "food",
    },
  ];

  const filteredGiftis =
    selectedCategory === "all"
      ? merchantGiftis
      : merchantGiftis.filter(
          (g) => g.category === selectedCategory,
        );

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto">
        {}
        <div className="bg-white border-b p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">
            기프티 스토어
          </h1>
        </div>

        <div className="p-4">
          <div className="bg-gray-100 rounded-xl p-5 mb-6">
            {}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-base text-gray-900 mb-0">
                  원하는 상품을
                </h2>
                <h2 className="text-base text-gray-900">
                  간편하게 구매하세요
                </h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">
                  내 기프티 잔액
                </p>
                <div className="flex items-center gap-1">
                  <Coins className="w-5 h-5 text-orange-500" />
                  <span className="text-xl font-bold text-gray-900">
                    28,448
                  </span>
                </div>
              </div>
            </div>

            {}
            <button
              onClick={() => navigate("/oth-path")}
              className="w-full bg-white rounded-lg py-3 flex items-center justify-center gap-2 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Gift className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                내 기프티
              </span>
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold mb-3">패키지 상품</h3>

            <div className="overflow-hidden -mx-4">
              <div ref={emblaRef1} className="overflow-hidden">
                <div className="flex gap-3 px-4">
                  {storePackages.map((pkg, index) => (
                    <button
                      key={pkg.id}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePackageClick(pkg);
                      }}
                      className="flex-[0_0_140px] min-w-0 py-1 cursor-pointer text-left"
                      type="button"
                    >
                      {}
                      <div className="relative">
                        {pkg.popular && (
                          <div className="absolute -top-1 left-0 z-10">
                            <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 shadow-md">
                              BEST
                            </div>
                          </div>
                        )}
                        <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100 hover:border-orange-200 transition-colors">
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      </div>

                      {}
                      <div className="mt-2">
                        <p className="text-sm font-semibold text-gray-900 mb-0.5 truncate">
                          {pkg.name}
                        </p>
                        <p className="text-xs text-gray-500 mb-1 truncate">
                          {pkg.description}
                        </p>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-orange-500" />
                          <span className="text-lg font-bold text-gray-900">
                            {pkg.amount.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          ₩{(pkg.amount * 1300).toLocaleString()}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="space-y-3 mt-6">
            <h3 className="font-semibold mb-3 pt-6 mt-6 border-t border-gray-200">상점 기프티</h3>
            <div className="space-y-4">
              {}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-orange-500" />
                  <span>베스트 상품</span>
                </h4>
                <div className="overflow-hidden -mx-4">
                  <div
                    ref={emblaRef2}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-3 px-4">
                      {merchantGiftis
                        .slice(0, 10)
                        .map((gifti, index) => (
                          <div
                            key={gifti.id}
                            onClick={() => handleMerchantClick(gifti)}
                            className="flex-[0_0_140px] min-w-0 py-1 cursor-pointer"
                          >
                            {}
                            <div className="relative">
                              {}
                              <div className="absolute -top-1 left-0 z-10">
                                <div
                                  className={`${
                                    index === 0
                                      ? "bg-orange-500"
                                      : index === 1
                                        ? "bg-orange-400"
                                        : index === 2
                                          ? "bg-orange-300"
                                          : "bg-gray-400"
                                  } text-white text-sm font-bold px-2 py-0.5 shadow-md`}
                                >
                                  {index + 1}
                                </div>
                              </div>
                              <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100 hover:border-orange-200 transition-colors">
                                <img
                                  src={gifti.image}
                                  alt={gifti.name}
                                  className="w-full h-32 object-cover"
                                />
                              </div>
                            </div>

                            {}
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 mb-1">
                                {gifti.category === "cafe"
                                  ? "카페"
                                  : gifti.category === "food"
                                    ? "음식점"
                                    : "편의점"}
                              </p>
                              <p className="text-sm font-semibold text-gray-900 mb-1 truncate">
                                {gifti.name}
                              </p>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-orange-500" />
                                <span className="text-lg font-bold text-gray-900">
                                  {gifti.amount}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">
                                ₩{(gifti.amount * 1300).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === "all"
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedCategory("cafe")}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === "cafe"
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  카페
                </button>
                <button
                  onClick={() => setSelectedCategory("food")}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === "food"
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  음식점
                </button>
                <button
                  onClick={() =>
                    setSelectedCategory("convenience")
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === "convenience"
                      ? "bg-orange-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  편의점
                </button>
              </div>

              {}
              <div className="grid grid-cols-2 gap-3">
                {filteredGiftis.map((gifti, index) => (
                  <div
                    key={`grid-${gifti.id}`}
                    onClick={() => handleMerchantClick(gifti)}
                    className="flex flex-col cursor-pointer"
                  >
                    {}
                    <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100 hover:border-orange-200 transition-colors">
                      <img
                        src={gifti.image}
                        alt={gifti.name}
                        className="w-full h-32 object-cover"
                      />
                    </div>

                    {}
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">
                        {gifti.category === "cafe"
                          ? "카페"
                          : gifti.category === "food"
                            ? "음식점"
                            : "편의점"}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mb-1 truncate">
                        {gifti.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-orange-500" />
                        <span className="text-lg font-bold text-gray-900">
                          {gifti.amount}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ₩{(gifti.amount * 1300).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}