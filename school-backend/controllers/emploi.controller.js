const mongoose = require("mongoose");
const Emploi = require("../models/Emploi");
const Classe = require("../models/Classe");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.addEmploi = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { idClasse, date, id } = req.body;

      if (!idClasse || !date) {
        return res
          .status(400)
          .json({ message: "id, idClasse, and date are required" });
      }

      // Verify if idClasse exists in Classe collection - FIXED HERE
      const classe = await Classe.findById(idClasse);
      if (!classe) {
        return res.status(404).json({ message: "Classe not found" });
      }

      // Check if Classe already has an associated Emploi (enforcing 1..1 relationship)
      if (classe.idEmploi) {
        return res
          .status(400)
          .json({ message: "Classe already has an associated Emploi" });
      }

      const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : "";

      const newEmploi = new Emploi({
        id,
        idClasse,
        image: imagePath,
        date,
      });

      const savedEmploi = await newEmploi.save();

      // Update Classe with the new Emploi's id
      classe.idEmploi = savedEmploi.id;
      await classe.save();

      res.status(201).json(savedEmploi);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding emploi", error: error.message });
    }
  },
];

exports.deleteEmploi = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    // Find the Emploi to get its idClasse - FIXED: pass id directly
    const emploi = await Emploi.findById(id);
    if (!emploi) {
      return res.status(404).json({ message: "Emploi not found" });
    }

    // Verify if idClasse exists in Classe collection - FIXED: pass id directly
    const classe = await Classe.findById(emploi.idClasse);
    if (!classe) {
      return res.status(404).json({ message: "Classe not found" });
    }

    // Delete the Emploi - FIXED: pass id directly
    const deletedEmploi = await Emploi.findByIdAndDelete(id);
    if (!deletedEmploi) {
      return res.status(404).json({ message: "Emploi not found" });
    }

    // Update Classe by removing the idEmploi reference
    classe.idEmploi = null;
    await classe.save();

    res.status(200).json({ message: "Emploi deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting emploi", error: error.message });
  }
};

exports.getEmploiById = async (req, res) => {
  try {
    const { id } = req.params;

    const emploi = await Emploi.findById(id);
    if (!emploi) {
      return res.status(404).json({ message: "Emploi not found" });
    }

    res.status(200).json(emploi);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching emploi", error: error.message });
  }
};

exports.getAllEmplois = async (req, res) => {
  try {
    const emplois = await Emploi.find().populate("idClasse");

    res.status(200).json(emplois);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching emplois", error: error.message });
  }
};

exports.getEmploiByClasseId = async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      return res.status(400).json({ message: "classId is required" });
    }

    const emploi = await Emploi.findOne({ idClasse: classId }).populate(
      "idClasse"
    );

    if (!emploi) {
      return res
        .status(404)
        .json({ message: "Aucun emploi trouvé pour cette classe" });
    }

    res.status(200).json(emploi);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'emploi",
      error: error.message,
    });
  }
};
