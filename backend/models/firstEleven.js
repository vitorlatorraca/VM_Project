const mongoose = require("mongoose");

const firstElevenSchema = new mongoose.Schema({
  match: { type: String, required: true }, // Nome da partida (ex: Final da Copa do Brasil)
  players: [
    {
      position: { type: String, required: true },
      playerName: { type: String, required: true },
      imagePath: { type: String, required: true },
      shirtNumber: { type: Number, required: true }
    }
  ]
});

const FirstEleven = mongoose.model("FirstEleven", firstElevenSchema);
module.exports = FirstEleven;
