import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/services/store";

export interface CartItem {
  product: Product;
  quantity: number;
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
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addPackageToCart: (pkg: PackageItem) => void;
  removePackage: (index: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i,
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
