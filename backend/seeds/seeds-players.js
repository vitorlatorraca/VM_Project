require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Player = require("../models/Player");
const Team = require("../models/Team"); // Importa o modelo do time

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
    await Team.deleteMany({}); // Remove times antigos antes de recriar

    // Criar times
    const teams = await Team.insertMany([
      { name: "Corinthians", logoPath: "/assets/teams/corinthians.png" },
      { name: "Atlético de Madrid", logoPath: "/assets/teams/atletico_madrid.png" }
    ]);

    const corinthians = teams.find(team => team.name === "Corinthians");
    const atleticoMadrid = teams.find(team => team.name === "Atlético de Madrid");

    // Lista de jogadores a serem inseridos
    const players = [
      {
        imagePath: "/assets/players/Garro.jpg",
        playerName: "Garro",
        fullName: "Rodrigo Garro",
        age: 26,
        position: "Meia",
        shirtNumber: 10,
        team: corinthians._id // Relacionando ao time correto
      },
      {
        imagePath: "/assets/players/memphis.jpg",
        playerName: "Memphis",
        fullName: "Memphis Depay",
        age: 30,
        position: "Atacante",
        shirtNumber: 9,
        team: corinthians._id
      },
      {
        imagePath: "/assets/players/yurialberto.jpg",
        playerName: "Yuri Alberto",
        fullName: "Yuri Alberto Monteiro",
        age: 23,
        position: "Atacante",
        shirtNumber: 9,
        team: corinthians._id
      }
    ];

    // Inserir jogadores no MongoDB
    await Player.insertMany(players);

    console.log("✅ Seed de jogadores inserido com sucesso!");
    mongoose.connection.close();
  })
  .catch((error) => console.error("❌ Erro ao conectar ao MongoDB:", error));
