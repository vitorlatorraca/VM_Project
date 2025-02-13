const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const STADIUMS_PATH = path.join(__dirname, "../public/assets/stadiums");

// 📌 Retorna uma imagem aleatória da pasta stadiums
router.get("/random", async (req, res) => {
  try {
    const files = fs.readdirSync(STADIUMS_PATH); // Lista todos os arquivos na pasta
    if (files.length === 0) {
      return res.status(404).json({ message: "Nenhuma imagem encontrada!" });
    }

    const randomFile = files[Math.floor(Math.random() * files.length)]; // Escolhe um aleatório
    res.json({ imageUrl: `/assets/stadiums/${randomFile}` }); // Retorna o caminho correto
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar foto", error: error.message });
  }
});

// 📌 Verificar se a resposta do jogador está correta
router.post("/check", async (req, res) => {
  try {
    const { filename, guessedLatitude, guessedLongitude, guessedYear } = req.body;

    if (!filename) {
      return res.status(400).json({ message: "O nome do arquivo é obrigatório!" });
    }

    const filePath = path.join(STADIUMS_PATH, filename);

    // 📌 Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Imagem não encontrada!" });
    }

    // 🔹 Simulando dados reais (Substituir se necessário)
    const correctLocation = { latitude: -23.55052, longitude: -46.633308 }; // Exemplo: São Paulo
    const correctYear = 1949; // Exemplo de ano correto

    // 📌 Cálculo da distância (fórmula de Haversine)
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    const distance = getDistanceFromLatLonInKm(
      guessedLatitude,
      guessedLongitude,
      correctLocation.latitude,
      correctLocation.longitude
    );

    // 📌 Cálculo da pontuação da localização
    let locationScore = 0;
    if (distance < 10) locationScore = 100;
    else if (distance < 50) locationScore = 75;
    else if (distance < 200) locationScore = 50;
    else if (distance < 500) locationScore = 25;
    else locationScore = 0;

    // 📌 Cálculo da pontuação do ano
    const yearDifference = Math.abs(guessedYear - correctYear);
    let yearScore = 0;
    if (yearDifference === 0) yearScore = 100;
    else if (yearDifference <= 2) yearScore = 75;
    else if (yearDifference <= 5) yearScore = 50;
    else if (yearDifference <= 10) yearScore = 25;
    else yearScore = 0;

    res.json({
      correctLocation,
      correctYear,
      locationScore,
      yearScore
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar resposta", error: error.message });
  }
});

module.exports = router;
