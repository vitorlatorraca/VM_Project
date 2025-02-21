require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Player = require("../models/Player");

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

    // Remover jogadores antigos
    await Player.deleteMany({});

    // Lista de jogadores a serem inseridos
    const players = [
      {
        imagePath: "/assets/players/Garro.jpg",
        playerName: "Garro",
        fullName: "Rodrigo Garro",
        club: "Corinthians",
        age: 26,
        position: "Meia",
        shirtNumber: 10
      },
      {
        imagePath: "/assets/players/memphis.jpg",
        playerName: "Memphis",
        fullName: "Memphis Depay",
        club: "Atlético de Madrid",
        age: 30,
        position: "Atacante",
        shirtNumber: 9
      },
      {
        imagePath: "/assets/players/yurialberto.jpg",
        playerName: "Yuri Alberto",
        fullName: "Yuri Alberto Monteiro",
        club: "Corinthians",
        age: 23,
        position: "Atacante",
        shirtNumber: 9
      }
    ];

    // Inserir no MongoDB
    await Player.insertMany(players);

    console.log("✅ Seed de jogadores inserido com sucesso!");
    mongoose.connection.close();
  })
  .catch((error) => console.error("❌ Erro ao conectar ao MongoDB:", error));
