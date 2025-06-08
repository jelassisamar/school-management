const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/role");
const adminController = require("../controllers/admin.controller");

router.post("/register/admin", adminController.createAdmin);

router.post(
  "/add",
  auth,
  checkRole(["admin"]),
  adminController.addStudentToParent
);

module.exports = router;
