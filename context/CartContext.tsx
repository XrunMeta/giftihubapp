import v_a3453e, { v_af12cb, v_76a8a9, v_5ab095, v_de06a3 } from "bapkr";
import type { v_678322 } from "vhkgxwheyyipiczd";

export interface CartItem {
  cartId?: string;
  product: v_678322;
  quantity: number;
  flexibleAmount?: number;
}

export function v_15e817(v_ebec57): string {
  if (v_ebec57.flexibleAmount) return v_ebec57.product.flexible_currency ?? "KRW";
  return v_ebec57.product.display_currency ?? "KRW";
}

export function v_e300c4(v_ebec57): number {
  if (v_ebec57.flexibleAmount) return v_ebec57.flexibleAmount;
  return v_ebec57.product.price;
}

export interface PackageItem {
  id?: string;
  items: CartItem[];
  totalBudget: number;
  currency: string;
  composition?: any;
}

interface CartContextType {
  items: CartItem[];
  packageItems: PackageItem[];
  selectedItemIds: Set<string>;
  selectedPackageIds: Set<string>;
  addToCart: (product: v_678322, quantity?: number, flexibleAmount?: number) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  addPackageToCart: (pkg: PackageItem) => void;
  removePackage: (index: number) => void;
  clearCart: () => void;
  clearByCurrency: (currency: string) => void;
  toggleItemSelected: (cartId: string) => void;
  togglePackageSelected: (packageId: string) => void;
  setAllSelected: (selected: boolean, currency?: string) => void;
  isItemSelected: (cartId: string) => boolean;
  isPackageSelected: (packageId: string) => boolean;
  getCartCount: () => number;
  getTotalPrice: () => number;
}

const v_d12089 = v_af12cb<CartContextType | null>(null);

