require("dotenv").config();
const mongoose = require("mongoose");
const Team = require("../models/Team");

const teams = [
  { name: "Corinthians", logoPath: "/assets/teams/corinthians.png" },
  { name: "Flamengo", logoPath: "/assets/teams/flamengo.png" },
  { name: "Palmeiras", logoPath: "/assets/teams/palmeiras.png" },
  { name: "São Paulo", logoPath: "/assets/teams/saopaulo.png" },
  { name: "Santos", logoPath: "/assets/teams/santos.png" },
  { name: "Grêmio", logoPath: "/assets/teams/gremio.png" },
  { name: "Internacional", logoPath: "/assets/teams/internacional.png" },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Team.deleteMany({}); // Limpa a coleção antes de inserir novos dados
    await Team.insertMany(teams);
    console.log("✅ Times inseridos no banco de dados!");
    mongoose.connection.close();
  })
  .catch(error => console.error("❌ Erro ao conectar ao MongoDB:", error));
