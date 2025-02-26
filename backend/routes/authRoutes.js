const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // seu modelo

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se email já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe." });
    }

    // Cria hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria novo usuário
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ error: "Erro no servidor ao registrar." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca usuário por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Compara senha
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Se deu certo, gera token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "chave-super-secreta",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no servidor ao logar." });
  }
});

module.exports = router;
