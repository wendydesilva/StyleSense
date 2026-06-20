import { createContext, useContext, useState, useRef } from "react";

const ShopContext = createContext(null);


const PRODUCTS = [
  { id: 1, name: "Floral Midi Dress", category: "Dresses", price: 89 },
  { id: 2, name: "Tailored Blazer", category: "Outerwear", price: 145 },
  { id: 3, name: "High-Waist Jeans", category: "Bottoms", price: 68 },
  { id: 4, name: "Silk Wrap Blouse", category: "Tops", price: 72 },
  { id: 5, name: "Wool Trench Coat", category: "Outerwear", price: 210 },
  { id: 6, name: "Leather Ankle Boots", category: "Shoes", price: 128 },
  { id: 7, name: "Pleated Mini Skirt", category: "Bottoms", price: 54 },
  { id: 8, name: "Cashmere Sweater", category: "Tops", price: 95 },
  { id: 9, name: "Statement Drop Earrings", category: "Accessories", price: 32 },
];

export function ShopProvider({ children }) {
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState({});         
  const [justAddedId, setJustAddedId] = useState(null);
  const addTimeout = useRef(null);

  function toggleWishlist(id) {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function addToCart(id) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setJustAddedId(id);
    clearTimeout(addTimeout.current);
    addTimeout.current = setTimeout(() => setJustAddedId(null), 1200);
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function updateQuantity(id, qty) {
    if (qty < 1) return;
    setCart((prev) => ({ ...prev, [id]: qty }));
  }

  
  const cartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    ...PRODUCTS.find((p) => p.id === Number(id)),
    qty,
  }));

  const value = {
    wishlist, toggleWishlist,
    cart, cartItems, cartCount,
    addToCart, removeFromCart, updateQuantity,
    justAddedId,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside a <ShopProvider>");
  return ctx;
}