import { useShop } from "./context/ShopContext";
import { useNavigate } from "react-router-dom";

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

export default function Checkout() {
  const { cartItems, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  const enriched = cartItems.map(({ id, qty }) => ({
    ...PRODUCTS.find((p) => p.id === id),
    qty,
  }));

  const subtotal = enriched.reduce((sum, p) => sum + p.price * p.qty, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (enriched.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Your cart is empty</h2>
        <p>Add some items from the shop first.</p>
        <button onClick={() => navigate("/shop")}>Go to Shop</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: "0 20px" }}>
      <h2>Checkout</h2>

      <div style={{ borderTop: "1px solid #eee", marginTop: 20 }}>
        {enriched.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <p style={{ fontWeight: 600, margin: 0 }}>{item.name}</p>
              <p style={{ color: "#888", margin: "4px 0 0", fontSize: 14 }}>
                ${item.price} each
              </p>
            </div>

    
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => updateQuantity(item.id, item.qty - 1)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
            </div>

            <p style={{ fontWeight: 600, minWidth: 70, textAlign: "right" }}>
              ${(item.price * item.qty).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              style={{ background: "none", border: "none", color: "#e55", cursor: "pointer" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

   
      <div style={{ marginTop: 24, textAlign: "right" }}>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Shipping: {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
        <p style={{ fontSize: 20, fontWeight: 700 }}>Total: ${total.toFixed(2)}</p>
      </div>

      <button
        onClick={() => alert("Order placed!")}
        style={{
          marginTop: 24,
          width: "100%",
          padding: "14px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Place Order
      </button>
    </div>
  );
}