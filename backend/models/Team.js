const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logoPath: { type: String, required: true }, // Caminho da imagem do escudo.
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
