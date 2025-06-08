// models/Matiere.js
const mongoose = require("mongoose");

const Matiere = new mongoose.Schema({
  nom: { type: String, required: true },
  coefficient: { type: Number, required: true },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classe" }],
});

module.exports = mongoose.model("Matiere", Matiere);