export function v_f931fd({ children: v_21f619 }: { children: v_a3453e.ReactNode }) {
  const [v_4622b9, v_fa923c] = v_5ab095<CartItem[]>([]);
  const [v_5be600, v_6bc833] = v_5ab095<PackageItem[]>([]);
  const [v_6e7be8, v_7a71b5] = v_5ab095<Set<string>>(new Set());
  const [v_942cd6, v_0f7a81] = v_5ab095<Set<string>>(new Set());

  let v_ab9fa9 = 0;
  const v_f0a3b1 = () => `cart-${Date.now()}-${++v_ab9fa9}`;
  const v_af5a51 = () => `pkg-${Date.now()}-${++v_ab9fa9}`;

  const v_7bab4b = v_de06a3((product: v_678322, v_ac2689 = 1, v_6b7b36) => {
    v_fa923c((v_ba2215) => {

      if (v_6b7b36 !== undefined) {
        const v_ceee18 = v_f0a3b1();
        v_7a71b5((v_fd5f43) => new Set(v_fd5f43).add(v_ceee18));
        return [...v_ba2215, { cartId: v_ceee18, product: v_01bee9, quantity: 1, flexibleAmount: v_6b7b36 }];
      }
      const v_3c8572 = v_ba2215.find((v_ebec57) => v_ebec57.product.id === v_01bee9.id && !v_ebec57.flexibleAmount);
      if (v_3c8572) {
        return v_ba2215.map((v_ebec57) =>
          v_ebec57.cartId === v_3c8572.cartId
            ? { ...v_ebec57, quantity: v_ebec57.quantity + v_ac2689 }
            : v_ebec57,
        );
      }
      const v_ceee18 = v_f0a3b1();
      v_7a71b5((v_fd5f43) => new Set(v_fd5f43).add(v_ceee18));
      return [...v_ba2215, { cartId: v_ceee18, product: v_01bee9, quantity: v_ac2689 }];
    });
  }, []);

  const v_af112b = v_de06a3((v_bfdf32) => {
    v_fa923c((v_ba2215) => v_ba2215.filter((v_ebec57) => v_ebec57.cartId !== v_bfdf32));
    v_7a71b5((v_fd5f43) => {
      const v_f4e98d = new Set(v_fd5f43);
      v_f4e98d.delete(v_bfdf32);
      return v_f4e98d;
    });
  }, []);

  const v_3fe605 = v_de06a3((v_bfdf32, v_ac2689) => {
    if (v_ac2689 <= 0) {
      v_af112b(v_bfdf32);
    } else {
      v_fa923c((v_ba2215) =>
        v_ba2215.map((v_ebec57) =>
          v_ebec57.cartId === v_bfdf32 ? { ...v_ebec57, quantity: v_ac2689 } : v_ebec57,
        ),
      );
    }
  }, [v_af112b]);

  const v_81ab78 = v_de06a3((v_e42213) => {
    const v_389afb = v_e42213.id ?? v_af5a51();
    v_6bc833((v_ba2215) => [...v_ba2215, { ...v_e42213, id: v_389afb }]);
    v_0f7a81((v_fd5f43) => new Set(v_fd5f43).add(v_389afb));
  }, []);

  const v_dbcdf7 = v_de06a3((v_a56041) => {
    v_6bc833((v_ba2215) => {
      const v_5f5d6d = v_ba2215[v_a56041];
      if (v_5f5d6d?.id) {
        v_0f7a81((v_fd5f43) => {
          const v_f4e98d = new Set(v_fd5f43);
          v_f4e98d.delete(v_5f5d6d.id!);
          return v_f4e98d;
        });
      }
      return v_ba2215.filter((v_37eab7, v_ebec57) => v_ebec57 !== v_a56041);
    });
  }, []);

  const v_340590 = v_de06a3(() => {
    v_fa923c([]);
    v_6bc833([]);
    v_7a71b5(new Set());
    v_0f7a81(new Set());
  }, []);

  const v_e3ba8c = v_de06a3((v_a832b3) => {
    v_6bc833((v_ba2215) => v_ba2215.filter((v_e2a85c) => v_e2a85c.currency !== v_a832b3));
    v_fa923c((v_ba2215) => v_ba2215.filter((v_ebec57) => v_15e817(v_ebec57) !== v_a832b3));
  }, []);

  const v_445291 = v_de06a3((v_bfdf32) => {
    v_7a71b5((v_fd5f43) => {
      const v_f4e98d = new Set(v_fd5f43);
      if (v_f4e98d.has(v_bfdf32)) v_f4e98d.delete(v_bfdf32);
      else v_f4e98d.add(v_bfdf32);
      return v_f4e98d;
    });
  }, []);

  const v_13681b = v_de06a3((v_77de37) => {
    v_0f7a81((v_fd5f43) => {
      const v_f4e98d = new Set(v_fd5f43);
      if (v_f4e98d.has(v_77de37)) v_f4e98d.delete(v_77de37);
      else v_f4e98d.add(v_77de37);
      return v_f4e98d;
    });
  }, []);

  const v_171edc = v_de06a3((v_587413, v_a832b3) => {
    v_7a71b5((v_ba2215) => {
      const v_f4e98d = new Set(v_ba2215);
      for (const v_ebec57 of v_4622b9) {
        if (!v_ebec57.cartId) continue;
        if (v_a832b3 && v_15e817(v_ebec57) !== v_a832b3) continue;
        if (v_587413) v_f4e98d.add(v_ebec57.cartId);
        else v_f4e98d.delete(v_ebec57.cartId);
      }
      return v_f4e98d;
    });
    v_0f7a81((v_ba2215) => {
      const v_f4e98d = new Set(v_ba2215);
      for (const v_e2a85c of v_5be600) {
        if (!v_e2a85c.id) continue;
        if (v_a832b3 && v_e2a85c.currency !== v_a832b3) continue;
        if (v_587413) v_f4e98d.add(v_e2a85c.id);
        else v_f4e98d.delete(v_e2a85c.id);
      }
      return v_f4e98d;
    });
  }, [v_4622b9, v_5be600]);

  const v_096296 = v_de06a3((v_bfdf32) => v_6e7be8.has(v_bfdf32), [v_6e7be8]);
  const v_686526 = v_de06a3((v_77de37) => v_942cd6.has(v_77de37), [v_942cd6]);

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
        selectedItemIds: v_6e7be8,
        selectedPackageIds: v_942cd6,
        addToCart: v_7bab4b,
        removeFromCart: v_af112b,
        updateQuantity: v_3fe605,
        addPackageToCart: v_81ab78,
        removePackage: v_dbcdf7,
        clearCart: v_340590,
        clearByCurrency: v_e3ba8c,
        toggleItemSelected: v_445291,
        togglePackageSelected: v_13681b,
        setAllSelected: v_171edc,
        isItemSelected: v_096296,
        isPackageSelected: v_686526,
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
