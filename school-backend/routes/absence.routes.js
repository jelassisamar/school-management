const express = require("express");
const router = express.Router();
const absenceController = require("../controllers/absence.controller");
const auth = require("../middlewares/auth");

router.post("/addabsence", auth, absenceController.ajouterAbsence);
router.get("/getabsences", auth, absenceController.listerAbsences);
router.delete("/deleteabsence/:id", auth, absenceController.supprimerAbsence);
router.get(
  "/:ideleve/:idmatiere",
  auth,
  absenceController.getAbsencePourEleveEtMatiere
);

module.exports = router;
