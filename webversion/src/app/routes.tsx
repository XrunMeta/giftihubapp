import { v_58d265 } from "wtmgqhsnsiyp";
import { v_fafd0c } from "./pages/Root";
import { v_b11d5d } from "./pages/Login";
import { v_6ab0ac } from "./pages/Signup";

import { v_9a33fc } from "./pages/user/UserHome";
import { v_11d8d2 } from "./pages/user/Marketplace";
import { v_5e360c } from "./pages/user/MarketplaceDetail";
import { v_61aaea } from "./pages/user/MarketplacePurchase";
import { v_a1216b } from "./pages/user/MarketplacePurchaseComplete";
import { v_6a39e0 } from "./pages/user/MarketplaceSell";
import { v_366444 } from "./pages/user/MarketplaceHistory";
import { v_4d54ab } from "./pages/user/MyGifti";
import { v_f5bc2f } from "./pages/user/UsageHistory";
import { v_0e1c8d } from "./pages/user/MyPage";
import { v_5b2b38 } from "./pages/user/GiftiDetail";
import { v_51bb20 } from "./pages/user/Store";
import { v_a60d00 } from "./pages/user/Purchase";
import { v_715b9e } from "./pages/user/StorePurchase";
import { v_53ef45 } from "./pages/user/PaymentProcess";
import { v_4334a5 } from "./pages/user/GiftiTransfer";
import { v_342981 } from "./pages/user/GiftiTransferConfirm";
import { v_d0bc80 } from "./pages/user/GiftiTransferComplete";
import { v_178dee } from "./pages/user/GiftiRefund";

import { v_196648 } from "./pages/admin/Keywords";
import { v_d2337d } from "./pages/admin/BrandKeywords";

import { v_e61cfa } from "./pages/merchant/MerchantHome";
import { v_89dc4e } from "./pages/merchant/ProcessUsage";
import { v_9f3d85 } from "./pages/merchant/MerchantHistory";
import { v_4928ef } from "./pages/merchant/Settlement";
import { v_40d611 } from "./pages/merchant/MerchantSettings";

export const v_904d46 = v_58d265([
  {
    path: "/",
    Component: v_fafd0c,
  },
  {
    path: "/login",
    Component: v_b11d5d,
  },
  {
    path: "/signup",
    Component: v_6ab0ac,
  },

  {
    path: "/oth-path",
    children: [
      { index: true, Component: v_9a33fc },
      { path: "marketplace", Component: v_11d8d2 },
      { path: "marketplace/sell", Component: v_6a39e0 },
      { path: "marketplace/history", Component: v_366444 },
      { path: "marketplace/:id", Component: v_5e360c },
      { path: "marketplace/:id/purchase", Component: v_61aaea },
      { path: "marketplace/:id/complete", Component: v_a1216b },
      { path: "my-gifti", Component: v_4d54ab },
      { path: "history", Component: v_f5bc2f },
      { path: "mypage", Component: v_0e1c8d },
      { path: "gifti/:id", Component: v_5b2b38 },
      { path: "store", Component: v_51bb20 },
      { path: "purchase", Component: v_a60d00 },
      { path: "store-purchase", Component: v_715b9e },
      { path: "payment-process", Component: v_53ef45 },
      { path: "gifti/:id/transfer", Component: v_4334a5 },
      { path: "gifti/:id/transfer-confirm", Component: v_342981 },
      { path: "gifti/:id/transfer-complete", Component: v_d0bc80 },
      { path: "gifti/:id/refund", Component: v_178dee },
    ],
  },

  {
    path: "/merchant",
    children: [
      { index: true, Component: v_e61cfa },
      { path: "process", Component: v_89dc4e },
      { path: "history", Component: v_9f3d85 },
      { path: "settlement", Component: v_4928ef },
      { path: "settings", Component: v_40d611 },
    ],
  },

  {
    path: "/oth-path",
    children: [
      { path: "keywords", Component: v_196648 },
      { path: "brands", Component: v_d2337d },
    ],
  },
]);