// Carregar variáveis de ambiente
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Importar Rotas
const authRoutes = require("./routes/authRoutes");
const photoRoutes = require("./routes/photoRoutes");
const stadiumRoutes = require("./routes/stadiumRoutes");
app.use("/api/stadiums", stadiumRoutes);


app.use("/api/auth", authRoutes);
app.use("/api/photos", photoRoutes);

// Verificar se a URL do MongoDB está definida
if (!process.env.MONGO_URI) {
  console.error("❌ ERRO: A variável de ambiente MONGO_URI não está definida. Verifique seu arquivo .env!");
  process.exit(1); // Encerra o servidor para evitar erros
}

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Conectado ao MongoDB!"))
  .catch(err => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1); // Encerra o servidor em caso de falha na conexão
  });

// Rota de teste
app.get("/", (req, res) => {
  res.send("🎮 API do MagoNegroGame rodando!");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
