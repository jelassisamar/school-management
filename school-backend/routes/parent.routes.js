const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parent.controller");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/role");

router.get(
  "/:id/enfants",
  auth,

  parentController.getParentWithChildren
);

router.post(
  "/addParent",
  auth,
  checkRole(["admin"]),
  parentController.ajouterParent
);
router.delete(
  "/:id/deleteParent",
  auth,
  checkRole(["admin"]),
  parentController.supprimerParent
);

router.get(
  "/getparents",
  auth,
  checkRole(["admin"]),
  parentController.GetParents
);
router.put(
  "/:id/updateParent",
  auth,
  checkRole(["admin"]),
  parentController.updateParent
);
router.delete(
  "/:parentId/:studentId/enfants",
  auth,

  parentController.deleteParentChildren
);

router.post("/:parentId/enfants", auth, parentController.addParentChildren);

module.exports = router;
