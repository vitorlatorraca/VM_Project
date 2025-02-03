// models/Stadium.js
const mongoose = require('mongoose');

const StadiumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  // Você pode adicionar outros campos, como capacidade, time, etc.
  capacity: Number,
  // Este campo armazena o caminho da imagem (URL)
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Stadium', StadiumSchema);
