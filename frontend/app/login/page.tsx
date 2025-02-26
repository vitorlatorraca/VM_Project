"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter(); // para redirecionar

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login realizado com sucesso!");
      // Redireciona imediatamente para a Home
      router.push("/");
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Erro ao fazer login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form onSubmit={handleLogin} className="max-w-sm w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Fazer Login</h1>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border p-2 w-full rounded"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            className="border p-2 w-full rounded"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded mt-2 hover:bg-blue-700"
        >
          Entrar
        </button>

        <p className="mt-4 text-sm text-center">
          Ainda não tem conta?{" "}
          <a href="/register" className="text-blue-600 underline">
            Registre-se
          </a>
        </p>

        {message && <p className="mt-3 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
