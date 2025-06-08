const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6,
    },
    nom: {
      type: String,
      required: true,

      trim: true,
      minlength: 2,
    },
    prenom: {
      type: String,
      required: true,
      trim: true,
    },
    motDePasse: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["eleve", "parent", "admin"],
    },
    dateCreation: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
