const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  playerName: { type: String, required: true },  // Nome “curto” (ex: “James Bree”)
  fullName: { type: String, required: true },    // Nome completo (ex: “James Patrick Bree”)
  nationality: { type: String, required: true }, // Ex: "England"
  league: { type: String, required: true },      // Ex: "Premier League"
  club: { type: String, required: true },        // Ex: "Southampton"
  position: { type: String, required: true },    // Ex: "DF"
  age: { type: Number, required: true },
  shirtNumber: { type: Number, required: true },

  // Se você quiser continuar usando referência a "Team" via ObjectId, pode manter:
  // team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
