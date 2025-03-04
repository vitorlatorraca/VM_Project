"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black">
      {/* HERO / BANNER */}
      <section className="relative w-full h-[50vh] bg-gradient-to-r from-yellow-500 to-yellow-700 flex items-center justify-center">
        {/* Imagem de fundo por trás do gradiente (opcional) */}
        <img
          src="/assets/hero-bg.jpg" 
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Gradiente de overlay (para escurecer um pouco a imagem) */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        {/* Conteúdo do HERO */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">
            Bem-vindo ao MagoNegroGames Deluxe
          </h1>
          <p className="text-xl font-semibold drop-shadow-sm max-w-xl mx-auto">
            O lugar onde você desafia seus conhecimentos em escalações,
            compete em rankings e se diverte com jogos exclusivos!
          </p>
        </div>
      </section>

      {/* CABEÇALHO FIXO (ex: mostrar usuário logado) */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md -mt-10 mx-6 rounded-lg relative z-20">
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
        <h2 className="text-2xl font-extrabold text-yellow-700">
      
        </h2>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-6">
        <div className="max-w-6xl w-full">
          <h3 className="text-3xl font-bold text-yellow-700 text-center mb-8">
            O que deseja fazer?
          </h3>

          {/* Grid de Opções - Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card Login */}
            <Link
              href="/login"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition relative overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <img
                  src="/assets/icons/login.png"
                  alt="Login"
                  className="w-16 h-16 mb-4"
                />
                <h4 className="text-xl font-semibold text-yellow-600 mb-2">
                  Login
                </h4>
                <p className="text-gray-600">
                  Entre na sua conta e continue sua jornada.
                </p>
              </div>
              <span className="absolute inset-0 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 transition" />
            </Link>

            {/* Card Registrar */}
            <Link
              href="/register"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition relative overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <img
                  src="/assets/icons/register.png"
                  alt="Registrar"
                  className="w-16 h-16 mb-4"
                />
                <h4 className="text-xl font-semibold text-yellow-600 mb-2">
                  Registrar
                </h4>
                <p className="text-gray-600">
                  Crie sua conta e faça parte da comunidade MagoNegro.
                </p>
              </div>
              <span className="absolute inset-0 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 transition" />
            </Link>

            {/* Card Jogar (Game3) */}
            <Link
              href="/game3"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition relative overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <img
                  src="/assets/icons/controller.png"
                  alt="Game Icon"
                  className="w-16 h-16 mb-4"
                />
                <h4 className="text-xl font-semibold text-yellow-600 mb-2">
                  Jogar
                </h4>
                <p className="text-gray-600">
                  Entre em campo, adivinhe escalações e supere seus limites.
                </p>
              </div>
              <span className="absolute inset-0 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 transition" />
            </Link>

            {/* Card Ranking */}
            <Link
              href="/ranking"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition relative overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <img
                  src="/assets/icons/trophy.png"
                  alt="Ranking Icon"
                  className="w-16 h-16 mb-4"
                />
                <h4 className="text-xl font-semibold text-yellow-600 mb-2">
                  Ranking
                </h4>
                <p className="text-gray-600">
                  Veja quem está no topo e dispute a liderança!
                </p>
              </div>
              <span className="absolute inset-0 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 transition" />
            </Link>
          </div>
        </div>
      </main>

      {/* RODAPÉ */}
      <footer className="bg-yellow-700 text-white text-center p-4">
        <p className="text-sm">
          © {new Date().getFullYear()} MagoNegroGames Deluxe - Todos os direitos!
          reservados
        </p>
      </footer>
    </div>
  );
}
