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
  dayIndex: number;        // <-- identificador do dia
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
  ["Lateral Direito", "Zagueiro 1", "Zagueiro 2", "Lateral Esquerdo"],
  ["Volante 1", "Volante 2", "Meia"],
  ["Atacante 1", "Atacante 2", "Atacante 3"],
];

// Normaliza a string (remover acentos, etc.)
const normalizeString = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Função para mascarar o nome do jogador, se não tiver sido acertado
const maskPlayerName = (name: string, isRevealed: boolean) => {
  if (isRevealed) return name;
  return name
    .split(" ")
    .map((part) => "*".repeat(part.length))
    .join(" ");
};

// Define que 04/03/2025 é o dia 1 (ajuste o ano se necessário)
function getTodayDayIndex(): number {
  const startDate = new Date("2025-03-04"); // Dia 1
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff + 1; // dayIndex = 1 no dia 04/03/2025
}

const Game3: React.FC = () => {
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [matchData, setMatchData] = useState<Match | null>(null);

  const [currentDay, setCurrentDay] = useState<number>(1); // Dia exibido
  const [todayDayIndex, setTodayDayIndex] = useState<number>(1); // Dia máximo disponível

  // Estados para adivinhar jogadores
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackHistory, setFeedbackHistory] = useState<
    { letter: string; color: string }[][]
  >([]);
  const [correctPlayers, setCorrectPlayers] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  // Total de erros (tentativas erradas)
  const [totalErrors, setTotalErrors] = useState(0);

  // Carrega todas as escalações e define o dia atual
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/first-eleven");
        const data: Match[] = res.data;

        setAllMatches(data);

        // Calcula o dia atual (todayDayIndex)
        const dayIndex = getTodayDayIndex();
        setTodayDayIndex(dayIndex);

        // Filtra apenas escalações cujo dayIndex <= dayIndex atual
        const availableMatches = data.filter((m) => m.dayIndex <= dayIndex);

        if (availableMatches.length === 0) {
          console.warn("Nenhuma escalação disponível para hoje ou dias anteriores.");
        } else {
          // Pega a última escalação disponível
          const lastMatch = availableMatches.sort((a, b) => b.dayIndex - a.dayIndex)[0];
          setCurrentDay(lastMatch.dayIndex);
          setMatchData(lastMatch);
        }
      } catch (error) {
        console.error("Erro ao buscar escalações:", error);
      }
    };
    fetchMatches();
  }, []);

  // Atualiza score no back-end
  async function updateScore(errors: number) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("Usuário não está logado. Não é possível atualizar score.");
        return;
      }

      await axios.patch(
        "http://localhost:5000/api/users/score",
        { errors },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Score atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar score:", error);
    }
  }

  // Navegar para dia anterior
  const handlePreviousDay = () => {
    if (currentDay <= 1) return; // não deixa ir abaixo de 1

    const newDay = currentDay - 1;
    const found = allMatches.find((m) => m.dayIndex === newDay);
    if (!found) {
      console.warn("Não há escalação para o dia " + newDay);
      return;
    }

    resetGuessState();
    setCurrentDay(newDay);
    setMatchData(found);
  };

  // Navegar para próximo dia (até o dia atual)
  const handleNextDay = () => {
    if (currentDay >= todayDayIndex) return; // não avança além de hoje

    const newDay = currentDay + 1;
    const found = allMatches.find((m) => m.dayIndex === newDay);
    if (!found) {
      console.warn("Não há escalação para o dia " + newDay);
      return;
    }

    resetGuessState();
    setCurrentDay(newDay);
    setMatchData(found);
  };

  // Resetar estado de adivinhação
  const resetGuessState = () => {
    setSelectedPlayer(null);
    setGuess("");
    setMessage("");
    setFeedbackHistory([]);
    setCorrectPlayers([]);
    setAttemptsLeft(5);
    setTotalErrors(0);
  };

  // Lógica de clique no jogador
  const handlePlayerClick = (player: Player) => {
    if (!correctPlayers.includes(player.playerName)) {
      setSelectedPlayer(player);
      setGuess("");
      setMessage("");
      setFeedbackHistory([]);
      setAttemptsLeft(5);
    }
  };

  // Lógica de envio de palpite
  const handleSubmit = () => {
    if (!selectedPlayer || attemptsLeft <= 0) return;

    const correctName = normalizeString(selectedPlayer.playerName);
    const userGuess = normalizeString(guess);

    // Se acertar
    if (userGuess === correctName) {
      setMessage("🎉 Acertou! Parabéns!");

      // Marca jogador como correto
      setCorrectPlayers((prev) => {
        const updated = [...prev, selectedPlayer.playerName];

        // Se este acerto for o último jogador
        if (updated.length === (matchData?.players.length ?? 0)) {
          // Atualiza score com totalErrors
          updateScore(totalErrors);
          setTotalErrors(0);
        }
        return updated;
      });

      // Fecha o modal automaticamente
      setSelectedPlayer(null);
      return;
    }

    // Se errou => feedback estilo Wordle
    setTotalErrors((prev) => prev + 1);

    let tempFeedback = Array(correctName.length).fill({
      letter: "",
      color: "bg-gray-400",
    });

    let usedIndices: boolean[] = new Array(correctName.length).fill(false);

    // Marca verde (mesma posição)
    userGuess.split("").forEach((char, index) => {
      if (char === correctName[index]) {
        tempFeedback[index] = { letter: char, color: "bg-green-500" };
        usedIndices[index] = true;
      }
    });

    // Marca amarelo (existe em outra posição)
    userGuess.split("").forEach((char, index) => {
      if (tempFeedback[index].color === "bg-green-500") return;
      const matchIndex = correctName.indexOf(char);
      if (matchIndex !== -1 && !usedIndices[matchIndex]) {
        tempFeedback[index] = { letter: char, color: "bg-yellow-500" };
        usedIndices[matchIndex] = true;
      }
    });

    setFeedbackHistory((prev) => [...prev, tempFeedback]);
    setAttemptsLeft((prev) => prev - 1);

    if (attemptsLeft - 1 === 0) {
      setMessage(`❌ Acabaram as tentativas! Era ${selectedPlayer.playerName}`);
    } else {
      setMessage(`❌ Errado! Você tem ${attemptsLeft - 1} chances restantes.`);
    }
  };

  // Render
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 px-8 py-12 text-black">
      <h1 className="text-4xl font-extrabold mb-6 text-yellow-700 uppercase tracking-wider text-center">
        Escalações da História do Futebol Brasileiro
      </h1>

      {/* Botões de navegação entre dias */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={handlePreviousDay}
          className="bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentDay <= 1}
        >
          Dia Anterior
        </button>
        <button
          onClick={handleNextDay}
          className="bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentDay >= todayDayIndex}
        >
          Próximo Dia
        </button>
      </div>

      {!matchData && (
        <p>
          Carregando escalação... ou nenhuma escalação disponível para este dia.
        </p>
      )}

      {matchData && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-700">
              Dia #{matchData.dayIndex} — {matchData.match}
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

      {/* Modal de palpite (se selectedPlayer != null) */}
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
              className="bg-yellow-600 text-white px-4 py-2 rounded font-bold hover:bg-yellow-700 transition-colors w-full"
            >
              Enviar
            </button>

            <p className="mt-4 font-semibold">{message}</p>

            {/* Botão de fechar manual */}
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
