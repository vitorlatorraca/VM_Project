require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ---- Middleware básico ----
app.use(express.json());
app.use(cors());

// ---- Servir arquivos estáticos ----
// Supondo que você armazene as imagens e outros assets em "public/assets"
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// ---- Importar Rotas ----
const authRoutes = require("./routes/authRoutes");
const photoRoutes = require("./routes/photoRoutes");
const stadiumRoutes = require("./routes/stadiumRoutes");
const playerRoutes = require("./routes/playerRoutes");
const firstElevenRoutes = require("./routes/firstElevenRoutes");

// ---- Usar Rotas ----
app.use("/api/auth", authRoutes);          // Rotas de autenticação
app.use("/api/photos", photoRoutes);
app.use("/api/stadiums", stadiumRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/first-eleven", firstElevenRoutes);

// ---- Conexão ao MongoDB ----
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB!!");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });

// ---- Rota de teste ----
app.get("/", (req, res) => {
  res.send("🎮 API do MagoNegroGame rodando!");
});

// ---- Iniciar servidor ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
