require("dotenv").config();
const mongoose = require("mongoose");
const FirstEleven = require("../models/firstEleven");

console.log("🔍 Verificando MONGO_URI:", process.env.MONGO_URI);
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ Erro: MONGO_URI não está definida.");
  process.exit(1);
}

mongoose.connect(mongoURI).then(async () => {
  console.log("🌱 Conectado ao MongoDB para seed de First Eleven...");

  await FirstEleven.deleteMany({});

  const firstElevens = [
    {
      match: "Final da Copa do Brasil 2022",
      date: "19/10/2022",
      team: "Corinthians",
      opponent: "Flamengo",
      players: [
        { position: "Goleiro", playerName: "Cássio", shirtNumber: 12 },
        { position: "Lateral Direito", playerName: "Fagner", shirtNumber: 23 },
        { position: "Zagueiro", playerName: "Gil", shirtNumber: 4 },
        { position: "Zagueiro", playerName: "Balbuena", shirtNumber: 3 },
        { position: "Lateral Esquerdo", playerName: "Fábio Santos", shirtNumber: 6 },
        { position: "Volante", playerName: "Du Queiroz", shirtNumber: 37 },
        { position: "Volante", playerName: "Fausto Vera", shirtNumber: 5 },
        { position: "Meia", playerName: "Renato Augusto", shirtNumber: 8 },
        { position: "Atacante", playerName: "Róger Guedes", shirtNumber: 9 },
        { position: "Atacante", playerName: "Yuri Alberto", shirtNumber: 7 },
        { position: "Atacante", playerName: "Adson", shirtNumber: 28 },
      ],
    },
    {
      match: "Final do Paulistão 2023",
      date: "09/04/2023",
      team: "Palmeiras",
      opponent: "Água Santa",
      players: [
        { position: "Goleiro", playerName: "Weverton", shirtNumber: 21 },
        { position: "Lateral Direito", playerName: "Marcos Rocha", shirtNumber: 2 },
        { position: "Zagueiro", playerName: "Gustavo Gómez", shirtNumber: 15 },
        { position: "Zagueiro", playerName: "Murilo", shirtNumber: 26 },
        { position: "Lateral Esquerdo", playerName: "Piquerez", shirtNumber: 22 },
        { position: "Volante", playerName: "Zé Rafael", shirtNumber: 8 },
        { position: "Volante", playerName: "Gabriel Menino", shirtNumber: 25 },
        { position: "Meia", playerName: "Raphael Veiga", shirtNumber: 23 },
        { position: "Atacante", playerName: "Dudu", shirtNumber: 7 },
        { position: "Atacante", playerName: "Endrick", shirtNumber: 9 },
        { position: "Atacante", playerName: "Rony", shirtNumber: 10 },
      ],
    },
  ];

  await FirstEleven.insertMany(firstElevens);
  console.log("✅ Seed de escalações inserido com sucesso!");
  mongoose.connection.close();
}).catch(error => {
  console.error("❌ Erro ao conectar ao MongoDB:", error);
});
