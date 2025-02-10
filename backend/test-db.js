const mongoose = require("mongoose");
const Stadium = require("./models/Stadium"); // Importação correta do modelo

mongoose.connect("mongodb://localhost:27017/vm_project", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log("✅ Conectado ao MongoDB!");

    const estadios = await Stadium.find(); // Busca todos os estádios
    console.log("📌 Estádios no banco:", estadios);

    mongoose.connection.close();
  })
  .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));
