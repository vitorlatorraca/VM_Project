const express = require("express");
const Player = require("../models/Player"); // Certifique-se de que este caminho está correto

const router = express.Router();

// 📌 Rota para buscar um jogador aleatório
router.get("/random", async (req, res) => {
  try {
    const count = await Player.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomPlayer = await Player.findOne().skip(randomIndex);

    if (!randomPlayer) {
      return res.status(404).json({ message: "Nenhum jogador encontrado!" });
    }

    res.json(randomPlayer);
  } catch (error) {
    console.error("Erro ao buscar jogador:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// 📌 Rota para listar todos os jogadores
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

module.exports = router;
