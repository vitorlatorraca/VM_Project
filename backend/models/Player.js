const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  playerName: { type: String, required: true }, // Nome curto (do arquivo)
  fullName: { type: String, required: true }, // Nome completo do jogador
  club: { type: String, required: true }, // Nome do clube atual
  age: { type: Number, required: true }, // Idade do jogador
  position: { type: String, enum: ["Goleiro", "Zagueiro", "Lateral", "Meia", "Atacante"], required: true }, // Posição do jogador
  shirtNumber: { type: Number, required: true } // Número da camisa
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
