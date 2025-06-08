const mongoose = require("mongoose");
const User = require("./User");

const ParentSchema = new mongoose.Schema({
  enfants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Parent = User.discriminator("Parent", ParentSchema);
module.exports = Parent;
