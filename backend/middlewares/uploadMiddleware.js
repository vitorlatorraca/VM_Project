const multer = require("multer");
const path = require("path");

// Configuração de armazenamento local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pasta onde os arquivos serão salvos
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    // Exemplo: avatar-12345.jpg
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "avatar-" + uniqueSuffix + ext);
  },
});

// Filtro opcional: aceitar somente imagens
function fileFilter(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo inválido."), false);
  }
}

const upload = multer({ storage, fileFilter });

module.exports = upload;
