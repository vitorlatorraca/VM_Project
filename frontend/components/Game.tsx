"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// 📌 Opções para autocomplete
const stadiums = ["Maracanã", "Allianz Arena", "Neo Química Arena", "Santiago Bernabéu", "Camp Nou", "Old Trafford"];
const teams = ["Corinthians", "Palmeiras", "Real Madrid", "Barcelona", "Manchester United", "Bayern Munich"];

interface Photo {
  imageUrl: string;
  stadiumName: string;
  year: number;
  matchScore: string;
}

interface Guess {
  year: string;
  stadiumName: string;
  team1: string;
  score1: string;
  team2: string;
  score2: string;
}

interface Feedback {
  yearScore: string;
  matchScoreCorrect: boolean;
  stadiumScore: string;
  totalPoints: number;
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
  const [filteredStadiums, setFilteredStadiums] = useState<string[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<string[]>([]);

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

  const handleInputChange = (value: string, field: keyof Guess) => {
    setGuess({ ...guess, [field]: value });

    if (field === "stadiumName") {
      setFilteredStadiums(stadiums.filter((s) => normalizeText(s).includes(normalizeText(value))));
    } else if (field === "team1" || field === "team2") {
      setFilteredTeams(teams.filter((t) => normalizeText(t).includes(normalizeText(value))));
    }
  };

  const handleSubmit = () => {
    console.log("📸 Dados da foto no momento do submit:", photo);

    if (!photo) {
      console.error("❌ Erro: photo está undefined!");
      return;
    }

    let totalPoints = 0;

    const isYearCorrect = parseInt(guess.year) === photo.year;
    if (isYearCorrect) totalPoints += 25;

    const isStadiumCorrect = normalizeText(guess.stadiumName) === normalizeText(photo.stadiumName);
    if (isStadiumCorrect) totalPoints += 25;

    const matchScoreGuess = `${normalizeText(guess.team1)} ${guess.score1} x ${guess.score2} ${normalizeText(
      guess.team2
    )}`;
    const matchScoreCorrect = normalizeText(matchScoreGuess) === normalizeText(photo.matchScore);

    if (normalizeText(guess.team1) === normalizeText(photo.matchScore.split(" ")[0])) totalPoints += 12.5;
    if (normalizeText(guess.score1) === normalizeText(photo.matchScore.split(" ")[1])) totalPoints += 12.5;
    if (normalizeText(guess.score2) === normalizeText(photo.matchScore.split(" ")[3])) totalPoints += 12.5;
    if (normalizeText(guess.team2) === normalizeText(photo.matchScore.split(" ")[4])) totalPoints += 12.5;

    const newFeedback = {
      yearScore: isYearCorrect ? "✅ Ano correto!" : "❌ Ano errado!",
      matchScoreCorrect,
      stadiumScore: isStadiumCorrect ? "✅ Estádio correto!" : "❌ Estádio errado!",
      totalPoints,
    };

    console.log("🟢 Atualizando feedback com:", newFeedback);
    setFeedback(newFeedback);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        {photo ? (
          <>
            <img src={`http://localhost:5000${photo.imageUrl}`} alt="Jogo" className="w-full h-64 object-cover rounded-md mb-4" />

            <h2 className="text-lg font-semibold text-center mb-2">Onde e quando essa foto foi tirada?</h2>

            <div className="relative">
              <input
                type="text"
                placeholder="Digite o nome do estádio"
                value={guess.stadiumName}
                onChange={(e) => handleInputChange(e.target.value, "stadiumName")}
                className="mt-2 p-2 border rounded w-full"
              />
              {filteredStadiums.length > 0 && (
                <ul className="absolute bg-white border rounded w-full mt-1 z-10">
                  {filteredStadiums.map((stadium) => (
                    <li key={stadium} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleInputChange(stadium, "stadiumName")}>
                      {stadium}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input type="number" placeholder="Ano"
              value={guess.year}
              onChange={(e) => handleInputChange(e.target.value, "year")}
              className="mt-2 p-2 border rounded w-full"
            />

            <div className="mt-4 grid grid-cols-4 gap-2">
              <div className="relative">
                <input type="text" placeholder="Time 1"
                  value={guess.team1}
                  onChange={(e) => handleInputChange(e.target.value, "team1")}
                  className="p-2 border rounded"
                />
                {filteredTeams.length > 0 && (
                  <ul className="absolute bg-white border rounded w-full mt-1 z-10">
                    {filteredTeams.map((team) => (
                      <li key={team} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleInputChange(team, "team1")}>
                        {team}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input type="number" placeholder="Gols" onChange={(e) => handleInputChange(e.target.value, "score1")} className="p-2 border rounded" />
              <input type="number" placeholder="Gols" onChange={(e) => handleInputChange(e.target.value, "score2")} className="p-2 border rounded" />
              <input type="text" placeholder="Time 2" onChange={(e) => handleInputChange(e.target.value, "team2")} className="p-2 border rounded" />
            </div>

            <button onClick={handleSubmit} className="mt-4 p-2 w-full bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
              Enviar Resposta
            </button>

            {feedback && (
              <div className="mt-4 p-4 border rounded text-center bg-gray-100">
                <p>{feedback.yearScore}</p>
                <p>{feedback.stadiumScore}</p>
                <p>{feedback.matchScoreCorrect ? "✅ Placar correto!" : "❌ Placar errado!"}</p>
                <p className="text-xl font-bold">🏆 Pontuação: {feedback.totalPoints}/100</p>
              </div>
            )}
          </>
        ) : (
          <p className="text-center">Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default Game;
