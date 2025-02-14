require('dotenv').config();
console.log("Tentando conectar ao MongoDB com URI:", process.env.MONGO_URI);

const mongoose = require('mongoose');
const Stadium = require('../models/Stadium');

// 📌 Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado ao MongoDB!");

    // 📌 Definição dos estádios com todas as informações necessárias
    const stadiums = [
      {
        name: "Estádio 1",
        city: "São Paulo",
        capacity: 49205,
        imageUrl: "/assets/stadiums/stadium1.jpg",
        location: { lat: -23.5455, lng: -46.4742 }, // 📍 Neo Química Arena
        year: 2024, // 📅 Ano da foto
        matchScore: "Corinthians 2 x 0 Palmeiras" // ⚽ Placar do jogo
      },
      {
        name: "Estádio 2",
        city: "Madrid",
        capacity: 81044,
        imageUrl: "/assets/stadiums/stadium2.jpg",
        location: { lat: 40.4531, lng: -3.6883 }, // 📍 Santiago Bernabéu
        year: 2017, // 📅 Ano da foto
        matchScore: "Barcelona 3 x 2 Real Madrid" // ⚽ Placar do jogo
      },
      {
        name: "Estádio 3",
        city: "Rio de Janeiro",
        capacity: 46931,
        imageUrl: "/assets/stadiums/stadium3.jpg",
        location: { lat: -22.8939, lng: -43.2933 }, // 📍 Estádio Nilton Santos (Engenhão.)
        year: 2024, // 📅 Ano da foto
        matchScore: "Botafogo 1 x 1 São Paulo" // ⚽ Placar do jogo
      }
    ];

    console.log("🗑️ Deletando todos os estádios existentes...");
    await Stadium.deleteMany({});
    console.log("✅ Todos os estádios antigos foram removidos!");

    console.log("🔍 Inserindo novos estádios...");
    await Stadium.insertMany(stadiums);
    
    console.log("🎉 Estádios inseridos com sucesso!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Erro ao conectar ou inserir:", err);
    process.exit(1);
  });
