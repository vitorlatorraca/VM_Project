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

    // Remove jogadores e times antigos, para "zerar" a coleção
    await Player.deleteMany({});
    await Team.deleteMany({});

    // Cria alguns times de exemplo
    const teams = await Team.insertMany([
      { name: "Corinthians", logoPath: "/assets/teams/corinthians.png" },
      { name: "Atlético de Madrid", logoPath: "/assets/teams/atletico_madrid.png" }
    ]);

    // Localiza as referências
    const corinthians = teams.find((team) => team.name === "Corinthians");
    const atleticoMadrid = teams.find((team) => team.name === "Atlético de Madrid");

    // Lista de jogadores (com os novos campos)
    const players = [
      {
        imagePath: "/assets/players/Garro.jpg",
        playerName: "Garro",
        fullName: "Rodrigo Garro",
        nationality: "Argentina",
        league: "Brasileirão",
        club: "Corinthians",
        position: "Meia",
        age: 26,
        shirtNumber: 10,
        team: corinthians._id
      },
      {
        imagePath: "/assets/players/memphis.jpg",
        playerName: "Memphis",
        fullName: "Memphis Depay",
        nationality: "Netherlands",
        league: "La Liga",
        club: "Atlético de Madrid",
        position: "Atacante",
        age: 30,
        shirtNumber: 9,
        team: atleticoMadrid._id
      },
      {
        imagePath: "/assets/players/yurialberto.jpg",
        playerName: "Yuri Alberto",
        fullName: "Yuri Alberto Monteiro",
        nationality: "Brazil",
        league: "Brasileirão",
        club: "Corinthians",
        position: "Atacante",
        age: 23,
        shirtNumber: 9,
        team: corinthians._id
      }
    ];

    // Insere os jogadores
    await Player.insertMany(players);

    console.log("✅ Seed de jogadores inserido com sucesso!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  });
