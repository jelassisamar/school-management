const User = require("../models/User"); // Assure-toi que c’est le bon modèle
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticate = async (login, motDePasse) => {
  // This will find both Users and Students (since they're in the same collection)
  const user = await User.findOne({ login }).select("+motDePasse");

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
  if (!isMatch) {
    throw new Error("Mot de passe incorrect");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1d" }
  );

  return { token, user };
};

module.exports = { authenticate };
