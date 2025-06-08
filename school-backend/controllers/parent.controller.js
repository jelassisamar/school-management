const Parent = require("../models/Parent");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student"); // Chemin relatif du modèle Student

exports.getParentWithChildren = async (req, res) => {
  try {
    const { id: parentId } = req.params;

    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(parentId)) {
      return res.status(400).json({ message: "ID du parent invalide." });
    }

    // Trouver le parent avec ses enfants
    const parent = await Parent.findById(parentId)
      .populate({
        path: "enfants",
        select: "nom prenom dateNaissance classe",
        populate: {
          path: "classe",
          select: "nom",
        },
      })

      .select("nom prenom enfants");

    if (!parent) {
      return res.status(404).json({ message: "Parent non trouvé." });
    }

    res.status(200).json({ success: true, data: parent });
  } catch (error) {
    console.error("Erreur lors de la récupération du parent :", error.message);
    res
      .status(500)
      .json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
  }
};

exports.supprimerParent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID du parent invalide." });
    }

    await Parent.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Parent supprimé avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du parent." });
  }
};

exports.ajouterParent = async (req, res) => {
  try {
    const { nom, prenom, login, motDePasse, studentIds } = req.body;

    // Vérification des champs requis
    if (
      !nom ||
      !prenom ||
      !login ||
      !motDePasse ||
      !studentIds ||
      studentIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Tous les champs sont requis, et au moins un élève doit être sélectionné.",
      });
    }

    // Vérifier si le login est déjà utilisé
    const parentExistant = await Parent.findOne({ login });
    if (parentExistant) {
      return res.status(409).json({
        success: false,
        message: "Ce login est déjà utilisé.",
      });
    }

    // Vérifier si les élèves existent et s'ils n'ont pas déjà un parent
    const students = await Student.find({ _id: { $in: studentIds } });

    if (students.length !== studentIds.length) {
      return res.status(400).json({
        success: false,
        message: "Un ou plusieurs IDs d'élève sont invalides.",
      });
    }

    const studentsAvecParent = students.filter((s) => s.parent);
    if (studentsAvecParent.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Les élèves suivants ont déjà un parent : ${studentsAvecParent
          .map((s) => `${s.nom} ${s.prenom}`)
          .join(", ")}`,
      });
    }

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const motDePasseHash = await bcrypt.hash(motDePasse, salt);

    // Création du parent
    const nouveauParent = new Parent({
      nom,
      prenom,
      login,
      motDePasse: motDePasseHash,
      role: "parent",
      enfants: studentIds,
    });

    await nouveauParent.save();

    // Mise à jour des élèves
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { $set: { parent: nouveauParent._id } }
    );

    res.status(201).json({
      success: true,
      data: {
        id: nouveauParent._id,
        nom: nouveauParent.nom,
        prenom: nouveauParent.prenom,
        login: nouveauParent.login,
        role: nouveauParent.role,
        enfants: nouveauParent.enfants,
        dateCreation: nouveauParent.dateCreation,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du parent.",
      error: error.message,
    });
  }
};

exports.GetParents = async (req, res) => {
  try {
    const { search } = req.query;

    let parents;
    if (search) {
      parents = await Parent.find({
        nom: { $regex: search, $options: "i" },
      });
    } else {
      parents = await Parent.find();
    }

    res.status(200).json({
      success: true,
      parents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des parents",
    });
  }
};

exports.updateParent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nom,
      prenom,
      login,
      motDePasse,
      studentIds, // liste mise à jour des enfants
      email,
      telephone,
      dateNaissance,
    } = req.body;

    // Vérification ID valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID du parent invalide." });
    }

    // Récupérer le parent existant
    const parent = await Parent.findById(id);
    if (!parent) {
      return res.status(404).json({ message: "Parent non trouvé." });
    }

    // Vérifier si le login est unique (si modifié)
    if (login && login !== parent.login) {
      const existingLogin = await Parent.findOne({ login });
      if (existingLogin) {
        return res
          .status(409)
          .json({ message: "Ce login est déjà utilisé par un autre parent." });
      }
    }

    // Mise à jour des champs
    if (nom) parent.nom = nom;
    if (prenom) parent.prenom = prenom;
    if (login) parent.login = login;
    if (email) parent.email = email;
    if (telephone) parent.telephone = telephone;
    if (dateNaissance) parent.dateNaissance = dateNaissance;
    if (studentIds) parent.enfants = studentIds;

    // Hashage du nouveau mot de passe si fourni
    if (motDePasse) {
      const salt = await bcrypt.genSalt(10);
      parent.motDePasse = await bcrypt.hash(motDePasse, salt);
    }

    // Sauvegarde
    await parent.save();

    res.status(200).json({
      success: true,
      message: "Parent mis à jour avec succès.",
      data: parent,
    });
  } catch (error) {
    console.error("Erreur mise à jour parent :", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du parent.",
    });
  }
};
exports.deleteParentChildren = async (req, res) => {
  const { parentId, studentId } = req.params;

  try {
    console.log("Suppression de l'enfant du parent...");
    const parentUpdate = await Parent.findByIdAndUpdate(parentId, {
      $pull: { enfants: studentId },
    });

    console.log("Résultat parent update:", parentUpdate);

    console.log("Suppression du parent de l'enfant...");
    const childUpdate = await Student.findByIdAndUpdate(studentId, {
      $set: { parent: null },
    });

    console.log("Résultat child update:", childUpdate);

    res.status(200).json({ message: "Association parent-élève supprimée." });
  } catch (error) {
    console.error("Erreur dans deleteParentChildren:", error);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'association.",
      error,
    });
  }
};

exports.addParentChildren = async (req, res) => {
  const { parentId } = req.params;
  const { studentIds } = req.body; // attend un tableau

  if (!Array.isArray(studentIds) || studentIds.length === 0) {
    return res
      .status(400)
      .json({ message: "Aucun identifiant d'élève fourni." });
  }

  try {
    const updatedStudents = [];

    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);

      if (!student) {
        continue; // Ignore les élèves non trouvés
      }

      if (student.parent && student.parent.toString() !== parentId) {
        continue; // Ignore les élèves déjà associés à un autre parent
      }

      // Ajouter au parent sans doublon
      await Parent.findByIdAndUpdate(parentId, {
        $addToSet: { enfants: studentId },
      });

      // Mettre à jour le parent de l'élève
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { $set: { parent: parentId } },
        { new: true }
      );

      updatedStudents.push(updatedStudent);
    }

    res.status(200).json({
      message: "Association(s) parent-élève ajoutée(s).",
      ajoutés: updatedStudents.length,
      élèves: updatedStudents,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout des associations:", error);
    res.status(500).json({
      message: "Erreur lors de l'ajout des associations.",
      error: error.message || error,
    });
  }
};
