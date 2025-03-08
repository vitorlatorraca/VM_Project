const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const upload = require("../middlewares/uploadMiddleware"); // <-- Import do Multer

// POST /api/auth/register
// Agora usamos upload.single("avatar") para processar o arquivo
router.post("/register", upload.single("avatar"), async (req, res) => {
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

    // Se Multer salvou o arquivo, teremos req.file
    let profilePicPath = "";
    if (req.file) {
      // Exemplo: "uploads/avatar-123.jpg"
      profilePicPath = "uploads/" + req.file.filename;
    }

    // Cria novo usuário
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePic: profilePicPath, // Define a foto de perfil
    });
    await newUser.save();

    // Gera token JWT (opcional, se quiser retornar já no registro)
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || "chave-super-secreta",
      { expiresIn: "1d" }
    );

    // Retorna mensagem, token e dados do usuário
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
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
        profilePic: user.profilePic, // se quiser retornar também
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no servidor ao logar." });
  }
});

module.exports = router;
