import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { items } = useCart();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>💎 GemStore</div>

      <div style={styles.links}>
        {isAuthenticated && (
          <>
            <Link to="/" style={styles.link}>
              Productos
            </Link>
            <Link to="/cart" style={styles.link}>
              Carrito ({items.length})
            </Link>
            <button onClick={logout} style={styles.logout}>
              Salir
            </button>
          </>
        )}

        {!isAuthenticated && (
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    borderBottom: "1px solid #eaeaea",
    marginBottom: "2rem",
  },
  logo: { fontSize: "1.2rem" },
  links: { display: "flex", gap: "1rem" },
  link: { textDecoration: "none", color: "#000" },
  logout: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
  },
};
