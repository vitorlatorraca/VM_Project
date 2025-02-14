"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // 🔹 Para carregamento dinâmico
import { TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";



// 📌 Tipagem para a estrutura da foto retornada pela API
interface Photo {
  imageUrl: string;
}

// 📌 Tipagem para os palpites do usuário!
interface Guess {
  lat: number;
  lng: number;
  year: string;
}

// 📌 Tipagem para a resposta da API após enviar um palpite
interface Feedback {
  locationScore: string;
  yearScore: string;
}

// 🔹 Importar MapContainer dinamicamente para evitar SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});

const Game: React.FC = () => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [guess, setGuess] = useState<Guess>({ lat: 0, lng: 0, year: "" });
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isClient, setIsClient] = useState(false); // Para garantir que só renderiza no cliente

  // ✅ Garantir que roda apenas no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Buscar foto ao carregar
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        console.log("📸 Chamando API para buscar imagem...");
        const res = await axios.get<Photo>("http://localhost:5000/api/photos/random");
        console.log("✅ Resposta da API (imagem recebida):", res.data);
        setPhoto(res.data);
      } catch (error) {
        console.error("❌ Erro ao buscar foto:", error);
      }
    };
    fetchPhoto();
  }, []);

  const handleSubmit = async () => {
    if (!photo) return;

    // 🔹 Extrair apenas o nome do arquivo da URL da imagem
    const filename = photo.imageUrl.split("/").pop();
    if (!filename) {
      console.error("❌ Erro: Nome do arquivo não encontrado!");
      return;
    }

    try {
      console.log("🚀 Enviando palpite para API...");
      const response = await axios.post<Feedback>("http://localhost:5000/api/photos/check", {
        filename, // 🔹 Agora estamos enviando o nome do arquivo!
        guessedLatitude: guess.lat,
        guessedLongitude: guess.lng,
        guessedYear: parseInt(guess.year),
      });

      console.log("✅ Resposta da API:", response.data);
      setFeedback(response.data);
    } catch (error) {
      console.error("❌ Erro ao enviar palpite:", error);
    }
  };

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

          {/* Mapa interativo - Renderiza SOMENTE no cliente */}
          {isClient && (
            <MapContainer center={[guess.lat, guess.lng]} zoom={2} className="h-64 w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[guess.lat, guess.lng]} />
              <MapEvents setGuess={setGuess} />
            </MapContainer>
          )}

          {/* Input para o ano */}
          <input
            type="number"
            placeholder="Ano"
            value={guess.year}
            onChange={(e) => setGuess({ ...guess, year: e.target.value })}
            className="mt-2 p-2 border rounded w-full"
          />

          {/* Botão de envio */}
          <button onClick={handleSubmit} className="mt-2 p-2 bg-blue-500 text-white rounded">
            Enviar Resposta
          </button>

          {/* Exibição do feedback */}
          {feedback && (
            <div className="mt-4 p-4 border rounded">
              <p>📍 Precisão da localização: {feedback.locationScore}</p>
              <p>📅 Precisão do ano: {feedback.yearScore}</p>
            </div>
          )}
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

// 📌 Componente para capturar eventos de clique no mapa
const MapEvents: React.FC<{ setGuess: React.Dispatch<React.SetStateAction<Guess>> }> = ({ setGuess }) => {
  useMapEvents({
    click: (e: any) => setGuess((prev) => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng })), // ✅ Corrigido
  });
  return null;
};

export default Game;
