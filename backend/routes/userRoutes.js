const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const User = require("../models/User");

// PATCH /api/users/profile-pic
router.patch(
  "/profile-pic",
  authMiddleware, // só permite se estiver logado
  upload.single("avatar"), // campo "avatar" no form
  async (req, res) => {
    try {
      // Pega o ID do usuário logado (via token JWT, por exemplo)
      const userId = req.userId; 
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Se Multer salvou o arquivo, ele estará em req.file
      if (!req.file) {
        return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
      }

      // Exemplo de caminho relativo: "uploads/avatar-123.jpg"
      const filePath = "uploads/" + req.file.filename;

      user.profilePic = filePath;
      await user.save();

      return res.json({
        message: "Foto de perfil atualizada com sucesso!",
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.error("Erro ao atualizar foto de perfil:", error);
      res.status(500).json({ error: "Erro interno ao atualizar foto." });
    }
  }
);

module.exports = router;
