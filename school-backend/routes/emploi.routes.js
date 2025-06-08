const express = require("express");
const router = express.Router();
const emploiController = require("../controllers/emploi.controller");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/role");

router.post(
  "/addEmploi",
  auth,
  checkRole(["admin"]),
  emploiController.addEmploi
);
router.delete(
  "/deleteEmploi/:id",
  auth,
  checkRole(["admin"]),
  emploiController.deleteEmploi
);
router.get("/getEmploi/:id", auth, emploiController.getEmploiById);

router.get("/getEmplois", auth, emploiController.getAllEmplois);

router.get("/classe/:classId", auth, emploiController.getEmploiByClasseId);

module.exports = router;
