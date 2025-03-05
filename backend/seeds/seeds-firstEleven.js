const path = require("path");
// Carrega variáveis de ambiente do .env
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const FirstEleven = require("../models/firstEleven");

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ Erro: A variável MONGO_URI não está definida. Verifique seu arquivo .env.");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("🌱 Conectado ao MongoDB para seed de escalações...");

    console.log("🗑️ Removendo escalações antigas...");
    await FirstEleven.deleteMany({});
    console.log("✅ Escalações antigas removidas!");

    // Aqui definimos 10 partidas, cada uma com seu dayIndex (1 a 10).
    const firstElevens = [
      // ============== PARTIDAS ORIGINAIS (1 A 5) ==============
      {
        dayIndex: 1,
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
        dayIndex: 2,
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
      {
        dayIndex: 3,
        match: "Final da Libertadores 2019",
        date: "23/11/2019",
        team: "Flamengo",
        opponent: "River Plate",
        location: "Estadio Monumental",
        result: "Flamengo 2x1 River Plate",
        players: [
          { position: "Goleiro", playerName: "Diego Alves", shirtNumber: 1 },
          { position: "Lateral Direito", playerName: "Rafinha", shirtNumber: 13 },
          { position: "Zagueiro 1", playerName: "Rodrigo Caio", shirtNumber: 3 },
          { position: "Zagueiro 2", playerName: "Pablo Marí", shirtNumber: 4 },
          { position: "Lateral Esquerdo", playerName: "Filipe Luís", shirtNumber: 16 },
          { position: "Volante 1", playerName: "Willian Arão", shirtNumber: 5 },
          { position: "Volante 2", playerName: "Gerson", shirtNumber: 8 },
          { position: "Meia", playerName: "Arrascaeta", shirtNumber: 14 },
          { position: "Atacante 1", playerName: "Bruno Henrique", shirtNumber: 27 },
          { position: "Atacante 2", playerName: "Gabigol", shirtNumber: 9 },
          { position: "Atacante 3", playerName: "Éverton Ribeiro", shirtNumber: 7 },
        ],
      },
      {
        dayIndex: 4,
        match: "Final da Libertadores 2013",
        date: "24/07/2013",
        team: "Atlético Mineiro",
        opponent: "Olimpia",
        location: "Mineirão",
        result: "Atlético-MG 2x0 Olimpia (4x3 nos pênaltis)",
        players: [
          { position: "Goleiro", playerName: "Victor", shirtNumber: 1 },
          { position: "Lateral Direito", playerName: "Marcos Rocha", shirtNumber: 2 },
          { position: "Zagueiro 1", playerName: "Réver", shirtNumber: 4 },
          { position: "Zagueiro 2", playerName: "Leonardo Silva", shirtNumber: 3 },
          { position: "Lateral Esquerdo", playerName: "Júnior César", shirtNumber: 6 },
          { position: "Volante 1", playerName: "Pierre", shirtNumber: 5 },
          { position: "Volante 2", playerName: "Josué", shirtNumber: 8 },
          { position: "Meia", playerName: "Ronaldinho Gaúcho", shirtNumber: 10 },
          { position: "Atacante 1", playerName: "Diego Tardelli", shirtNumber: 9 },
          { position: "Atacante 2", playerName: "Jô", shirtNumber: 7 },
          { position: "Atacante 3", playerName: "Bernard", shirtNumber: 11 },
        ],
      },
      {
        dayIndex: 5,
        match: "Final do Mundial de Clubes 2005",
        date: "18/12/2005",
        team: "São Paulo",
        opponent: "Liverpool",
        location: "Estádio Internacional de Yokohama",
        result: "São Paulo 1x0 Liverpool",
        players: [
          { position: "Goleiro", playerName: "Rogério Ceni", shirtNumber: 1 },
          { position: "Lateral Direito", playerName: "Cicinho", shirtNumber: 2 },
          { position: "Zagueiro 1", playerName: "Lugano", shirtNumber: 3 },
          { position: "Zagueiro 2", playerName: "Fabão", shirtNumber: 4 },
          { position: "Lateral Esquerdo", playerName: "Júnior", shirtNumber: 6 },
          { position: "Volante 1", playerName: "Mineiro", shirtNumber: 5 },
          { position: "Volante 2", playerName: "Josué", shirtNumber: 8 },
          { position: "Meia", playerName: "Danilo", shirtNumber: 10 },
          { position: "Atacante 1", playerName: "Aloísio", shirtNumber: 7 },
          { position: "Atacante 2", playerName: "Amoroso", shirtNumber: 9 },
          { position: "Atacante 3", playerName: "Grafite", shirtNumber: 11 },
        ],
      },

      // ============== NOVAS PARTIDAS (6 A 10) ==============
      {
        dayIndex: 6,
        match: "Final da Copa do Brasil 2018",
        date: "17/10/2018",
        team: "Cruzeiro",
        opponent: "Corinthians",
        location: "Mineirão",
        result: "Cruzeiro 2x1 Corinthians",
        players: [
          { position: "Goleiro", playerName: "Fábio", shirtNumber: 1 },
          { position: "Lateral Direito", playerName: "Edilson", shirtNumber: 22 },
          { position: "Zagueiro 1", playerName: "Dedé", shirtNumber: 26 },
          { position: "Zagueiro 2", playerName: "Léo", shirtNumber: 3 },
          { position: "Lateral Esquerdo", playerName: "Egídio", shirtNumber: 6 },
          { position: "Volante 1", playerName: "Henrique", shirtNumber: 8 },
          { position: "Volante 2", playerName: "Lucas Silva", shirtNumber: 16 },
          { position: "Meia", playerName: "Thiago Neves", shirtNumber: 30 },
          { position: "Atacante 1", playerName: "Rafinha", shirtNumber: 17 },
          { position: "Atacante 2", playerName: "Barcos", shirtNumber: 9 },
          { position: "Atacante 3", playerName: "Arrascaeta", shirtNumber: 10 },
        ],
      },
      {
        dayIndex: 7,
        match: "Final do Paulistão 2022",
        date: "03/04/2022",
        team: "São Paulo",
        opponent: "Palmeiras",
        location: "Morumbi",
        result: "São Paulo 3x1 Palmeiras",
        players: [
          { position: "Goleiro", playerName: "Jandrei", shirtNumber: 93 },
          { position: "Lateral Direito", playerName: "Rafinha", shirtNumber: 13 },
          { position: "Zagueiro 1", playerName: "Arboleda", shirtNumber: 5 },
          { position: "Zagueiro 2", playerName: "Diego Costa", shirtNumber: 4 },
          { position: "Lateral Esquerdo", playerName: "Reinaldo", shirtNumber: 6 },
          { position: "Volante 1", playerName: "Pablo Maia", shirtNumber: 29 },
          { position: "Volante 2", playerName: "Gabriel Neves", shirtNumber: 15 },
          { position: "Meia", playerName: "Rodrigo Nestor", shirtNumber: 25 },
          { position: "Atacante 1", playerName: "Luciano", shirtNumber: 11 },
          { position: "Atacante 2", playerName: "Calleri", shirtNumber: 9 },
          { position: "Atacante 3", playerName: "Alisson", shirtNumber: 7 },
        ],
      },
      {
        dayIndex: 8,
        match: "Final da Libertadores 2021",
        date: "27/11/2021",
        team: "Palmeiras",
        opponent: "Flamengo",
        location: "Estadio Centenario",
        result: "Palmeiras 2x1 Flamengo",
        players: [
          { position: "Goleiro", playerName: "Weverton", shirtNumber: 21 },
          { position: "Lateral Direito", playerName: "Mayke", shirtNumber: 12 },
          { position: "Zagueiro 1", playerName: "Gustavo Gómez", shirtNumber: 15 },
          { position: "Zagueiro 2", playerName: "Luan", shirtNumber: 13 },
          { position: "Lateral Esquerdo", playerName: "Piquerez", shirtNumber: 22 },
          { position: "Volante 1", playerName: "Felipe Melo", shirtNumber: 30 },
          { position: "Volante 2", playerName: "Zé Rafael", shirtNumber: 8 },
          { position: "Meia", playerName: "Raphael Veiga", shirtNumber: 23 },
          { position: "Atacante 1", playerName: "Dudu", shirtNumber: 43 },
          { position: "Atacante 2", playerName: "Rony", shirtNumber: 7 },
          { position: "Atacante 3", playerName: "Breno Lopes", shirtNumber: 19 },
        ],
      },
      {
        dayIndex: 9,
        match: "Final da Libertadores 2017",
        date: "29/11/2017",
        team: "Grêmio",
        opponent: "Lanús",
        location: "La Fortaleza",
        result: "Grêmio 2x1 Lanús",
        players: [
          { position: "Goleiro", playerName: "Marcelo Grohe", shirtNumber: 1 },
          { position: "Lateral Direito", playerName: "Edílson", shirtNumber: 2 },
          { position: "Zagueiro 1", playerName: "Pedro Geromel", shirtNumber: 3 },
          { position: "Zagueiro 2", playerName: "Kannemann", shirtNumber: 4 },
          { position: "Lateral Esquerdo", playerName: "Cortez", shirtNumber: 12 },
          { position: "Volante 1", playerName: "Michel", shirtNumber: 5 },
          { position: "Volante 2", playerName: "Jaílson", shirtNumber: 25 },
          { position: "Meia", playerName: "Luan", shirtNumber: 7 },
          { position: "Atacante 1", playerName: "Barrios", shirtNumber: 18 },
          { position: "Atacante 2", playerName: "Fernandinho", shirtNumber: 21 },
          { position: "Atacante 3", playerName: "Ramiro", shirtNumber: 17 },
        ],
      },
      {
        dayIndex: 10,
        match: "Final do Mundial de Clubes 2012",
        date: "16/12/2012",
        team: "Corinthians",
        opponent: "Chelsea",
        location: "Estádio Internacional de Yokohama",
        result: "Corinthians 1x0 Chelsea",
        players: [
          { position: "Goleiro", playerName: "Cássio", shirtNumber: 12 },
          { position: "Lateral Direito", playerName: "Alessandro", shirtNumber: 2 },
          { position: "Zagueiro 1", playerName: "Chicão", shirtNumber: 3 },
          { position: "Zagueiro 2", playerName: "Paulo André", shirtNumber: 13 },
          { position: "Lateral Esquerdo", playerName: "Fábio Santos", shirtNumber: 6 },
          { position: "Volante 1", playerName: "Ralf", shirtNumber: 5 },
          { position: "Volante 2", playerName: "Paulinho", shirtNumber: 8 },
          { position: "Meia", playerName: "Danilo", shirtNumber: 20 },
          { position: "Atacante 1", playerName: "Emerson Sheik", shirtNumber: 11 },
          { position: "Atacante 2", playerName: "Guerrero", shirtNumber: 9 },
          { position: "Atacante 3", playerName: "Jorge Henrique", shirtNumber: 23 },
        ],
      },
    ];

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
