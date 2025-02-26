"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setMessage("Usuário registrado com sucesso! Faça login agora.");
      

      // Redireciona para /login após um tempinho, se quiser
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Erro ao registrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleRegister} className="max-w-sm w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-1">
            Nome
          </label>
          <input
            id="name"
            type="text"
            placeholder="Digite seu nome"
            className="border w-full p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email"
            className="border w-full p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Digite uma senha"
            className="border w-full p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white w-full p-2 rounded mt-2 hover:bg-green-700"
        >
          Registrar
        </button>

        {message && <p className="mt-3 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
