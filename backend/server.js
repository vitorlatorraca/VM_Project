require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// Importar Rotas
const authRoutes = require("./routes/authroutes");
app.use("/api/auth", authRoutes);

const photoRoutes = require("./routes/photoRoutes");
app.use("/api/photos", photoRoutes);

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conectado ao MongoDB!"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Rota de teste
app.get("/", (req, res) => {
  res.send("🎮 API do MagoNegroGame rodando!");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
