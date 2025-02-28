const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

// PATCH /api/users/score  => Atualiza score do user logado
router.patch("/score", authMiddleware, async (req, res) => {
  try {
    const { errors } = req.body; // número de erros ou outro critério
    // Pontuação que usuário ganha: ex.: 10 - errors (mínimo 0)
    const pointsGained = Math.max(0, 10 - errors);

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    user.score = (user.score || 0) + pointsGained;
    await user.save();

    return res.json({ message: "Score atualizado!", newScore: user.score });
  } catch (error) {
    console.error("Erro ao atualizar score:", error);
    res.status(500).json({ error: "Erro interno ao atualizar score" });
  }
});

// GET /api/users/ranking => Lista todos em ordem de maior score para menor
router.get("/ranking", async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 });
    return res.json(users);
  } catch (error) {
    console.error("Erro ao obter ranking:", error);
    res.status(500).json({ error: "Erro interno ao obter ranking" });
  }
});

module.exports = router;
