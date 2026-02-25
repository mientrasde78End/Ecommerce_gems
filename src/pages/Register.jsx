import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register/", {
        username,
        password,
      });
      navigate("/login");
    } catch {
      setError("Error creando la cuenta");
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "4rem auto" }}>
      <h1>Crear cuenta</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
      >
        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button>Registrarse</button>
      </form>
    </div>
  );
}
