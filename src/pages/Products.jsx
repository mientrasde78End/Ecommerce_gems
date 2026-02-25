import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get("ecommerce/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💎 Gem Store</h1>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            {/* 👇 IMAGEN */}
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={styles.image}
              />
            ) : (
              <div style={styles.placeholder}>No image</div>
            )}

            <h3>{product.name}</h3>
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>${product.price}</p>

            <button style={styles.button} onClick={() => addToCart(product)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    fontWeight: 300,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    border: "1.5px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    textAlign: "center",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "0.75rem",
  },
  placeholder: {
    height: "150px",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#999",
    borderRadius: "6px",
    marginBottom: "0.75rem",
    fontSize: "0.85rem",
  },
  description: {
    fontSize: "0.9rem",
    color: "#555",
  },
  price: {
    fontWeight: "bold",
    margin: "0.5rem 0",
  },
  button: {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
};
