const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  playerName: { type: String, required: true },
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  position: { type: String, required: true },
  shirtNumber: { type: Number, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }, // Referência ao time
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
