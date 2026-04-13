import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/services/store";

export interface CartItem {
  cartId?: string;
  product: Product;
  quantity: number;
  flexibleAmount?: number;
}

export function getItemCurrency(i: CartItem): string {
  if (i.flexibleAmount) return i.product.flexible_currency ?? "KRW";
  return i.product.display_currency ?? "KRW";
}

export function getItemUnitPrice(i: CartItem): number {
  if (i.flexibleAmount) return i.flexibleAmount;
  return i.product.price;
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
  addToCart: (product: Product, quantity?: number, flexibleAmount?: number) => void;
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

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());
  const [selectedPackageIds, setSelectedPackageIds] = useState<Set<string>>(new Set());

  let cartSeq = 0;
  const nextCartId = () => `cart-${Date.now()}-${++cartSeq}`;
  const nextPackageId = () => `pkg-${Date.now()}-${++cartSeq}`;

  const addToCart = useCallback((product: Product, quantity = 1, flexibleAmount?: number) => {
    setItems((prev) => {

      if (flexibleAmount !== undefined) {
        const newId = nextCartId();
        setSelectedItemIds((s) => new Set(s).add(newId));
        return [...prev, { cartId: newId, product, quantity: 1, flexibleAmount }];
      }
      const existing = prev.find((i) => i.product.id === product.id && !i.flexibleAmount);
      if (existing) {
        return prev.map((i) =>
          i.cartId === existing.cartId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      const newId = nextCartId();
      setSelectedItemIds((s) => new Set(s).add(newId));
      return [...prev, { cartId: newId, product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
    setSelectedItemIds((s) => {
      const n = new Set(s);
      n.delete(cartId);
      return n;
    });
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity } : i,
        ),
      );
    }
  }, [removeFromCart]);

  const addPackageToCart = useCallback((pkg: PackageItem) => {
    const id = pkg.id ?? nextPackageId();
    setPackageItems((prev) => [...prev, { ...pkg, id }]);
    setSelectedPackageIds((s) => new Set(s).add(id));
  }, []);

  const removePackage = useCallback((index: number) => {
    setPackageItems((prev) => {
      const target = prev[index];
      if (target?.id) {
        setSelectedPackageIds((s) => {
          const n = new Set(s);
          n.delete(target.id!);
          return n;
        });
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPackageItems([]);
    setSelectedItemIds(new Set());
    setSelectedPackageIds(new Set());
  }, []);

  const clearByCurrency = useCallback((currency: string) => {
    setPackageItems((prev) => prev.filter((p) => p.currency !== currency));
    setItems((prev) => prev.filter((i) => getItemCurrency(i) !== currency));
  }, []);

  const toggleItemSelected = useCallback((cartId: string) => {
    setSelectedItemIds((s) => {
      const n = new Set(s);
      if (n.has(cartId)) n.delete(cartId);
      else n.add(cartId);
      return n;
    });
  }, []);

  const togglePackageSelected = useCallback((packageId: string) => {
    setSelectedPackageIds((s) => {
      const n = new Set(s);
      if (n.has(packageId)) n.delete(packageId);
      else n.add(packageId);
      return n;
    });
  }, []);

  const setAllSelected = useCallback((selected: boolean, currency?: string) => {
    setSelectedItemIds((prev) => {
      const n = new Set(prev);
      for (const i of items) {
        if (!i.cartId) continue;
        if (currency && getItemCurrency(i) !== currency) continue;
        if (selected) n.add(i.cartId);
        else n.delete(i.cartId);
      }
      return n;
    });
    setSelectedPackageIds((prev) => {
      const n = new Set(prev);
      for (const p of packageItems) {
        if (!p.id) continue;
        if (currency && p.currency !== currency) continue;
        if (selected) n.add(p.id);
        else n.delete(p.id);
      }
      return n;
    });
  }, [items, packageItems]);

  const isItemSelected = useCallback((cartId: string) => selectedItemIds.has(cartId), [selectedItemIds]);
  const isPackageSelected = useCallback((packageId: string) => selectedPackageIds.has(packageId), [selectedPackageIds]);

  const getCartCount = useCallback(() => {
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const pkgCount = packageItems.length;
    return itemCount + pkgCount;
  }, [items, packageItems]);

  const getTotalPrice = useCallback(() => {
    const itemTotal = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0,
    );
    const pkgTotal = packageItems.reduce((sum, p) => sum + p.totalBudget, 0);
    return itemTotal + pkgTotal;
  }, [items, packageItems]);

  return (
    <CartContext.Provider
      value={{
        items,
        packageItems,
        selectedItemIds,
        selectedPackageIds,
        addToCart,
        removeFromCart,
        updateQuantity,
        addPackageToCart,
        removePackage,
        clearCart,
        clearByCurrency,
        toggleItemSelected,
        togglePackageSelected,
        setAllSelected,
        isItemSelected,
        isPackageSelected,
        getCartCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
