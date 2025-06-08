const Absence = require("../models/Absence");

// ➕ Ajouter une matière et lier aux classes
exports.ajouterAbsence = async (req, res) => {
  try {
    const { idmatiere, ideleve, duree } = req.body;

    if (!duree || duree <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Durée invalide." });
    }

    // Vérifier si une absence existe déjà pour cet élève et cette matière
    let absence = await Absence.findOne({ idmatiere, ideleve });

    if (absence) {
      // Mise à jour de la durée
      absence.duree += duree;
      await absence.save();
    } else {
      // Créer une nouvelle absence
      absence = new Absence({ idmatiere, ideleve, duree });
      await absence.save();
    }

    res.status(201).json({ success: true, absence });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'ajout de l'absence",
      error: error.message,
    });
  }
};

// ❌ Supprimer une matière et la retirer de toutes les classes
exports.supprimerAbsence = async (req, res) => {
  try {
    const { id } = req.params;
    const { duree } = req.body;

    const absence = await Absence.findById(id);
    if (!absence) {
      return res
        .status(404)
        .json({ success: false, message: "Absence non trouvée" });
    }

    // Si aucune durée n’est fournie, on supprime entièrement
    if (!duree || duree >= absence.duree) {
      await Absence.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ success: true, message: "Absence supprimée" });
    }

    // Sinon, on retranche la durée
    absence.duree -= duree;
    await absence.save();

    res
      .status(200)
      .json({ success: true, message: "Durée retranchée", absence });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur de suppression",
      error: error.message,
    });
  }
};

exports.listerAbsences = async (req, res) => {
  try {
    const absences = await Absence.find()
      .populate("idmatiere", "nom")
      .populate("ideleve", "nom prenom");

    res.status(200).json({ success: true, absences });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur de récupération",
      error: error.message,
    });
  }
};
exports.getAbsencePourEleveEtMatiere = async (req, res) => {
  try {
    const { ideleve, idmatiere } = req.params;

    const absence = await Absence.findOne({ ideleve, idmatiere }).populate(
      "idmatiere",
      "nom"
    );

    if (!absence) {
      return res.status(404).json({
        success: false,
        message: "Aucune absence trouvée pour cet élève et cette matière",
      });
    }

    // Vérification de la population
    if (!absence.idmatiere) {
      return res.status(500).json({
        success: false,
        message:
          "Référence de matière invalide ou non trouvée (population échouée).",
      });
    }

    res.status(200).json({
      success: true,
      absence: {
        matiereId: absence.idmatiere._id,
        nomMatiere: absence.idmatiere.nom,
        duree: absence.duree,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};
