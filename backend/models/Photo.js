const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
});

module.exports = mongoose.model("Photo", PhotoSchema);
