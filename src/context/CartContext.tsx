import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartItem {
  key: string;
  name: string;
  price: string; // "4,50€"
  category?: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  getQty: (key: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "krousel-cart-v1";

const parsePrice = (price: string): number => {
  const cleaned = price.replace(/[^\d,.-]/g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.key === item.key);
      if (existing) {
        return prev.map((p) => (p.key === item.key ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (key) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.key === key);
      if (!existing) return prev;
      if (existing.qty <= 1) return prev.filter((p) => p.key !== key);
      return prev.map((p) => (p.key === key ? { ...p, qty: p.qty - 1 } : p));
    });
  };

  const setQty: CartContextValue["setQty"] = (key, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((p) => p.key !== key);
      return prev.map((p) => (p.key === key ? { ...p, qty } : p));
    });
  };

  const clear = () => setItems([]);

  const getQty = (key: string) => items.find((p) => p.key === key)?.qty ?? 0;

  const totalCount = useMemo(() => items.reduce((acc, i) => acc + i.qty, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((acc, i) => acc + parsePrice(i.price) * i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, totalCount, totalPrice, addItem, removeItem, setQty, clear, getQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const formatEuro = (n: number) =>
  new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR" }).format(n);