require("dotenv").config();
const mongoose = require("mongoose");
const FirstEleven = require("../models/firstEleven"); // Caminho corrigido!!!

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
      players: [
        { position: "Goleiro", playerName: "Cássio", imagePath: "/assets/players/cassio.jpg", shirtNumber: 12 },
        { position: "Lateral Direito", playerName: "Fagner", imagePath: "/assets/players/fagner.jpg", shirtNumber: 23 },
        { position: "Zagueiro", playerName: "Gil", imagePath: "/assets/players/gil.jpg", shirtNumber: 4 },
        { position: "Zagueiro", playerName: "Balbuena", imagePath: "/assets/players/balbuena.jpg", shirtNumber: 3 },
        { position: "Lateral Esquerdo", playerName: "Fábio Santos", imagePath: "/assets/players/fabiosantos.jpg", shirtNumber: 6 },
        { position: "Volante", playerName: "Du Queiroz", imagePath: "/assets/players/duqueiroz.jpg", shirtNumber: 37 },
        { position: "Volante", playerName: "Fausto Vera", imagePath: "/assets/players/fausto.jpg", shirtNumber: 5 },
        { position: "Meia", playerName: "Renato Augusto", imagePath: "/assets/players/renato.jpg", shirtNumber: 8 },
        { position: "Atacante", playerName: "Róger Guedes", imagePath: "/assets/players/rogerguedes.jpg", shirtNumber: 9 },
        { position: "Atacante", playerName: "Yuri Alberto", imagePath: "/assets/players/yurialberto.jpg", shirtNumber: 7 },
      ],
    },
    {
      match: "Final do Paulistão 2023",
      players: [
        { position: "Goleiro", playerName: "Cássio", imagePath: "/assets/players/cassio.jpg", shirtNumber: 12 },
        { position: "Lateral Direito", playerName: "Fagner", imagePath: "/assets/players/fagner.jpg", shirtNumber: 23 },
        { position: "Zagueiro", playerName: "Bruno Méndez", imagePath: "/assets/players/brunomendez.jpg", shirtNumber: 25 },
        { position: "Zagueiro", playerName: "Gil", imagePath: "/assets/players/gil.jpg", shirtNumber: 4 },
        { position: "Lateral Esquerdo", playerName: "Matheus Bidu", imagePath: "/assets/players/bidu.jpg", shirtNumber: 26 },
        { position: "Volante", playerName: "Maycon", imagePath: "/assets/players/maycon.jpg", shirtNumber: 29 },
        { position: "Volante", playerName: "Fausto Vera", imagePath: "/assets/players/fausto.jpg", shirtNumber: 5 },
        { position: "Meia", playerName: "Renato Augusto", imagePath: "/assets/players/renato.jpg", shirtNumber: 8 },
        { position: "Atacante", playerName: "Róger Guedes", imagePath: "/assets/players/rogerguedes.jpg", shirtNumber: 10 },
        { position: "Atacante", playerName: "Yuri Alberto", imagePath: "/assets/players/yurialberto.jpg", shirtNumber: 9 },
      ],
    },
  ];

  await FirstEleven.insertMany(firstElevens);
  console.log("✅ Seed de escalações inserido com sucesso!");
  mongoose.connection.close();
}).catch(error => {
  console.error("❌ Erro ao conectar ao MongoDB:", error);
});
