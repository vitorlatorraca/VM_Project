const express = require("express");
const FirstEleven = require("../models/firstEleven"); // Certifique-se de que esse caminho está correto
const router = express.Router();

// Rota para obter todas as escalações
router.get("/", async (req, res) => {
  try {
    const teams = await FirstEleven.find();
    res.json(teams);
  } catch (error) {
    console.error("Erro ao buscar escalação:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

module.exports = router;
