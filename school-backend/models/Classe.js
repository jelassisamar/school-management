const mongoose = require("mongoose");

const Classe = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    idEmploi: {
      type: String,
    },
    matieres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Matiere" }],
    enfants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    dateCreation: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classe", Classe);
