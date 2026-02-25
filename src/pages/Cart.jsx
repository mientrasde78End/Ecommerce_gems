import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, total, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div style={styles.container}>
        <h2>🛒 Carrito</h2>
        <p>Tu carrito está vacío</p>
        <Link to="/">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>🛒 Carrito</h2>

      {items.map((item) => (
        <div key={item.id} style={styles.item}>
          <span>
            {item.name} × {item.quantity}
          </span>

          <button style={styles.remove} onClick={() => removeFromCart(item.id)}>
            ✕
          </button>
        </div>
      ))}

      <hr />

      <h3>Total: ${total}</h3>

      <Link to="/checkout">
        <button style={styles.checkout}>Checkout</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
  },
  remove: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  checkout: {
    marginTop: "1rem",
    padding: "0.6rem 1.2rem",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
