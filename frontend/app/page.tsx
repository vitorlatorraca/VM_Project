"use client";

import Link from "next/link";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <h1 className="text-3xl font-bold mb-6">MagoNegroGames.</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Link href="/game">
          <Card className="p-4 cursor-pointer hover:shadow-lg transition">
            <CardContent>
              <h2 className="font-bold text-lg">Jogo de Adivinhação</h2>
              <p>Adivinhe onde e quando a foto foi tirada.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/game2">
          <Card className="p-4 cursor-pointer hover:shadow-lg transition">
            <CardContent>
              <h2 className="font-bold text-lg">Jogo 2</h2>
              <p>Descubra o jogador a partir da imagem borrada.</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="p-4 opacity-50">
          <CardContent>
            <h2 className="font-bold text-lg">Jogo 3</h2>
            <p>Mais um desafio interessante.</p>
          </CardContent>
        </Card>

        <Card className="p-4 opacity-50">
          <CardContent>
            <h2 className="font-bold text-lg">Jogo 4</h2>
            <p>Novidade chegando.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
