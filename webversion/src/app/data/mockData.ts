export interface Gifti {
  id: string;
  name: string;
  balance: number;
  originalAmount: number;
  expiryDate: string;
  purchaseDate: string;
  transferCount: number;
  status: "active" | "used" | "expired" | "selling";
  qrCode: string;
  usageHistory: UsageRecord[];
}

export interface UsageRecord {
  id: string;
  date: string;
  amount: number;
  merchantName: string;
  remainingBalance: number;
}

export interface MarketplaceListing {
  id: string;
  giftiName: string;
  originalPrice: number;
  sellingPrice: number;
  discount: number;
  expiryDate: string;
  sellerId: string;
  sellerName: string;
}

export interface StorePackage {
  id: string;
  amount: number;
  bonus?: number;
  popular?: boolean;
  name: string;
  description: string;
  image: string;
}

export const mockGiftis: Gifti[] = [
  {
    id: "1",
    name: "스타벅스 기프티콘",
    balance: 45000,
    originalAmount: 50000,
    expiryDate: "2026-06-30",
    purchaseDate: "2026-01-15",
    transferCount: 0,
    status: "active",
    qrCode: "QR-12345-ABCDE",
    usageHistory: [
      {
        id: "u1",
        date: "2026-02-20",
        amount: 5000,
        merchantName: "스타벅스 강남점",
        remainingBalance: 45000,
      },
    ],
  },
  {
    id: "2",
    name: "GS25 편의점",
    balance: 30000,
    originalAmount: 30000,
    expiryDate: "2026-12-31",
    purchaseDate: "2026-02-01",
    transferCount: 1,
    status: "active",
    qrCode: "QR-67890-FGHIJ",
    usageHistory: [],
  },
  {
    id: "3",
    name: "CU 편의점",
    balance: 15000,
    originalAmount: 20000,
    expiryDate: "2026-05-15",
    purchaseDate: "2026-02-10",
    transferCount: 0,
    status: "active",
    qrCode: "QR-11223-KLMNO",
    usageHistory: [
      {
        id: "u2",
        date: "2026-02-15",
        amount: 5000,
        merchantName: "CU 역삼점",
        remainingBalance: 15000,
      },
    ],
  },
  {
    id: "4",
    name: "올리브영 기프티콘",
    balance: 0,
    originalAmount: 50000,
    expiryDate: "2026-03-31",
    purchaseDate: "2026-01-20",
    transferCount: 0,
    status: "used",
    qrCode: "QR-44556-PQRST",
    usageHistory: [
      {
        id: "u3",
        date: "2026-01-10",
        amount: 50000,
        merchantName: "올리브영 홍대점",
        remainingBalance: 0,
      },
    ],
  },
];

export const mockMarketplaceListings: MarketplaceListing[] = [
  {
    id: "m1",
    giftiName: "스타벅스 아메리카노",
    originalPrice: 5000,
    sellingPrice: 4500,
    discount: 10,
    expiryDate: "2026-04-30",
    sellerId: "seller1",
    sellerName: "김철수",
  },
  {
    id: "m2",
    giftiName: "CGV 영화 관람권",
    originalPrice: 14000,
    sellingPrice: 12000,
    discount: 14,
    expiryDate: "2026-06-30",
    sellerId: "seller2",
    sellerName: "이영희",
  },
  {
    id: "m3",
    giftiName: "배스킨라빈스 패밀리",
    originalPrice: 20000,
    sellingPrice: 18000,
    discount: 10,
    expiryDate: "2026-05-31",
    sellerId: "seller3",
    sellerName: "박민수",
  },
  {
    id: "m4",
    giftiName: "올리브영 상품권",
    originalPrice: 30000,
    sellingPrice: 27000,
    discount: 10,
    expiryDate: "2026-07-31",
    sellerId: "seller4",
    sellerName: "정수진",
  },
];

export const storePackages: StorePackage[] = [
  { 
    id: "p1", 
    amount: 10, 
    name: "스타벅스 패키지", 
    description: "스타벅스 기프티콘 10개", 
    image: "https://images.unsplash.com/photo-1693801874686-d4856b920a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyYnVja3MlMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc3MTg4NDk3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  { 
    id: "p2", 
    amount: 50, 
    name: "BBQ 패키지", 
    description: "BBQ 기프티콘 15개", 
    image: "https://images.unsplash.com/photo-1680405356193-85ed2faf93ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MTkyNDAxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  { 
    id: "p3", 
    amount: 100, 
    popular: true, 
    name: "편의점 패키지", 
    description: "편의점 기프티콘 20개", 
    image: "https://images.unsplash.com/photo-1758570764602-d57bc2922dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb252ZW5pZW5jZSUyMHN0b3JlJTIwa29yZWF8ZW58MXx8fHwxNzcxOTM5Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  { 
    id: "p4", 
    amount: 200, 
    name: "도미노피자 패키지", 
    description: "도미노피자 기프티콘 25개", 
    image: "https://images.unsplash.com/photo-1651978595428-ce1c3b3cc493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE5MzQ3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  { 
    id: "p5", 
    amount: 300, 
    name: "투썸플레이스 패키지", 
    description: "투썸플레이스 기프티콘 30개", 
    image: "https://images.unsplash.com/photo-1643316408393-9328a1e973ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwbGF0dGUlMjBjb2ZmZWV8ZW58MXx8fHwxNzcxOTM5Mzc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  { 
    id: "p6", 
    amount: 500, 
    name: "맥도날드 패키지", 
    description: "맥도날드 기프티콘 40개", 
    image: "https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NzE4OTg3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
];

export interface MerchantTransaction {
  id: string;
  date: string;
  customerName: string;
  giftiName: string;
  amount: number;
  status: "completed" | "pending";
}

export const mockMerchantTransactions: MerchantTransaction[] = [
  {
    id: "t1",
    date: "2026-02-24 14:32",
    customerName: "김** 고객",
    giftiName: "스타벅스 기프티콘",
    amount: 5500,
    status: "completed",
  },
  {
    id: "t2",
    date: "2026-02-24 12:15",
    customerName: "이** 고객",
    giftiName: "GS25 편의점",
    amount: 8200,
    status: "completed",
  },
  {
    id: "t3",
    date: "2026-02-24 10:48",
    customerName: "박** 고객",
    giftiName: "CU 편의점",
    amount: 12000,
    status: "completed",
  },
  {
    id: "t4",
    date: "2026-02-23 18:22",
    customerName: "최** 고객",
    giftiName: "올리브영 기프티콘",
    amount: 25000,
    status: "completed",
  },
];

export interface Settlement {
  month: string;
  totalAmount: number;
  transactionCount: number;
  status: "pending" | "completed" | "processing";
  paidAmount?: number;
  paymentDate?: string;
}

export const mockSettlements: Settlement[] = [
  {
    month: "2026-02",
    totalAmount: 2450000,
    transactionCount: 156,
    status: "pending",
  },
  {
    month: "2026-01",
    totalAmount: 3200000,
    transactionCount: 203,
    status: "completed",
    paidAmount: 3200000,
    paymentDate: "2026-02-10",
  },
  {
    month: "2025-12",
    totalAmount: 2890000,
    transactionCount: 178,
    status: "completed",
    paidAmount: 2890000,
    paymentDate: "2026-01-10",
  },
];