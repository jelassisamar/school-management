const mongoose = require("mongoose");
const User = require("./User");

const StudentSchema = new mongoose.Schema({
  dateNaissance: { type: Date, required: true },
  classe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classe",
    required: true,
  },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
});

// Inherit from User
const Student = User.discriminator("Student", StudentSchema);
module.exports = Student;
