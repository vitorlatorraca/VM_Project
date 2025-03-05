const mongoose = require("mongoose");

const firstElevenSchema = new mongoose.Schema({
  dayIndex: { type: Number, required: true }, // Novo campo para identificar o dia
  match: { type: String, required: true },    // Nome da partida (ex: Final da Copa do Brasil)
  date: { type: String, required: true },     // Data do jogo (ex: 19/10/2022)
  team: { type: String, required: true },     // Nome do time principal (ex: Corinthians)
  opponent: { type: String, required: true }, // Adversário (ex: Flamengo)
  location: { type: String, required: true }, // Local do jogo (ex: Neo Química Arena)
  result: { type: String, required: true },   // Resultado final do jogo (ex: Corinthians 1x2 Flamengo)
  players: [
    {
      position: { type: String, required: true },   // Posição do jogador (ex: Goleiro)
      playerName: { type: String, required: true }, // Nome do jogador
      shirtNumber: { type: Number, required: true } // Número da camisa
    }
  ]
});

const FirstEleven = mongoose.model("FirstEleven", firstElevenSchema);
module.exports = FirstEleven;
