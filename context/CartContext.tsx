import v_a3453e, { v_af12cb, v_76a8a9, v_5ab095, v_de06a3 } from "bapkr";
import type { v_678322 } from "vhkgxwheyyipiczd";

export interface CartItem {
  cartId?: string;
  product: v_678322;
  quantity: number;
  flexibleAmount?: number;
}

export interface PackageItem {
  items: CartItem[];
  totalBudget: number;
  currency: string;
  composition?: any;
}

interface CartContextType {
  items: CartItem[];
  packageItems: PackageItem[];
  addToCart: (product: v_678322, quantity?: number, flexibleAmount?: number) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  addPackageToCart: (pkg: PackageItem) => void;
  removePackage: (index: number) => void;
  clearCart: () => void;
  clearByCurrency: (currency: string) => void;
  getCartCount: () => number;
  getTotalPrice: () => number;
}

const v_d12089 = v_af12cb<CartContextType | null>(null);

export function v_f931fd({ children: v_21f619 }: { children: v_a3453e.ReactNode }) {
  const [v_4622b9, v_fa923c] = v_5ab095<CartItem[]>([]);
  const [v_5be600, v_6bc833] = v_5ab095<PackageItem[]>([]);

  let v_ab9fa9 = 0;
  const v_f0a3b1 = () => `cart-${Date.now()}-${++v_ab9fa9}`;

  const v_7bab4b = v_de06a3((product: v_678322, v_ac2689 = 1, v_6b7b36) => {
    v_fa923c((v_ba2215) => {

      if (v_6b7b36 !== undefined) {
        return [...v_ba2215, { cartId: v_f0a3b1(), product: v_01bee9, quantity: 1, flexibleAmount: v_6b7b36 }];
      }
      const v_3c8572 = v_ba2215.find((v_ebec57) => v_ebec57.product.id === v_01bee9.id && !v_ebec57.flexibleAmount);
      if (v_3c8572) {
        return v_ba2215.map((v_ebec57) =>
          v_ebec57.cartId === v_3c8572.cartId
            ? { ...v_ebec57, quantity: v_ebec57.quantity + v_ac2689 }
            : v_ebec57,
        );
      }
      return [...v_ba2215, { cartId: v_f0a3b1(), product: v_01bee9, quantity: v_ac2689 }];
    });
  }, []);

  const v_af112b = v_de06a3((v_bfdf32) => {
    v_fa923c((v_ba2215) => v_ba2215.filter((v_ebec57) => v_ebec57.cartId !== v_bfdf32));
  }, []);

  const v_3fe605 = v_de06a3((v_bfdf32, v_ac2689) => {
    if (v_ac2689 <= 0) {
      v_fa923c((v_ba2215) => v_ba2215.filter((v_ebec57) => v_ebec57.cartId !== v_bfdf32));
    } else {
      v_fa923c((v_ba2215) =>
        v_ba2215.map((v_ebec57) =>
          v_ebec57.cartId === v_bfdf32 ? { ...v_ebec57, quantity: v_ac2689 } : v_ebec57,
        ),
      );
    }
  }, []);

  const v_81ab78 = v_de06a3((v_e42213) => {
    v_6bc833((v_ba2215) => [...v_ba2215, v_e42213]);
  }, []);

  const v_dbcdf7 = v_de06a3((v_a56041) => {
    v_6bc833((v_ba2215) => v_ba2215.filter((v_37eab7, v_ebec57) => v_ebec57 !== v_a56041));
  }, []);

  const v_340590 = v_de06a3(() => {
    v_fa923c([]);
    v_6bc833([]);
  }, []);

  const v_e3ba8c = v_de06a3((v_a832b3) => {
    v_6bc833((v_ba2215) => v_ba2215.filter((v_e2a85c) => v_e2a85c.currency !== v_a832b3));

    v_fa923c((v_ba2215) => v_ba2215.filter((v_ebec57) => {
      if (v_ebec57.flexibleAmount) return (v_ebec57.product.flexible_currency ?? "KRW") !== v_a832b3;
      return v_a832b3 !== "KRW"; 
    }));
  }, []);

  const v_63e412 = v_de06a3(() => {
    const v_29c65a = v_4622b9.reduce((v_dce0a8, v_ebec57) => v_dce0a8 + v_ebec57.quantity, 0);
    const v_a78296 = v_5be600.length;
    return v_29c65a + v_a78296;
  }, [v_4622b9, v_5be600]);

  const v_e60156 = v_de06a3(() => {
    const v_0f1165 = v_4622b9.reduce(
      (v_dce0a8, v_ebec57) => v_dce0a8 + v_ebec57.product.price * v_ebec57.quantity,
      0,
    );
    const v_40812c = v_5be600.reduce((v_dce0a8, v_e2a85c) => v_dce0a8 + v_e2a85c.totalBudget, 0);
    return v_0f1165 + v_40812c;
  }, [v_4622b9, v_5be600]);

  return (
    <CartContext.Provider
      value={{
        items: v_4622b9,
        packageItems: v_5be600,
        addToCart: v_7bab4b,
        removeFromCart: v_af112b,
        updateQuantity: v_3fe605,
        addPackageToCart: v_81ab78,
        removePackage: v_dbcdf7,
        clearCart: v_340590,
        clearByCurrency: v_e3ba8c,
        getCartCount: v_63e412,
        getTotalPrice: v_e60156,
      }}
    >
      {v_21f619}
    </CartContext.Provider>
  );
}

export function v_7a943b(): CartContextType {
  const v_16e2dd = v_76a8a9(v_d12089);
  if (!v_16e2dd) throw new Error("useCart must be used within CartProvider");
  return v_16e2dd;
}
