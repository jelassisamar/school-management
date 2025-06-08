const mongoose = require("mongoose");

const Resultat = new mongoose.Schema({
  idmatiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matiere",
    required: true,
  },
  ideleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  note1: { type: Number, default: 0 },
  note2: { type: Number, default: 0 },
  moyenne: { type: Number, default: 0 },
});

module.exports = mongoose.model("Resultat", Resultat);
