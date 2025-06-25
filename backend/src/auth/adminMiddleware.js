const jwt = require("jsonwebtoken");

const JWT_SECRET = "ecomarket";

const verifyAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Acesso negado: Nenhum token fornecido." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido." });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acesso negado: Você não é um administrador." });
    }

    req.user = user;
    next();
  });
};

module.exports = verifyAdmin;
