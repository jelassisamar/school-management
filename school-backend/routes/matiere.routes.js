const express = require("express");
const router = express.Router();
const matiereController = require("../controllers/matiere.controller");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/role");

router.get(
  "/getmatieres",
  auth,

  matiereController.getMatiere
);

router.post(
  "/addmatiere",
  auth,
  checkRole(["admin"]),
  matiereController.addMatiere
);
router.delete(
  "/:id/deletematiere",
  auth,
  checkRole(["admin"]),
  matiereController.deleteMatiere
);

module.exports = router;
