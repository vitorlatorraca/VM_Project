require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Player = require("../models/Player"); // Certifique-se de que esse caminho está correto

console.log("🔍 Verificando MONGO_URI:", process.env.MONGO_URI);

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ Erro: A variável MONGO_URI não está definida. Verifique seu arquivo .env.");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("🌱 Conectado ao MongoDB para seed de jogadores...");

    const playersDir = path.join(__dirname, "../public/assets/players");
    const playerFiles = fs.readdirSync(playersDir);

    const players = playerFiles.map((file) => ({
      imagePath: `/assets/players/${file}`,
      playerName: path.basename(file, path.extname(file)),
    }));

    await Player.deleteMany({});
    await Player.insertMany(players);

    console.log("✅ Seed de jogadores inserido com sucesso!");
    mongoose.connection.close();
  })
  .catch((error) => console.error("❌ Erro ao conectar ao MongoDB:", error));
