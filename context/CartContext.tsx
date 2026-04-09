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
  items: CartItem[];
  totalBudget: number;
  currency: string;
  composition?: any;
}

interface CartContextType {
  items: CartItem[];
  packageItems: PackageItem[];
  addToCart: (product: Product, quantity?: number, flexibleAmount?: number) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  addPackageToCart: (pkg: PackageItem) => void;
  removePackage: (index: number) => void;
  clearCart: () => void;
  clearByCurrency: (currency: string) => void;
  getCartCount: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);

  let cartSeq = 0;
  const nextCartId = () => `cart-${Date.now()}-${++cartSeq}`;

  const addToCart = useCallback((product: Product, quantity = 1, flexibleAmount?: number) => {
    setItems((prev) => {

      if (flexibleAmount !== undefined) {
        return [...prev, { cartId: nextCartId(), product, quantity: 1, flexibleAmount }];
      }
      const existing = prev.find((i) => i.product.id === product.id && !i.flexibleAmount);
      if (existing) {
        return prev.map((i) =>
          i.cartId === existing.cartId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { cartId: nextCartId(), product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.cartId !== cartId));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity } : i,
        ),
      );
    }
  }, []);

  const addPackageToCart = useCallback((pkg: PackageItem) => {
    setPackageItems((prev) => [...prev, pkg]);
  }, []);

  const removePackage = useCallback((index: number) => {
    setPackageItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPackageItems([]);
  }, []);

  const clearByCurrency = useCallback((currency: string) => {
    setPackageItems((prev) => prev.filter((p) => p.currency !== currency));
    setItems((prev) => prev.filter((i) => getItemCurrency(i) !== currency));
  }, []);

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
        addToCart,
        removeFromCart,
        updateQuantity,
        addPackageToCart,
        removePackage,
        clearCart,
        clearByCurrency,
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
