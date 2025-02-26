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

// Inverteu lateral direito e esquerdo
const FIELD_POSITIONS = [
  ["Goleiro"],
  ["Lateral Direito", "Zagueiro 1", "Zagueiro 2", "Lateral Esquerdo"],
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

  // Sorteia um jogo ao carregar
  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/first-eleven");
        const allMatches: Match[] = res.data;

        if (allMatches.length > 0) {
          const randomIndex = Math.floor(Math.random() * allMatches.length);
          setMatchData(allMatches[randomIndex]);
        } else {
          console.warn("Não há jogos no banco.");
        }
      } catch (error) {
        console.error("Erro ao buscar escalações:", error);
      }
    };
    fetchMatchData();
  }, []);

  // Abre o modal, resetando feedback e tentativas
  const handlePlayerClick = (player: Player) => {
    if (!correctPlayers.includes(player.playerName)) {
      setSelectedPlayer(player);
      setGuess("");
      setMessage("");
      setFeedbackHistory([]);
      setAttemptsLeft(5);
    }
  };

  // Verifica se o palpite está certo
  const handleSubmit = () => {
    if (!selectedPlayer || attemptsLeft <= 0) return;

    const correctName = normalizeString(selectedPlayer.playerName);
    const userGuess = normalizeString(guess);

    // Se acertar, fecha o modal imediatamente
    if (userGuess === correctName) {
      setMessage("🎉 Acertou! Parabéns!");
      setCorrectPlayers((prev) => [...prev, selectedPlayer.playerName]);

      // Fechar o modal automaticamente:
      setSelectedPlayer(null);

      return; 
    }

    // Caso tenha errado, gerar feedback estilo "Wordle"
    let tempFeedback = Array(correctName.length).fill({
      letter: "",
      color: "bg-gray-400",
    });

    let usedIndices: boolean[] = new Array(correctName.length).fill(false);

    // Verde (mesma posição)
    userGuess.split("").forEach((char, index) => {
      if (char === correctName[index]) {
        tempFeedback[index] = { letter: char, color: "bg-green-500" };
        usedIndices[index] = true;
      }
    });

    // Amarelo (existe, mas fora de posição)
    userGuess.split("").forEach((char, index) => {
      if (tempFeedback[index].color === "bg-green-500") return;
      const matchIndex = correctName.indexOf(char);
      if (matchIndex !== -1 && !usedIndices[matchIndex]) {
        tempFeedback[index] = { letter: char, color: "bg-yellow-500" };
        usedIndices[matchIndex] = true;
      }
    });

    // Seta feedback e reduz tentativas
    setFeedbackHistory((prev) => [...prev, tempFeedback]);
    setAttemptsLeft((prev) => prev - 1);

    if (attemptsLeft - 1 === 0) {
      setMessage(`❌ Acabaram as tentativas! Era ${selectedPlayer.playerName}`);
    } else {
      setMessage(`❌ Errado! Você tem ${attemptsLeft - 1} chances restantes.`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 px-8 py-12 text-black">
      <h1 className="text-4xl font-extrabold mb-6 text-yellow-700 uppercase tracking-wider text-center">
        Escalações da História do Futebol Brasileiro
      </h1>

      {!matchData && <p>Carregando jogo aleatório...</p>}

      {matchData && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-700">
              {matchData.match}
            </h2>
            <p className="text-lg">
              {matchData.team} x {matchData.opponent}
            </p>
            <p className="text-base">
              {matchData.date} — {matchData.location}
            </p>
            <p className="text-lg font-bold">
              Resultado: {matchData.result}
            </p>
          </div>

          {/* Campo de jogo */}
          <div className="relative w-full max-w-4xl bg-green-900 p-8 border-4 border-yellow-600 rounded-xl shadow-xl">
            {FIELD_POSITIONS.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-8 mb-6">
                {row.map((position, playerIndex) => {
                  const player = matchData.players.find((p) =>
                    p.position.toLowerCase().includes(position.toLowerCase())
                  );
                  const isCorrect = correctPlayers.includes(
                    player?.playerName || ""
                  );

                  return (
                    <motion.button
                      key={playerIndex}
                      className="flex flex-col items-center bg-transparent focus:outline-none"
                      onClick={() => player && handlePlayerClick(player)}
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src="/assets/camisa.png"
                        alt="Camisa"
                        className="w-16"
                      />
                      <span className="text-white text-sm mt-2">
                        {/* Sem ponto de interrogação */}
                        {position}
                      </span>
                      <span className="text-yellow-300 font-bold">
                        {maskPlayerName(player?.playerName || "", isCorrect)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>

          {correctPlayers.length === matchData.players.length && (
            <div className="mt-6 p-4 bg-yellow-300 text-black font-bold rounded-lg shadow-lg">
              🎉 Você acertou todos os jogadores! Parabéns! 🎉
            </div>
          )}
        </>
      )}

      {/* Modal (aparece somente se selectedPlayer não estiver nulo) */}
      {selectedPlayer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-yellow-50 border-4 border-yellow-600 p-6 rounded-lg shadow-lg text-center text-black max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-yellow-700">
              Quem é esse jogador?
            </h2>

            {feedbackHistory.map((feedbackRow, rowIndex) => (
              <div key={rowIndex} className="flex justify-center mb-2">
                {feedbackRow.map((item, index) => (
                  <span
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center text-lg font-bold ${item.color} mx-1`}
                  >
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
            <button
              onClick={handleSubmit}
              className="bg-yellow-600 text-white px-4 py-2 rounded font-bold hover:bg-yellow-700 transition-colors"
            >
              Enviar
            </button>

            <p className="mt-4 font-semibold">{message}</p>

            {/* Fechar manualmente, se o usuário quiser */}
            <button
              onClick={() => setSelectedPlayer(null)}
              className="mt-4 text-red-600 underline"
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
