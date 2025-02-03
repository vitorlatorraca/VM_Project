const express = require("express");
const Photo = require("../models/Photo");

const router = express.Router();

// 📌 Obter uma foto aleatória
router.get("/random", async (req, res) => {
  try {
    const count = await Photo.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const photo = await Photo.findOne().skip(randomIndex);

    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar foto" });
  }
});

// 📌 Criar uma nova foto (admin)
router.post("/", async (req, res) => {
  try {
    const { imageUrl, location, year } = req.body;

    const newPhoto = new Photo({ imageUrl, location, year });
    await newPhoto.save();

    res.status(201).json({ message: "Foto adicionada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar foto" });
  }
});

// 📌 Verificar se a resposta do jogador está correta
router.post("/check", async (req, res) => {
  try {
    const { photoId, guessedLatitude, guessedLongitude, guessedYear } = req.body;
    const photo = await Photo.findById(photoId);

    if (!photo) return res.status(404).json({ message: "Foto não encontrada!" });

    const distance = Math.sqrt(
      Math.pow(guessedLatitude - photo.location.latitude, 2) +
      Math.pow(guessedLongitude - photo.location.longitude, 2)
    );

    const yearDifference = Math.abs(guessedYear - photo.year);

    res.json({
      correctLocation: photo.location,
      correctYear: photo.year,
      locationScore: distance < 1 ? "Perfeito!" : distance < 5 ? "Muito perto!" : "Longe!",
      yearScore: yearDifference === 0 ? "Exato!" : yearDifference <= 2 ? "Quase lá!" : "Muito longe!"
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar resposta" });
  }
});

module.exports = router;
