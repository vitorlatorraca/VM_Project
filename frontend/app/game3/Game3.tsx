"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Player {
  position: string;
  playerName: string;
  imagePath: string;
  shirtNumber: number;
}

const Game3: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/firsteleven");
        setPlayers(res.data[0].players); // Pegando os jogadores da primeira final
      } catch (error) {
        console.error("Erro ao buscar escalação:", error);
      }
    };
    fetchPlayers();
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
    <div className="flex flex-col items-center min-h-screen bg-green-700 p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Adivinhe os Jogadores</h1>
      
      {/* Campo de Futebol */}
      <div className="relative w-full max-w-3xl bg-green-900 p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-4 gap-4">
          {players.map((player, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600"
              onClick={() => handlePlayerClick(player)}
            >
              ❓
            </button>
          ))}
        </div>
      </div>

      {/* Modal de Adivinhação */}
      {selectedPlayer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Quem é esse jogador?</h2>
            <img src={`http://localhost:5000${selectedPlayer.imagePath}`} alt="Jogador" className="w-40 mx-auto mb-4" />
            <input
              type="text"
              placeholder="Digite o nome"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
            <p className="mt-4">{message}</p>
            <button onClick={() => setSelectedPlayer(null)} className="mt-4 text-red-500">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game3;
