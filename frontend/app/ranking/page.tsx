"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  score: number;
  gamesPlayed?: number; // <-- Número de jogos na semana (opcional)
}

export default function RankingPage() {
  const [ranking, setRanking] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/ranking");
        setRanking(res.data);
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-center text-yellow-400 text-2xl">Carregando ranking...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-6 text-yellow-100">
      <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-8">
        Ranking Semanal de Usuários
      </h1>

      {/* Card explicando as regras do jogo */}
      <div className="max-w-4xl mx-auto mb-8 bg-black bg-opacity-50 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">Regras do Jogo</h2>
        <ul className="list-disc list-inside text-sm leading-relaxed text-yellow-100">
          <li>
            Cada escalação começa valendo <span className="font-bold">100 pontos</span>.
          </li>
          <li>
            A cada erro de palpite, você perde <span className="font-bold">5 pontos</span>.
          </li>
          <li>
            Caso acerte todos os jogadores sem errar, permanece com os <span className="font-bold">100 pontos</span>.
          </li>
          <li>
            Ao final de cada semana, o ranking é <span className="font-bold">resetado</span>.
          </li>
          <li>
            O campo "Jogos na Semana" mostra quantas partidas você jogou desde o último reset.
          </li>
        </ul>
      </div>

      {/* Tabela de ranking */}
      <div className="max-w-4xl mx-auto bg-black bg-opacity-40 rounded-xl shadow-xl p-4">
        <table className="w-full text-left table-auto">
          <thead className="bg-black bg-opacity-50 text-yellow-300">
            <tr>
              <th className="py-3 px-2">Posição</th>
              <th className="py-3 px-2">Nome</th>
              <th className="py-3 px-2">Jogos na Semana</th>
              <th className="py-3 px-2">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((user, index) => (
              <tr
                key={user._id}
                className="border-b border-yellow-700 last:border-b-0 hover:bg-yellow-700 hover:bg-opacity-10 transition"
              >
                <td className="py-3 px-2 font-bold text-yellow-200">{index + 1}</td>
                <td className="py-3 px-2">{user.name}</td>
                <td className="py-3 px-2">
                  {user.gamesPlayed !== undefined ? user.gamesPlayed : 0}
                </td>
                <td className="py-3 px-2">{user.score || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
