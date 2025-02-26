"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Player {
  position: string;
  playerName: string;
  shirtNumber: number;
}

interface Match {
  match: string;
  date: string;
  opponent: string;
  team: string;
  location: string;
  result: string;
  players: Player[];
}

// Mapeando as posições para um esquema de 1-4-3-3
const FIELD_POSITIONS = [
  ["Goleiro"],
  ["Lateral Esquerdo", "Zagueiro", "Zagueiro", "Lateral Direito"],
  ["Volante", "Meia", "Meia"],
  ["Atacante", "Atacante", "Atacante"],
];

const Game3: React.FC = () => {
  const [matchData, setMatchData] = useState<Match | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/first-eleven");
        setMatchData(res.data[0]); // Pegando a primeira escalação
      } catch (error) {
        console.error("Erro ao buscar escalação:", error);
      }
    };
    fetchMatchData();
  }, []);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setGuess("");
    setMessage("");
  };

  const handleSubmit = () => {
    if (!selectedPlayer) return;
    if (guess.toLowerCase() === selectedPlayer.playerName.toLowerCase()) {
      setMessage("🎉 Acertou! Parabéns!");
    } else {
      setMessage(`❌ Errado! Era ${selectedPlayer.playerName}`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#0D0D2B] p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">Los Titulares</h1>

      {matchData && (
        <div className="text-center mb-6">
          <h2 className="text-2xl text-yellow-300">{matchData.match}</h2>
          <p className="text-lg">
            🏆 {matchData.team} x {matchData.opponent}
          </p>
          <p className="text-lg">📅 {matchData.date} - 📍 {matchData.location}</p>
          <p className="text-lg font-bold">⚽ Resultado: {matchData.result}</p>
        </div>
      )}

      {/* Campo de Futebol */}
      <div className="relative w-full max-w-4xl bg-green-900 p-8 rounded-lg shadow-lg">
        {FIELD_POSITIONS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-8 mb-6">
            {row.map((position, playerIndex) => {
              const player = matchData?.players.find((p) => p.position === position);
              return (
                <motion.button
                  key={playerIndex}
                  className="flex flex-col items-center bg-transparent"
                  onClick={() => player && handlePlayerClick(player)}
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Football_jersey.svg"
                    alt="Camisa"
                    className="w-16"
                  />
                  <span className="text-white text-sm mt-2">❓ {position}</span>
                  <span className="text-yellow-300 font-bold">
                    {"*".repeat(player?.playerName.length || 6)}
                  </span>
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Modal de Adivinhação */}
      {selectedPlayer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center text-black">
            <h2 className="text-xl font-bold mb-4">Quem é esse jogador?</h2>
            <p className="text-gray-600 mb-2">{selectedPlayer.playerName.length} letras</p>
            <input
              type="text"
              placeholder="Digite o nome"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enviar
            </button>
            <p className="mt-4 font-bold">{message}</p>
            <button
              onClick={() => setSelectedPlayer(null)}
              className="mt-4 text-red-500 underline"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game3;
