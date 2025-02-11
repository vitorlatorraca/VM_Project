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
      },
      {
        name: "Estádio 3",
        city: "Cidade C",
        capacity: 60000,
        imageUrl: "/assets/stadiums/stadium3.jpg"
      },
      {
        name: "Estádio 4",
        city: "Cidade D",
        capacity: 45000,
        imageUrl: "/assets/stadiums/stadium4.jpg"
      },
      {
        name: "Estádio 5",
        city: "Cidade E",
        capacity: 70000,
        imageUrl: "/assets/stadiums/stadium5.jpg"
      },
      {
        name: "Estádio 6",
        city: "Cidade F",
        capacity: 55000,
        imageUrl: "/assets/stadiums/stadium6.jpg"
      },
      {
        name: "Estádio 7",
        city: "Cidade G",
        capacity: 80000,
        imageUrl: "/assets/stadiums/stadium7.jpg"
      },
      {
        name: "Estádio 8",
        city: "Cidade H",
        capacity: 65000,
        imageUrl: "/assets/stadiums/stadium8.jpg"
      },
      {
        name: "Estádio 9",
        city: "Cidade I",
        capacity: 58000,
        imageUrl: "/assets/stadiums/stadium9.jpg"
      },
      {
        name: "Estádio 10",
        city: "Cidade J",
        capacity: 75000,
        imageUrl: "/assets/stadiums/stadium10.jpg"
      }
    ];

    console.log("🔍 Verificando se os estádios já existem...");
    for (const stadium of stadiums) {
      const exists = await Stadium.findOne({ name: stadium.name, city: stadium.city });
      if (!exists) {
        await Stadium.create(stadium);
        console.log(`✅ Estádio inserido: ${stadium.name}`);
      } else {
        console.log(`⚠️ Estádio já existe: ${stadium.name}, ignorando...`);
      }
    }

    console.log("🎉 Processo finalizado!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Erro ao conectar ou inserir:", err);
    process.exit(1);
  });
