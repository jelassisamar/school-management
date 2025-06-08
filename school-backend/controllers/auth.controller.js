// controllers/auth.controller.js
const { authenticate } = require("../services/auth.service"); // ou comme tu l’as structuré
const { addToBlacklist } = require("../utils/tokenManager");

exports.login = async (req, res) => {
  const { login, motDePasse } = req.body;

  try {
    const { token, user } = await authenticate(login, motDePasse);

    res.status(200).json({
      success: true,
      token: `${token}`,
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      success: false,
      message: "Aucun token fourni",
    });
  }

  const token = authHeader.split(" ")[1];

  addToBlacklist(token);

  res.status(200).json({
    success: true,
    message: "Déconnexion réussie",
  });
};
