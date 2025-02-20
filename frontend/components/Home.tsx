import { useState } from "react";
import Game from "@/components/Game";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const Home = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    { id: "game1", title: "Jogo de Adivinhação", description: "Tente adivinhar o estádio, o placar e o ano!" },
    { id: "game2", title: "Jogo 2", description: "Outro jogo será adicionado aqui." },
    { id: "game3", title: "Jogo 3", description: "Mais um jogo em breve." },
    { id: "game4", title: "Jogo 4", description: "Último jogo que iremos criar." }
  ];

  return (
    <div className="flex flex-col items-center p-6">
      {selectedGame ? (
        <Game />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {games.map((game) => (
            <Card key={game.id} className="cursor-pointer hover:shadow-lg transition" onClick={() => setSelectedGame(game.id)}>
              <CardHeader>
                <CardTitle>{game.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{game.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;