import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";

export default function useAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await AuthService.login({
        email,
        password,
      });
      const { token } = response;
      localStorage.setItem("token", token);
      navigate("/users");
    } catch (err) {
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
    handleLogout,
  };
}
