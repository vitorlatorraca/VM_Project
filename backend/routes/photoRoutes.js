const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Caminho para a pasta pública no frontend
const imagesPath = path.join(__dirname, "../../frontend/public/assets/stadiums");

// 📌 Obter uma foto aleatória da pasta pública
router.get("/random", async (req, res) => {
  try {
    const files = fs.readdirSync(imagesPath); // Lê os arquivos da pasta

    if (files.length === 0) {
      return res.status(404).json({ message: "Nenhuma imagem encontrada" });
    }

    // Seleciona uma imagem aleatória
    const randomImage = files[Math.floor(Math.random() * files.length)];

    // Retorna o caminho relativo correto para o frontend
    res.json({ imageUrl: `/assets/stadiums/${randomImage}` });
  } catch (error) {
    console.error("Erro ao buscar imagem aleatória:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// 📌 Criar uma nova foto (Se for necessário no futuro)
router.post("/", async (req, res) => {
  try {
    const { imageUrl, location, year } = req.body;
    res.status(201).json({ message: "Foto adicionada com sucesso!", data: { imageUrl, location, year } });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar foto" });
  }
});

module.exports = router;
