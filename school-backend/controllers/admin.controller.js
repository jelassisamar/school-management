const User = require("../models/User");
const Parent = require("../models/Parent");
const Student = require("../models/Student");

exports.addStudentToParent = async (req, res) => {
  try {
    const { parentId, studentId } = req.body;

    // Trouver le parent
    const parent = await Parent.findById(parentId);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent non trouvé",
      });
    }

    // Trouver l'élève
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Élève non trouvé",
      });
    }

    // Ajouter l'élève au parent
    parent.enfants.push(studentId);
    await parent.save();

    // Ajouter le parent à l'élève
    student.parent = parentId;
    await student.save();

    res.status(200).json({
      success: true,
      message: "Élève ajouté au parent avec succès",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { login, nom, prenom, motDePasse } = req.body;

    const newAdmin = new Admin({
      login,
      nom,
      prenom,
      motDePasse,
      role: "admin",
    });
    await newAdmin.save();

    res.status(201).json({
      success: true,
      admin: {
        id: newAdmin._id,
        login: newAdmin.login,
        nom: newAdmin.nom,
        prenom: newAdmin.prenom,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
