"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// 📌 Tipagem para a estrutura da foto retornada pela API
interface Photo {
  imageUrl: string;
  stadiumName: string;
  year: number;
  matchScore: string;
}

// 📌 Tipagem para os palpites do usuário!
interface Guess {
  year: string;
  stadiumName: string;
  team1: string;
  score1: string;
  team2: string;
  score2: string;
}

// 📌 Tipagem para a resposta da API após enviar um palpite
interface Feedback {
  yearScore: string;
  matchScoreCorrect: boolean;
  stadiumScore: string;
}

const Game: React.FC = () => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [guess, setGuess] = useState<Guess>({
    year: "",
    stadiumName: "",
    team1: "",
    score1: "",
    team2: "",
    score2: "",
  });
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  // ✅ Buscar foto ao carregar
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        console.log("📸 Chamando API para buscar imagem...");
        const res = await axios.get<Photo>("http://localhost:5000/api/stadiums/random");
        console.log("✅ Resposta da API (imagem recebida):", res.data);
        setPhoto(res.data);
      } catch (error) {
        console.error("❌ Erro ao buscar foto:", error);
      }
    };
    fetchPhoto();
  }, []);

  const normalizeText = (text: string) =>
    text?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

  const handleSubmit = async () => {
    console.log("📸 Dados da foto no momento do submit:", photo);

    if (!photo) {
      console.error("❌ Erro: photo está undefined!");
      return;
    }

    // 🔹 Verifica se o ano está correto
    const isYearCorrect = parseInt(guess.year) === photo.year;

    // 🔹 Verifica o nome do estádio ignorando acentos e maiúsculas
    const isStadiumCorrect = normalizeText(guess.stadiumName) === normalizeText(photo.stadiumName);

    // 🔹 Verifica o placar (ignora maiúsculas e acentos nos nomes dos times)
    const matchScoreGuess = `${normalizeText(guess.team1)} ${guess.score1} x ${guess.score2} ${normalizeText(
      guess.team2
    )}`;
    const matchScoreCorrect = normalizeText(matchScoreGuess) === normalizeText(photo.matchScore);

    const newFeedback = {
      yearScore: isYearCorrect ? "✅ Ano correto!" : "❌ Ano errado!",
      matchScoreCorrect,
      stadiumScore: isStadiumCorrect ? "✅ Estádio correto!" : "❌ Estádio errado!",
    };

    console.log("🟢 Atualizando feedback com:", newFeedback);
    setFeedback(newFeedback);
  };

  return (
    <div className="p-4">
      {photo ? (
        <>
          {/* Imagem do jogo */}
          <img src={`http://localhost:5000${photo.imageUrl}`} alt="Jogo" className="w-full h-64 object-cover rounded-md" />

          <h2 className="text-lg mt-2">Onde e quando essa foto foi tirada?</h2>

          {/* Barra de pesquisa para estádio */}
          <input
            type="text"
            placeholder="Digite o nome do estádio"
            value={guess.stadiumName}
            onChange={(e) => setGuess({ ...guess, stadiumName: e.target.value })}
            className="mt-2 p-2 border rounded w-full"
          />

          {/* Input para o ano */}
          <input
            type="number"
            placeholder="Ano"
            value={guess.year}
            onChange={(e) => setGuess({ ...guess, year: e.target.value })}
            className="mt-2 p-2 border rounded w-full"
          />

          {/* Inputs para o placar */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            <input type="text" placeholder="Time 1" onChange={(e) => setGuess({ ...guess, team1: e.target.value })} className="p-2 border rounded" />
            <input type="number" placeholder="Gols" onChange={(e) => setGuess({ ...guess, score1: e.target.value })} className="p-2 border rounded" />
            <input type="number" placeholder="Gols" onChange={(e) => setGuess({ ...guess, score2: e.target.value })} className="p-2 border rounded" />
            <input type="text" placeholder="Time 2" onChange={(e) => setGuess({ ...guess, team2: e.target.value })} className="p-2 border rounded" />
          </div>

          <button onClick={handleSubmit} className="mt-2 p-2 bg-blue-500 text-white rounded">
            Enviar Resposta
          </button>

          {feedback && (
            <div className="mt-4 p-4 border rounded">
              <p>{feedback.yearScore}</p>
              <p>{feedback.stadiumScore}</p>
              <p>{feedback.matchScoreCorrect ? "✅ Placar correto!" : "❌ Placar errado!"}</p>
            </div>
          )}
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Game;
