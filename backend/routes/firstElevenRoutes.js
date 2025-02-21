const express = require("express");
const FirstEleven = require("../models/firstEleven"); // Corrigido o caminho do modelo
const router = express.Router();

// 📌 Rota para obter todas as escalações das finais
router.get("/", async (req, res) => {
  try {
    const teams = await FirstEleven.find();
    res.json(teams);
  } catch (error) {
    console.error("❌ Erro ao buscar escalação:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

module.exports = router;
