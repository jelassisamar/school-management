const Matiere = require("../models/Matiere");
const Classe = require("../models/Classe");

// ➕ Ajouter une matière et lier aux classes
exports.addMatiere = async (req, res) => {
  try {
    const { nom, coefficient, classes } = req.body;

    const existe = await Matiere.findOne({ nom });
    if (existe) {
      return res.status(400).json({ message: "Cette matière existe déjà." });
    }

    const nouvelleMatiere = new Matiere({ nom, coefficient, classes });
    const matiere = await nouvelleMatiere.save();

    // Ajouter la matière dans le tableau `matieres` de chaque classe
    if (classes && classes.length > 0) {
      await Classe.updateMany(
        { _id: { $in: classes } },
        { $addToSet: { matieres: matiere._id } }
      );
    }

    res.status(201).json(matiere);
  } catch (error) {
    console.error("Erreur ajout matière :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout", error });
  }
};

// ❌ Supprimer une matière et la retirer de toutes les classes
exports.deleteMatiere = async (req, res) => {
  try {
    const { id } = req.params;

    const matiere = await Matiere.findByIdAndDelete(id);
    if (!matiere) {
      return res.status(404).json({ message: "Matière non trouvée" });
    }

    // Supprimer la référence à la matière dans toutes les classes
    await Classe.updateMany({ matieres: id }, { $pull: { matieres: id } });

    res.status(200).json({ message: "Matière supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression matière :", error);
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};

// 📥 Récupérer toutes les matières avec les classes associées
exports.getMatiere = async (req, res) => {
  try {
    const matieres = await Matiere.find().populate("classes", "nom");
    res.status(200).json(matieres);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
};
