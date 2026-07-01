import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

interface ErrorResponse {
  message?: string;
  error?: string;
}

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await register({
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      navigate("/anime");
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        setError(
          error.response?.data.message ??
            error.response?.data.error ??
            "No se pudo registrar el usuario."
        );
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Registro</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Nombre completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Pérez"
            required
          />
        </div>

        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="estudiante@utec.edu.pe"
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="miPassword123"
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login">Iniciar sesión</Link>
      </p>
    </main>
  );
}

export default Register;