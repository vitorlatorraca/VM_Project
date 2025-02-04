const express = require("express");
const Stadium = require("../models/Stadium");

const router = express.Router();

// 📌 Rota para obter todos os estádios
router.get("/", async (req, res) => {
  try {
    const stadiums = await Stadium.find();
    res.json(stadiums);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar estádios" });
  }
});

module.exports = router;
