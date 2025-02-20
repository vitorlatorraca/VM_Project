"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"; // Usando botão do ShadCN
import { Input } from "@/components/ui/input"; // Usando input do ShadCN
import { Card, CardContent } from "@/components/ui/card"; // Usando card do ShadCN
import "leaflet/dist/leaflet.css";

// 📌 Lista de estádios para autocomplete
const stadiums = ["Maracanã", "Allianz Arena", "Neo Química Arena", "Santiago Bernabéu", "Camp Nou", "Old Trafford"];

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
  totalScore: number;
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
  const [showStadiumDropdown, setShowStadiumDropdown] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await axios.get<Photo>("http://localhost:5000/api/stadiums/random");
        setPhoto(res.data);
      } catch (error) {
        console.error("Erro ao buscar foto:", error);
      }
    };
    fetchPhoto();
  }, []);

  const normalizeText = (text: string) =>
    text?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

  const handleInputChange = (value: string, field: keyof Guess) => {
    setGuess({ ...guess, [field]: value });

    if (field === "stadiumName") {
      const filtered = stadiums.filter((s) => normalizeText(s).includes(normalizeText(value)));
      setFilteredStadiums(filtered);
      setShowStadiumDropdown(filtered.length > 0);
    }
  };

  const handleSelect = (value: string) => {
    setGuess({ ...guess, stadiumName: value });
    setShowStadiumDropdown(false);
  };

  const handleSubmit = async () => {
    if (!photo) return;

    let totalScore = 0;
    const isYearCorrect = parseInt(guess.year) === photo.year;
    if (isYearCorrect) totalScore += 25;

    const isStadiumCorrect = normalizeText(guess.stadiumName) === normalizeText(photo.stadiumName);
    if (isStadiumCorrect) totalScore += 25;

    const matchScoreCorrect = normalizeText(`${guess.team1} ${guess.score1} x ${guess.score2} ${guess.team2}`) ===
      normalizeText(photo.matchScore);
    
    if (matchScoreCorrect) totalScore += 50;

    setFeedback({
      yearScore: isYearCorrect ? "✅ Ano correto!" : "❌ Ano errado!",
      matchScoreCorrect,
      stadiumScore: isStadiumCorrect ? "✅ Estádio correto!" : "❌ Estádio errado!",
      totalScore,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <Card className="shadow-lg w-full max-w-2xl">
        <CardContent className="p-6">
          {photo ? (
            <>
              <img src={`http://localhost:5000${photo.imageUrl}`} alt="Jogo" className="w-full h-64 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold text-center mb-4">Onde e quando essa foto foi tirada?</h2>

              {/* Estádio */}
              <div className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Digite o nome do estádio"
                  value={guess.stadiumName}
                  onChange={(e) => handleInputChange(e.target.value, "stadiumName")}
                  className="w-full"
                />
                {showStadiumDropdown && (
                  <ul className="absolute bg-white border rounded w-full mt-1 z-10">
                    {filteredStadiums.map((stadium) => (
                      <li
                        key={stadium}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSelect(stadium)}
                      >
                        {stadium}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Ano */}
              <Input
                type="number"
                placeholder="Ano"
                value={guess.year}
                onChange={(e) => setGuess({ ...guess, year: e.target.value })}
                className="mb-4 w-full"
              />

              {/* Times e placar */}
              <div className="grid grid-cols-4 gap-2 items-center">
                <Input
                  type="text"
                  placeholder="Time 1"
                  value={guess.team1}
                  onChange={(e) => setGuess({ ...guess, team1: e.target.value })}
                  className="w-full"
                />

                <Input
                  type="number"
                  placeholder="Gols"
                  value={guess.score1}
                  onChange={(e) => setGuess({ ...guess, score1: e.target.value })}
                  className="w-16 text-center"
                />

                <Input
                  type="number"
                  placeholder="Gols"
                  value={guess.score2}
                  onChange={(e) => setGuess({ ...guess, score2: e.target.value })}
                  className="w-16 text-center"
                />

                <Input
                  type="text"
                  placeholder="Time 2"
                  value={guess.team2}
                  onChange={(e) => setGuess({ ...guess, team2: e.target.value })}
                  className="w-full"
                />
              </div>

              <Button onClick={handleSubmit} className="mt-4 w-full">
                Enviar Resposta
              </Button>

              {feedback && (
                <div className="mt-4 p-4 border rounded text-center bg-gray-100">
                  <p className="text-lg font-semibold">
                    Pontuação total: <span className="text-blue-500">{feedback.totalScore} / 100</span>
                  </p>
                  <p>{feedback.yearScore}</p>
                  <p>{feedback.stadiumScore}</p>
                  <p>{feedback.matchScoreCorrect ? "✅ Placar correto!" : "❌ Placar errado!"}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">Carregando...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Game;
