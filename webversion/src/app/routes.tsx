import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

import { UserHome } from "./pages/user/UserHome";
import { Marketplace } from "./pages/user/Marketplace";
import { MarketplaceDetail } from "./pages/user/MarketplaceDetail";
import { MarketplacePurchase } from "./pages/user/MarketplacePurchase";
import { MarketplacePurchaseComplete } from "./pages/user/MarketplacePurchaseComplete";
import { MarketplaceSell } from "./pages/user/MarketplaceSell";
import { MarketplaceHistory } from "./pages/user/MarketplaceHistory";
import { MyGifti } from "./pages/user/MyGifti";
import { UsageHistory } from "./pages/user/UsageHistory";
import { MyPage } from "./pages/user/MyPage";
import { GiftiDetail } from "./pages/user/GiftiDetail";
import { Store } from "./pages/user/Store";
import { Purchase } from "./pages/user/Purchase";
import { StorePurchase } from "./pages/user/StorePurchase";
import { PaymentProcess } from "./pages/user/PaymentProcess";
import { GiftiTransfer } from "./pages/user/GiftiTransfer";
import { GiftiTransferConfirm } from "./pages/user/GiftiTransferConfirm";
import { GiftiTransferComplete } from "./pages/user/GiftiTransferComplete";
import { GiftiRefund } from "./pages/user/GiftiRefund";

import { MerchantHome } from "./pages/merchant/MerchantHome";
import { ProcessUsage } from "./pages/merchant/ProcessUsage";
import { MerchantHistory } from "./pages/merchant/MerchantHistory";
import { Settlement } from "./pages/merchant/Settlement";
import { MerchantSettings } from "./pages/merchant/MerchantSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },

  {
    path: "/oth-path",
    children: [
      { index: true, Component: UserHome },
      { path: "marketplace", Component: Marketplace },
      { path: "marketplace/sell", Component: MarketplaceSell },
      { path: "marketplace/history", Component: MarketplaceHistory },
      { path: "marketplace/:id", Component: MarketplaceDetail },
      { path: "marketplace/:id/purchase", Component: MarketplacePurchase },
      { path: "marketplace/:id/complete", Component: MarketplacePurchaseComplete },
      { path: "my-gifti", Component: MyGifti },
      { path: "history", Component: UsageHistory },
      { path: "mypage", Component: MyPage },
      { path: "gifti/:id", Component: GiftiDetail },
      { path: "store", Component: Store },
      { path: "purchase", Component: Purchase },
      { path: "store-purchase", Component: StorePurchase },
      { path: "payment-process", Component: PaymentProcess },
      { path: "gifti/:id/transfer", Component: GiftiTransfer },
      { path: "gifti/:id/transfer-confirm", Component: GiftiTransferConfirm },
      { path: "gifti/:id/transfer-complete", Component: GiftiTransferComplete },
      { path: "gifti/:id/refund", Component: GiftiRefund },
    ],
  },

  {
    path: "/merchant",
    children: [
      { index: true, Component: MerchantHome },
      { path: "process", Component: ProcessUsage },
      { path: "history", Component: MerchantHistory },
      { path: "settlement", Component: Settlement },
      { path: "settings", Component: MerchantSettings },
    ],
  },
]);