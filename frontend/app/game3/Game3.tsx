"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Player {
  position: string;
  playerName: string;
  imagePath: string;
  shirtNumber: number;
}

interface Team {
  match: string;
  players: Player[];
}

const Game3: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get<Team[]>("http://localhost:5000/api/firsteleven");
        setTeams(res.data);
      } catch (error) {
        console.error("Erro ao buscar escalação:", error);
      }
    };
    fetchTeams();
  }, []);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setGuess("");
    setAttempts(0);
    setMessage("");
  };

  const handleSubmit = () => {
    if (!selectedPlayer) return;

    if (guess.toLowerCase() === selectedPlayer.playerName.toLowerCase()) {
      setMessage("🎉 Parabéns! Você acertou!");
    } else {
      setAttempts(attempts + 1);
      setMessage(`❌ Errado! Tente novamente.`);
    }
    setGuess("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      {!selectedPlayer ? (
        // Tela inicial com o campo de futebol
        <>
          <h1 className="text-3xl font-bold text-center mb-4">Adivinhe os Jogadores</h1>
          <div className="relative w-[600px] h-[400px] bg-green-700 rounded-lg shadow-lg flex flex-wrap p-6">
            {teams.length > 0 &&
              teams[0].players.map((player, index) => (
                <button
                  key={index}
                  className="absolute flex items-center justify-center w-12 h-12 bg-gray-900 text-white font-bold rounded-full"
                  style={{
                    top: `${20 + (index % 5) * 60}px`,
                    left: `${100 + (index % 4) * 100}px`,
                  }}
                  onClick={() => handlePlayerClick(player)}
                >
                  ?
                </button>
              ))}
          </div>
        </>
      ) : (
        // Tela de adivinhação do jogador
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Adivinhe o Jogador</h2>
          <div className="flex justify-center mb-4">
            <img
              src={`http://localhost:5000${selectedPlayer.imagePath}`}
              alt="Jogador"
              className="w-48 h-48 object-cover rounded-md"
            />
          </div>
          <p className="text-center mb-2 text-lg font-semibold">{selectedPlayer.position}</p>
          <input
            type="text"
            placeholder="Digite o nome do jogador"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="p-2 border rounded w-full text-center text-black"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 p-2 w-full bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600"
          >
            Enviar Resposta
          </button>
          <p className="mt-4 text-center">{message}</p>
          <button
            onClick={() => setSelectedPlayer(null)}
            className="mt-4 p-2 w-full bg-gray-700 text-white font-semibold rounded hover:bg-gray-800"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
};

export default Game3;
