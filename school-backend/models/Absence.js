const mongoose = require("mongoose");

const AbsenceSchema = new mongoose.Schema(
  {
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
    duree: {
      type: Number, // en heures par exemple
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Absence", AbsenceSchema);
