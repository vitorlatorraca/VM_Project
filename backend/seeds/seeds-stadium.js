require('dotenv').config();
console.log("Tentando conectar ao MongoDB com URI:", process.env.MONGO_URI);

const mongoose = require('mongoose');
const Stadium = require('../models/Stadium');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado ao MongoDB!");

    const stadiums = [
      {
        name: "Estádio 1",
        city: "Cidade A",
        capacity: 50000,
        imageUrl: "/assets/stadiums/stadium1.jpg"
      },
      {
        name: "Estádio 2",
        city: "Cidade B",
        capacity: 40000,
        imageUrl: "/assets/stadiums/stadium2.jpg"
      }
    ];

    console.log("Inserindo estádios...");
    await Stadium.insertMany(stadiums);
    console.log("✅ Estádios inseridos com sucesso!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Erro ao conectar ou inserir:", err);
    process.exit(1);
  });
