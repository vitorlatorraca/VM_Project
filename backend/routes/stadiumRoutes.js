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

    if (!stadiums || stadiums.length === 0) {
      return res.status(404).json({ message: "Nenhum estádio encontrado no banco de dados" });
    }

    const randomIndex = Math.floor(Math.random() * stadiums.length);
    const selectedStadium = stadiums[randomIndex];

    if (!selectedStadium.location || typeof selectedStadium.location.lat === "undefined") {
      return res.status(500).json({ message: "Erro: O estádio selecionado não tem uma localização válida!" });
    }

    console.log("🏟️ Estádio selecionado:", selectedStadium);
    res.json(selectedStadium);
  } catch (error) {
    console.error("❌ Erro ao buscar estádio aleatório:", error);
    res.status(500).json({ message: "Erro no servidor ao buscar estádio" });
  }
});


module.exports = router;
