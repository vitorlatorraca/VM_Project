// backend/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // deve vir como 'Bearer <token>'
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "chave-super-secreta"
    );
    req.userId = decoded.userId; // define userId
    next(); // segue para a rota
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
