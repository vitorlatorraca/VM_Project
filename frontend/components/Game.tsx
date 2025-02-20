"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

// 📌 Tipagem para a estrutura da foto retornada pela API
interface Photo {
  imageUrl: string;
  stadiumName: string;
  location?: { lat: number; lng: number }; // Agora é opcional para evitar erro antes da API carregar
  year: number;
  matchScore: string;
}

// 📌 Tipagem para os palpites do usuário!
interface Guess {
  lat: number;
  lng: number;
  year: string;
  stadiumName: string;
  team1: string;
  score1: string;
  team2: string;
  score2: string;
}

// 📌 Tipagem para a resposta da API após enviar um palpite
interface Feedback {
  locationScore: string;
  yearScore: string;
  matchScoreCorrect: boolean;
}

// 🔹 Importar MapContainer dinamicamente para evitar SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

// 📌 Componente para capturar eventos de clique no mapa
const MapEvents: React.FC<{ setGuess: React.Dispatch<React.SetStateAction<Guess>> }> = ({ setGuess }) => {
  const { useMapEvents } = require("react-leaflet");
  useMapEvents({
    click: (e: any) => setGuess((prev) => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng })),
  });
  return null;
};

// 🔹 Corrige os ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const Game: React.FC = () => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [guess, setGuess] = useState<Guess>({
    lat: 0,
    lng: 0,
    year: "",
    stadiumName: "",
    team1: "",
    score1: "",
    team2: "",
    score2: "",
  });
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Buscar foto ao carregar
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        console.log("📸 Chamando API para buscar imagem...");
        const res = await axios.get<Photo>("http://localhost:5000/api/stadiums/random"); // 📌 Mudado para stadiums!
        console.log("✅ Resposta da API (imagem recebida):", res.data);
        setPhoto(res.data);
      } catch (error) {
        console.error("❌ Erro ao buscar foto:", error);
      }
    };
    fetchPhoto();
  }, []);

  const normalizeText = (text: string) => text?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

  const handleSubmit = async () => {
    console.log("📸 Dados da foto no momento do submit:", photo);

    if (!photo || !photo.location) {
      console.error("❌ Erro: photo ou photo.location está undefined!");
      return;
    }

    // 🔹 Verifica se a localização e o ano estão corretos
    const isLocationCorrect =
      Math.abs(guess.lat - photo.location.lat) < 0.1 && Math.abs(guess.lng - photo.location.lng) < 0.1;
    const isYearCorrect = parseInt(guess.year) === photo.year;

    // 🔹 Verifica o nome do estádio ignorando acentos e maiúsculas
    const isStadiumCorrect = normalizeText(guess.stadiumName) === normalizeText(photo.stadiumName);

    // 🔹 Verifica o placar (ignora maiúsculas e acentos nos nomes dos times)
    const matchScoreGuess = `${normalizeText(guess.team1)} ${guess.score1} x ${guess.score2} ${normalizeText(
      guess.team2
    )}`;
    const matchScoreCorrect = normalizeText(matchScoreGuess) === normalizeText(photo.matchScore);

    const newFeedback = {
      locationScore: isLocationCorrect ? "✅ Localização correta!" : "❌ Localização errada!",
      yearScore: isYearCorrect ? "✅ Ano correto!" : "❌ Ano errado!",
      matchScoreCorrect,
    };

    console.log("🟢 Atualizando feedback com:", newFeedback);
    setFeedback(newFeedback);
  };

  // 🚀 Depuração para verificar mudanças em feedback
  useEffect(() => {
    if (feedback) {
      console.log("🔄 Estado de feedback atualizado:", feedback);
    }
  }, [feedback]);

  return (
    <div className="p-4">
      {photo ? (
        <>
          {/* Imagem do jogo */}
          <img
            src={`http://localhost:5000${photo.imageUrl}`}
            alt="Jogo"
            className="w-full h-64 object-cover rounded-md"
          />

          <h2 className="text-lg mt-2">Onde e quando essa foto foi tirada?</h2>

          {/* Barra de pesquisa para estádio */}
          <input
            type="text"
            placeholder="Digite o nome do estádio"
            value={guess.stadiumName}
            onChange={(e) => setGuess({ ...guess, stadiumName: e.target.value })}
            className="mt-2 p-2 border rounded w-full"
          />

          {/* Mapa interativo - Renderiza SOMENTE no cliente */}
          {isClient && (
            <div className="h-64 w-full">
              <MapContainer center={[0, 0]} zoom={2} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {guess.lat !== 0 && guess.lng !== 0 && (
                  <Marker position={[guess.lat, guess.lng]}>
                    <Popup>Você escolheu este local!</Popup>
                  </Marker>
                )}
                <MapEvents setGuess={setGuess} />
              </MapContainer>
            </div>
          )}

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

          <button onClick={handleSubmit} className="mt-2 p-2 bg-blue-500 text-white rounded">Enviar Resposta</button>

          {feedback && (
            <div className="mt-4 p-4 border rounded">
              <p>{feedback.locationScore}</p>
              <p>{feedback.yearScore}</p>
              <p>{feedback.matchScoreCorrect ? "✅ Placar correto!" : "❌ Placar errado!"}</p>
            </div>
          )}
        </>
      ) : <p>Carregando...</p>}
    </div>
  );
};

export default Game;
