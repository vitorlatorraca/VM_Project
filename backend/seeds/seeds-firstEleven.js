const path = require("path"); // ✅ Agora o path é importado primeiro!
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const fs = require("fs");
const FirstEleven = require("../models/firstEleven");

// 📌 Definir a URI do MongoDB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ Erro: A variável MONGO_URI não está definida. Verifique seu arquivo .env.");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("🌱 Conectado ao MongoDB para seed de escalações...");

    // 📌 Remover escalações antigas antes de inserir novas
    console.log("🗑️ Removendo escalações antigas...");
    await FirstEleven.deleteMany({});
    console.log("✅ Escalações antigas removidas!");

    // 📌 Definição das escalações com todas as informações necessárias
    const firstElevens = [
      {
        match: "Final da Copa do Brasil 2022",
        date: "19/10/2022",
        team: "Corinthians",
        opponent: "Flamengo",
        location: "Neo Química Arena",
        result: "Corinthians 1x2 Flamengo",
        players: [
          { position: "Goleiro", playerName: "Cássio", shirtNumber: 12 },
          { position: "Lateral Direito", playerName: "Fagner", shirtNumber: 23 },
          { position: "Zagueiro 1", playerName: "Gil", shirtNumber: 4 },
          { position: "Zagueiro 2", playerName: "Balbuena", shirtNumber: 3 },
          { position: "Lateral Esquerdo", playerName: "Fábio Santos", shirtNumber: 6 },
          { position: "Volante 1", playerName: "Du Queiroz", shirtNumber: 37 },
          { position: "Volante 2", playerName: "Fausto Vera", shirtNumber: 5 },
          { position: "Meia", playerName: "Renato Augusto", shirtNumber: 8 },
          { position: "Atacante 1", playerName: "Róger Guedes", shirtNumber: 9 },
          { position: "Atacante 2", playerName: "Yuri Alberto", shirtNumber: 7 },
          { position: "Atacante 3", playerName: "Adson", shirtNumber: 28 },
        ],
      },
      {
        match: "Final do Paulistão 2023",
        date: "09/04/2023",
        team: "Palmeiras",
        opponent: "Água Santa",
        location: "Allianz Parque",
        result: "Palmeiras 4x0 Água Santa",
        players: [
          { position: "Goleiro", playerName: "Weverton", shirtNumber: 21 },
          { position: "Lateral Direito", playerName: "Marcos Rocha", shirtNumber: 2 },
          { position: "Zagueiro 1", playerName: "Gustavo Gómez", shirtNumber: 15 },
          { position: "Zagueiro 2", playerName: "Murilo", shirtNumber: 26 },
          { position: "Lateral Esquerdo", playerName: "Piquerez", shirtNumber: 22 },
          { position: "Volante 1", playerName: "Zé Rafael", shirtNumber: 8 },
          { position: "Volante 2", playerName: "Gabriel Menino", shirtNumber: 25 },
          { position: "Meia", playerName: "Raphael Veiga", shirtNumber: 23 },
          { position: "Atacante 1", playerName: "Dudu", shirtNumber: 7 },
          { position: "Atacante 2", playerName: "Endrick", shirtNumber: 9 },
          { position: "Atacante 3", playerName: "Rony", shirtNumber: 10 },
        ],
      },
    ];

    // 📌 Inserindo as novas escalações no banco
    console.log("🔍 Inserindo novas escalações...");
    await FirstEleven.insertMany(firstElevens);

    console.log("🎉 Escalações inseridas com sucesso!");
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  });
