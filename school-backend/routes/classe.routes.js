const express = require("express");
const router = express.Router();
const classeController = require("../controllers/classe.controller");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/role");

router.post("/add", auth, checkRole(["admin"]), classeController.createClasse);
router.get("/list", auth, checkRole(["admin"]), classeController.listClasses);
router.put(
  "/update/:id",
  auth,
  checkRole(["admin"]),
  classeController.updateClasse
);

router.delete(
  "/delete/:id",
  auth,
  checkRole(["admin"]),
  classeController.deleteClasse
);

router.get(
  "/:id/matieres",
  auth,
  checkRole(["admin"]),
  classeController.getMatieresParClasse
);
module.exports = router;
