"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Lê "user" do localStorage (se existir) e atualiza o estado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Função para deslogar
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 text-black flex flex-col">
      {/* Cabeçalho Premium */}
      <header className="flex items-center justify-between p-6 bg-white shadow-md">
        <div className="text-lg font-bold text-yellow-600">
          {user ? (
            <div className="flex items-center gap-4">
              <span>Bem-vindo, {user.name}!</span>
              <button onClick={handleLogout} className="text-red-600 underline">
                Sair
              </button>
            </div>
          ) : (
            <span>Olá, Visitante</span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold text-yellow-700">
          MagoNegroGames Deluxe
        </h1>
      </header>

      {/* Conteúdo principal: Grid de ícones/menus */}
      <main className="flex-1 flex flex-col items-center justify-center p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-700">
            Escolha uma das opções:
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Ícone 1: Login */}
          <Link href="/login" className="flex flex-col items-center group">
            <div className="bg-white p-4 rounded-full shadow-lg hover:shadow-yellow-400 transition">
              <img
                src="/assets/icons/login.png"
                alt="Login Icon"
                className="w-12 h-12"
              />
            </div>
            <span className="mt-2 text-lg font-medium group-hover:text-yellow-600">
              Login
            </span>
          </Link>

          {/* Ícone 2: Registrar */}
          <Link href="/register" className="flex flex-col items-center group">
            <div className="bg-white p-4 rounded-full shadow-lg hover:shadow-yellow-400 transition">
              <img
                src="/assets/icons/register.png"
                alt="Register Icon"
                className="w-12 h-12"
              />
            </div>
            <span className="mt-2 text-lg font-medium group-hover:text-yellow-600">
              Registrar
            </span>
          </Link>

          {/* Ícone 3: Jogar (Game3) */}
          <Link href="/game3" className="flex flex-col items-center group">
            <div className="bg-white p-4 rounded-full shadow-lg hover:shadow-yellow-400 transition">
              <img
                src="/assets/icons/controller.png"
                alt="Game Icon"
                className="w-12 h-12"
              />
            </div>
            <span className="mt-2 text-lg font-medium group-hover:text-yellow-600">
              Jogar
            </span>
          </Link>

          {/* Ícone 4: Ranking */}
          <Link href="/ranking" className="flex flex-col items-center group">
            <div className="bg-white p-4 rounded-full shadow-lg hover:shadow-yellow-400 transition">
              <img
                src="/assets/icons/trophy.png"
                alt="Ranking Icon"
                className="w-12 h-12"
              />
            </div>
            <span className="mt-2 text-lg font-medium group-hover:text-yellow-600">
              Ranking
            </span>
          </Link>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-white p-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MagoNegroGames - Todos os direitos reservados.
      </footer>
    </div>
  );
}
