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

const FIELD_POSITIONS = [
  ["Goleiro"],
  ["Lateral Esquerdo", "Zagueiro 1", "Zagueiro 2", "Lateral Direito"],
  ["Volante 1", "Volante 2", "Meia"],
  ["Atacante 1", "Atacante 2", "Atacante 3"],
];

const normalizeString = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const maskPlayerName = (name: string, isRevealed: boolean) => {
  if (isRevealed) return name;
  return name
    .split(" ")
    .map((part) => "*".repeat(part.length))
    .join(" ");
};

const Game3: React.FC = () => {
  const [matchData, setMatchData] = useState<Match | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackHistory, setFeedbackHistory] = useState<
    { letter: string; color: string }[][]
  >([]);
  const [correctPlayers, setCorrectPlayers] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/first-eleven");
        setMatchData(res.data[0]);
      } catch (error) {
        console.error("Erro ao buscar escalação:", error);
      }
    };
    fetchMatchData();
  }, []);

  const handlePlayerClick = (player: Player) => {
    if (!correctPlayers.includes(player.playerName)) {
      setSelectedPlayer(player);
      setGuess("");
      setMessage("");
    }
  };

  const handleSubmit = () => {
    if (!selectedPlayer || attemptsLeft <= 0) return;

    const correctName = normalizeString(selectedPlayer.playerName);
    const userGuess = normalizeString(guess);

    if (userGuess === correctName) {
      setMessage("🎉 Acertou! Parabéns!");
      setCorrectPlayers((prev) => [...prev, selectedPlayer.playerName]);
      return;
    }

    let tempFeedback = Array(correctName.length).fill({
      letter: "",
      color: "bg-gray-500",
    });

    let usedIndices: boolean[] = new Array(correctName.length).fill(false);

    userGuess.split("").forEach((char, index) => {
      if (char === correctName[index]) {
        tempFeedback[index] = { letter: char, color: "bg-green-500" };
        usedIndices[index] = true;
      }
    });

    userGuess.split("").forEach((char, index) => {
      if (tempFeedback[index].color === "bg-green-500") return;
      const matchIndex = correctName.indexOf(char);
      if (matchIndex !== -1 && !usedIndices[matchIndex]) {
        tempFeedback[index] = { letter: char, color: "bg-yellow-500" };
        usedIndices[matchIndex] = true;
      }
    });

    setFeedbackHistory([...feedbackHistory, tempFeedback]);
    setAttemptsLeft((prev) => prev - 1);

    if (attemptsLeft - 1 === 0) {
      setMessage(`❌ Acabaram as tentativas! Era ${selectedPlayer.playerName}`);
    } else {
      setMessage(`❌ Errado! Você tem ${attemptsLeft - 1} chances restantes.`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#0D0D2B] p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">Los Titulares</h1>

      {matchData && (
        <div className="text-center mb-6">
          <h2 className="text-2xl text-yellow-300">{matchData.match}</h2>
          <p className="text-lg">🏆 {matchData.team} x {matchData.opponent}</p>
          <p className="text-lg">📅 {matchData.date} - 📍 {matchData.location}</p>
          <p className="text-lg font-bold">⚽ Resultado: {matchData.result}</p>
        </div>
      )}

      <div className="relative w-full max-w-4xl bg-green-900 p-8 rounded-lg shadow-lg">
        {FIELD_POSITIONS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-8 mb-6">
            {row.map((position, playerIndex) => {
              const player = matchData?.players.find((p) =>
                p.position.toLowerCase().includes(position.toLowerCase())
              );
              const isCorrect = correctPlayers.includes(player?.playerName || "");

              return (
                <motion.button
                  key={playerIndex}
                  className="flex flex-col items-center bg-transparent"
                  onClick={() => player && handlePlayerClick(player)}
                  whileHover={{ scale: 1.1 }}
                >
                  <img src="/assets/camisa.png" alt="Camisa" className="w-16" />
                  <span className="text-white text-sm mt-2">❓ {position}</span>
                  <span className="text-yellow-300 font-bold">
                    {maskPlayerName(player?.playerName || "", isCorrect)}
                  </span>
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {correctPlayers.length === matchData?.players.length && (
        <div className="mt-6 p-4 bg-yellow-500 text-black font-bold rounded-lg shadow-lg">
          🎉 Você acertou todos os jogadores! Parabéns! 🎉
        </div>
      )}

      {selectedPlayer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black border-2 border-yellow-400 p-6 rounded-lg shadow-lg text-center text-white">
            <h2 className="text-xl font-bold mb-4 text-yellow-300">Quem é esse jogador?</h2>
            
            {feedbackHistory.map((feedbackRow, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-2 mb-2">
                {feedbackRow.map((item, index) => (
                  <span key={index} className={`w-8 h-8 flex items-center justify-center text-lg font-bold ${item.color}`}>
                    {item.letter.toUpperCase()}
                  </span>
                ))}
              </div>
            ))}

            <input
              type="text"
              placeholder="Digite o nome"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="p-2 border rounded w-full text-black mb-4"
            />
            <button onClick={handleSubmit} className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-600">
              Enviar
            </button>
            <p className="mt-4 font-bold">{message}</p>
            <button onClick={() => setSelectedPlayer(null)} className="mt-4 text-red-500 underline">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game3;
