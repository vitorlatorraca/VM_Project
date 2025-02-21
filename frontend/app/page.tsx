"use client";

import Link from "next/link";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white text-black">
      {/* Cabeçalho Premium */}
      <motion.h1
        className="text-6xl font-extrabold mb-10 tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🏆 MagoNegroGames 🏆
      </motion.h1>

      {/* Subtítulo */}
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-10">
        Teste seus conhecimentos e desafie-se em jogos interativos e emocionantes!
      </p>

      {/* Grid de Jogos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full max-w-6xl">
        {/* Jogo 1 */}
        <Link href="/game" className="transform hover:scale-105 transition">
          <motion.div
            className="bg-white shadow-xl rounded-2xl p-6 border border-yellow-500 hover:shadow-yellow-400/50 text-center transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-3 text-yellow-500">🔍 Jogo de Adivinhação</h2>
            <p className="text-gray-600">Adivinhe onde e quando a foto foi tirada.</p>
          </motion.div>
        </Link>

        {/* Jogo 2 */}
        <Link href="/game2" className="transform hover:scale-105 transition">
          <motion.div
            className="bg-white shadow-xl rounded-2xl p-6 border border-yellow-500 hover:shadow-yellow-400/50 text-center transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-3 text-yellow-500">🎭 Jogo 2</h2>
            <p className="text-gray-600">Descubra o jogador a partir da imagem borrada.</p>
          </motion.div>
        </Link>

        {/* Jogo 3 (em breve) */}
        <motion.div
          className="bg-gray-100 shadow-md rounded-2xl p-6 border border-gray-300 text-center opacity-70"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-3 text-gray-500">🔮 Jogo 3</h2>
          <p className="text-gray-500">Novidade chegando...</p>
        </motion.div>
      </div>

      {/* Rodapé */}
      <footer className="mt-16 text-center text-gray-600">
        <p className="text-sm">© 2025 MagoNegroGames. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
