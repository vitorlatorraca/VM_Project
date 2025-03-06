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
    // Opcional: redirecionar para a Home
    router.push("/");
  };

  // Verifica se usuário está logado
  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black">
      {/* TOPO / NAVBAR */}
      <nav className="bg-black text-gold flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src="/assets/icons/trophy.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold text-gold">
            MagoNegroGames Deluxe
          </h1>
        </div>

        <div className="flex items-center gap-4 text-white">
          {isLoggedIn ? (
            <>
              <span className="text-sm">
                Bem-vindo, <strong>{user?.name}</strong>!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Sair
              </button>
            </>
          ) : (
            <span className="text-sm italic text-gray-300">
              Você não está logado
            </span>
          )}
        </div>
      </nav>

      {/* HERO / BANNER */}
      <section className="relative w-full h-[50vh] bg-gradient-to-r from-black to-gold flex items-center justify-center">
        {/* Imagem de fundo (opcional) */}
        <img
          src="/assets/hero-bg.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Overlay dourado semi-transparente */}
        <div className="absolute inset-0 bg-yellow-600 bg-opacity-20" />

        {/* Conteúdo do HERO */}
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h2 className="text-5xl font-extrabold drop-shadow-lg mb-4">
            Bem-vindo ao MagoNegroGames Deluxe
          </h2>
          <p className="text-xl font-semibold drop-shadow-sm">
            O lugar onde você desafia seus conhecimentos em escalações,
            compete em rankings e se diverte com jogos exclusivos!
          </p>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-6 bg-gray-100">
        <div className="max-w-6xl w-full">
          <h3 className="text-3xl font-bold text-black text-center mb-8">
            O que deseja fazer?
          </h3>

          {/* Grid de Opções - Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Card Login */}
            <Link
              href={isLoggedIn ? "#" : "/login"}
              className={`rounded-xl shadow-lg transition relative overflow-hidden
                bg-white flex flex-col items-center p-6 text-center
                ${
                  isLoggedIn
                    ? "opacity-50 pointer-events-none"
                    : "hover:shadow-2xl"
                }`}
            >
              <img
                src="/assets/icons/login.png"
                alt="Login"
                className="w-16 h-16 mb-4"
              />
              <h4 className="text-xl font-semibold text-yellow-600 mb-2">
                Login
              </h4>
              {isLoggedIn ? (
                <p className="text-gray-600">
                  Você já está logado!
                </p>
              ) : (
                <p className="text-gray-600">
                  Entre na sua conta e continue sua jornada.
                </p>
              )}
              <span className="absolute inset-0 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 transition" />
            </Link>

            {/* Card Registrar */}
            <Link
              href={isLoggedIn ? "#" : "/register"}
              className={`rounded-xl shadow-lg transition relative overflow-hidden
                bg-white flex flex-col items-center p-6 text-center
                ${
                  isLoggedIn
                    ? "opacity-50 pointer-events-none"
                    : "hover:shadow-2xl"
                }`}
            >
              <img
                src="/assets/icons/register.png"
                alt="Registrar"
                className="w-16 h-16 mb-4"
              />
              <h4 className="text-xl font-semibold text-yellow-600 mb-2">
                Registrar
              </h4>
              {isLoggedIn ? (
                <p className="text-gray-600">
                  Você já tem conta cadastrada.
                </p>
              ) : (
                <p className="text-gray-600">
                  Crie sua conta e faça parte da comunidade MagoNegro.
                </p>
              )}
              <span className="absolute inset-0 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 transition" />
            </Link>

            {/* Card Jogar (Game3) */}
            <Link
              href="/game3"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition relative overflow-hidden flex flex-col items-center p-6 text-center"
            >
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
              <span className="absolute inset-0 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 transition" />
            </Link>

            {/* Card Ranking */}
            <Link
              href="/ranking"
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition relative overflow-hidden flex flex-col items-center p-6 text-center"
            >
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
              <span className="absolute inset-0 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 transition" />
            </Link>

            {/* Card Perfil */}
            <Link
              href={isLoggedIn ? "/profile" : "#"}
              className={`rounded-xl shadow-lg transition relative overflow-hidden
                bg-white flex flex-col items-center p-6 text-center
                ${
                  !isLoggedIn
                    ? "opacity-50 pointer-events-none"
                    : "hover:shadow-2xl"
                }`}
            >
              <img
                src="/assets/icons/profile.png"
                alt="Profile Icon"
                className="w-16 h-16 mb-4"
              />
              <h4 className="text-xl font-semibold text-yellow-600 mb-2">
                Perfil
              </h4>
              {isLoggedIn ? (
                <p className="text-gray-600">
                  Acesse seu perfil e altere sua foto, dados...
                </p>
              ) : (
                <p className="text-gray-600">
                  Faça login para acessar seu perfil.
                </p>
              )}
              <span className="absolute inset-0 bg-yellow-500 bg-opacity-0 hover:bg-opacity-10 transition" />
            </Link>
          </div>
        </div>
      </main>

      {/* RODAPÉ */}
      <footer className="bg-black text-white text-center p-4">
        <p className="text-sm">
          © {new Date().getFullYear()} MagoNegroGames Deluxe - Todos os direitos
          reservados
        </p>
      </footer>
    </div>
  );
}
