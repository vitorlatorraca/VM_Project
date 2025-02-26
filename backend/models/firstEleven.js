const mongoose = require("mongoose");

const firstElevenSchema = new mongoose.Schema({
  match: { type: String, required: true }, // Nome da partida (ex: Final da Copa do Brasil)
  date: { type: String, required: true },  // Data do jogo
  team: { type: String, required: true },  // Nome do time principal
  opponent: { type: String, required: true }, // Adversário
  players: [
    {
      position: { type: String, required: true },
      playerName: { type: String, required: true },
      shirtNumber: { type: Number, required: true }
    }
  ]
});

const FirstEleven = mongoose.model("FirstEleven", firstElevenSchema);
module.exports = FirstEleven;
