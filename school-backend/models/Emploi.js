const mongoose = require("mongoose");

const Emploi = new mongoose.Schema(
  {
    idClasse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emploi", Emploi);
