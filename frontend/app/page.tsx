"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Game from "@/components/Game";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    { id: "game1", title: "Jogo de Adivinhação", description: "Adivinhe onde e quando a foto foi tirada." },
    { id: "game2", title: "Jogo 2", description: "Outro jogo emocionante em breve." },
    { id: "game3", title: "Jogo 3", description: "Mais um desafio interessante." },
    { id: "game4", title: "Jogo 4", description: "Novidade chegando." },
  ];

  if (selectedGame === "game1") {
    return <Game />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <h1 className="text-3xl font-bold mb-6">MagoNegroGames.</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
            onClick={() => setSelectedGame(game.id)}
          >
            <CardContent>
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <p className="text-gray-600">{game.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
