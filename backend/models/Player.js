const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  playerName: { type: String, required: true },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
