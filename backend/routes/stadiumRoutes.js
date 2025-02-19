const express = require("express");
const Stadium = require("../models/Stadium");

const router = express.Router();

// 🔹 Rota para obter todos os estádios
router.get("/", async (req, res) => {
  try {
    const stadiums = await Stadium.find();
    res.json(stadiums);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar estádios" });
  }
});

// 🔹 Rota para obter um estádio aleatório
router.get("/random", async (req, res) => {
  try {
    const stadiums = await Stadium.find();
    if (stadiums.length === 0) {
      return res.status(404).json({ message: "Nenhum estádio encontrado" });
    }
    const randomIndex = Math.floor(Math.random() * stadiums.length);
    res.json(stadiums[randomIndex]);
  } catch (error) {
    console.error("Erro ao buscar estádio aleatório:", error);
    res.status(500).json({ message: "Erro no servidor ao buscar estádio" });
  }
});

module.exports = router;
