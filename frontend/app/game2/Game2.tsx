"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Player {
  imagePath: string;
  playerName: string;
}

const MAX_ATTEMPTS = 7;

const Game2: React.FC = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [blurLevel, setBlurLevel] = useState(10);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get<Player>("http://localhost:5000/api/players/random");
        setPlayer(res.data);
      } catch (error) {
        console.error("Erro ao buscar jogador:", error);
      }
    };
    fetchPlayer();
  }, []);

  const handleSubmit = () => {
    if (!player) return;
    
    if (guess.toLowerCase() === player.playerName.toLowerCase()) {
      setMessage("🎉 Parabéns! Você acertou!");
    } else {
      if (attempts + 1 >= MAX_ATTEMPTS) {
        setMessage(`😢 Fim de jogo! O jogador era ${player.playerName}`);
      } else {
        setAttempts(attempts + 1);
        setBlurLevel(Math.max(0, blurLevel - 2)); // Reduz o blur a cada erro
        setMessage("❌ Errado! Tente novamente.");
      }
    }
    setGuess("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Adivinhe o Jogador</h1>

        {player ? (
          <>
            <div className="flex justify-center mb-4">
              <img
                src={player.imagePath}
                alt="Jogador"
                className="w-64 h-64 object-cover rounded-md"
                style={{ filter: `blur(${blurLevel}px)` }} // Aplica o efeito de blur
              />
            </div>

            <input
              type="text"
              placeholder="Digite o nome do jogador"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="p-2 border rounded w-full text-center"
            />

            <button
              onClick={handleSubmit}
              className="mt-4 p-2 w-full bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              Enviar Resposta
            </button>

            <p className="mt-4 text-center">{message}</p>
            <p className="text-gray-600 text-center mt-2">Tentativas restantes: {MAX_ATTEMPTS - attempts}</p>
          </>
        ) : (
          <p className="text-center">Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default Game2;
