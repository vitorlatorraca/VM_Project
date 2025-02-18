const mongoose = require('mongoose');

const StadiumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  capacity: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  location: { 
    lat: { type: Number, required: true }, 
    lng: { type: Number, required: true }
  }, // 📍 Adicionando a localização
  year: { type: Number, required: true }, // 📅 Adicionando o ano da foto.
  matchScore: { type: String, required: true } // ⚽ Adicionando o placar do jogo!
});

module.exports = mongoose.model('Stadium', StadiumSchema);
