const Classe = require("../models/Classe");
const Matiere = require("../models/Matiere");
exports.createClasse = async (req, res) => {
  try {
    const { nom } = req.body;

    const classeExistante = await Classe.findOne({ nom });
    if (classeExistante) {
      return res.status(409).json({
        success: false,
        message: "Une classe avec ce nom existe déjà.",
      });
    }

    const nouvelleClasse = new Classe({ nom });
    await nouvelleClasse.save();

    res.status(201).json({
      success: true,
      message: "Classe créée avec succès",
      classe: nouvelleClasse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de la classe",
      error: error.message,
    });
  }
};
exports.listClasses = async (req, res) => {
  try {
    // Get all classes with populated students (enfants)
    const classes = await Classe.find()
      .populate({
        path: "enfants",
        select: "nom prenom dateNaissance", // Only include these student fields
        options: { sort: { nom: 1 } }, // Sort students by name
      })
      .sort({ nom: 1 }); // Sort classes by name

    // Format the response
    const formattedClasses = classes.map((classe) => ({
      _id: classe._id,
      nom: classe.nom,
      dateCreation: classe.dateCreation,
      nombreEleves: classe.enfants.length,
      enfants: classe.enfants.map((eleve) => ({
        _id: eleve._id,
        nomComplet: `${eleve.prenom} ${eleve.nom}`,
        dateNaissance: eleve.dateNaissance,
      })),
    }));

    res.status(200).json({
      success: true,
      count: classes.length,
      classes: formattedClasses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des classes",
      error: error.message,
    });
  }
};

exports.updateClasse = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.body;

    // Vérifie si une autre classe porte déjà ce nom (différent de celle qu'on met à jour)
    const classeExistante = await Classe.findOne({ nom, _id: { $ne: id } });
    if (classeExistante) {
      return res.status(409).json({
        success: false,
        message: "Une autre classe avec ce nom existe déjà.",
      });
    }

    const classeUpdated = await Classe.findByIdAndUpdate(
      id,
      { nom },
      { new: true, runValidators: true }
    );

    if (!classeUpdated) {
      return res.status(404).json({
        success: false,
        message: "Classe non trouvée.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Classe mise à jour avec succès",
      classe: classeUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de la classe",
      error: error.message,
    });
  }
};

exports.deleteClasse = async (req, res) => {
  try {
    const { id } = req.params;

    const classeDeleted = await Classe.findByIdAndDelete(id);

    if (!classeDeleted) {
      return res.status(404).json({
        success: false,
        message: "Classe non trouvée.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Classe supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de la classe",
      error: error.message,
    });
  }
};

exports.getMatieresParClasse = async (req, res) => {
  try {
    const { id } = req.params; // id de la classe

    const matieres = await Matiere.find({ classes: id }).select(
      "nom coefficient"
    );

    res.status(200).json({ success: true, matieres });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur de récupération",
      error: error.message,
    });
  }
};
