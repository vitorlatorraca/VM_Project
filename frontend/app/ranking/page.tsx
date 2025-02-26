"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  score: number;
}

export default function RankingPage() {
  const [ranking, setRanking] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/ranking");
        setRanking(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      }
    };
    fetchRanking();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Carregando ranking...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-extrabold text-yellow-700 text-center mb-6">
        Ranking de Usuários
      </h1>

      <div className="max-w-xl mx-auto bg-white rounded shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-2">Posição</th>
              <th className="py-2">Nome</th>
              <th className="py-2">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((user, index) => (
              <tr key={user._id} className="border-b border-gray-100">
                <td className="py-2 px-1">{index + 1}</td>
                <td className="py-2 px-1">{user.name}</td>
                <td className="py-2 px-1">{user.score || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
