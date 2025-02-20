const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/random", async (req, res) => {
  try {
    // Caminho correto para a pasta de imagens
    const photosDir = path.join(__dirname, "../public/assets/stadiums");

    // Verifica se a pasta existe
    if (!fs.existsSync(photosDir)) {
      console.error("❌ Erro: A pasta de fotos não foi encontrada:", photosDir);
      return res.status(500).json({ error: "A pasta de imagens não existe" });
    }

    // Lista os arquivos da pasta
    const files = fs.readdirSync(photosDir);

    // Se a pasta estiver vazia, retorna erro
    if (files.length === 0) {
      console.error("❌ Erro: Nenhuma imagem encontrada na pasta:", photosDir);
      return res.status(404).json({ error: "Nenhuma imagem encontrada" });
    }

    // Seleciona uma imagem aleatória
    const randomFile = files[Math.floor(Math.random() * files.length)];

    console.log(`📸 Foto selecionada: ${randomFile}`);

    // Retorna a URL da imagem
    res.json({ imageUrl: `/assets/stadiums/${randomFile}` });
  } catch (error) {
    console.error("❌ Erro ao buscar foto:", error);
    res.status(500).json({ error: "Erro ao buscar foto" });
  }
});

module.exports = router;
