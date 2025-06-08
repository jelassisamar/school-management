const Student = require("../models/Student");
const Classe = require("../models/Classe");

const bcrypt = require("bcryptjs");
exports.GetInfo = async (req, res) => {
  try {
    const eleve = await Student.findById(req.params.id).populate("classe"); // ✅ Mongoose syntax
    if (!eleve) {
      return res.status(404).json({ message: "Élève non trouvé" });
    }
    res.json(eleve);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
exports.GetStudents = async (req, res) => {
  try {
    const { search } = req.query;

    let students;
    if (search) {
      students = await Student.find({
        nom: { $regex: search, $options: "i" },
      }).populate("classe");
    } else {
      students = await Student.find().populate("classe");
    }

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des élèves",
    });
  }
};

exports.UpdateStudent = async (req, res) => {
  try {
    const { login, nom, prenom, motDePasse, dateNaissance, classe } = req.body;

    // Step 1: Find the student by ID
    const studentToUpdate = await Student.findById(req.params.id);

    if (!studentToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Élève non trouvé", // "Student not found"
      });
    }

    // Step 2: Check if the class has changed
    const previousClasse = studentToUpdate.classe; // This is the old class of the student
    if (classe && previousClasse.toString() !== classe) {
      // If the class has changed, remove the student from the old class's "enfants" array
      await Classe.findByIdAndUpdate(previousClasse, {
        $pull: { enfants: studentToUpdate._id }, // Remove student ID from the previous class
      });

      // Add the student to the new class's "enfants" array
      await Classe.findByIdAndUpdate(classe, {
        $push: { enfants: studentToUpdate._id }, // Add student ID to the new class
      });
    }

    // Step 3: Update the student's information
    if (motDePasse) {
      // If password is provided, hash it before saving
      const salt = await bcrypt.genSalt(10);
      studentToUpdate.motDePasse = await bcrypt.hash(motDePasse, salt);
    }

    // Update other fields
    studentToUpdate.login = login || studentToUpdate.login;
    studentToUpdate.nom = nom || studentToUpdate.nom;
    studentToUpdate.prenom = prenom || studentToUpdate.prenom;
    studentToUpdate.dateNaissance =
      dateNaissance || studentToUpdate.dateNaissance;
    studentToUpdate.classe = classe || studentToUpdate.classe;

    // Step 4: Save the updated student
    const updatedStudent = await studentToUpdate.save();

    // Populate the "classe" field to return it in the response
    await updatedStudent.populate("classe");

    // Step 5: Return the updated student details
    res.status(200).json({
      success: true,
      student: updatedStudent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.DeleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { parent, classe } = req.body || {};
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Élève non trouvé",
      });
    }

    if (parent) {
      await Parent.findByIdAndUpdate(
        parent,
        { $pull: { enfants: id } },
        { new: true }
      );
    }

    if (classe) {
      await Classe.findByIdAndUpdate(
        classe,
        { $pull: { enfants: id } },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Élève supprimé avec succès" +
        (parent ? " et retiré du parent" : "") +
        (classe ? " et retiré de la classe" : ""),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de l'élève",
      error: error.message,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { login, nom, prenom, motDePasse, dateNaissance, classe } = req.body;

    const studentExistant = await Student.findOne({ login });
    if (studentExistant) {
      return res.status(409).json({
        success: false,
        message: "Ce login est déjà utilisé.",
      });
    }

    const newStudent = new Student({
      login,
      nom,
      prenom,
      motDePasse,
      dateNaissance,
      classe,
      role: "eleve",
    });
    console.log("Original password:", motDePasse);
    const salt = await bcrypt.genSalt(10);
    newStudent.motDePasse = await bcrypt.hash(newStudent.motDePasse, salt);
    console.log("Hashed password:", newStudent.motDePasse);
    await newStudent.save();

    // 🔄 Mettre à jour la classe concernée
    const Classe = require("../models/Classe");
    await Classe.findByIdAndUpdate(
      classe,
      { $addToSet: { enfants: newStudent._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      student: {
        id: newStudent._id,
        nom: newStudent.nom,
        prenom: newStudent.prenom,
        classe: newStudent.classe,
        role: newStudent.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
