const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/role");

router.get("/:id/getinfo", auth, studentController.GetInfo);

router.get(
  "/getstudents",
  auth,
  checkRole(["admin"]),
  studentController.GetStudents
);

router.put(
  "/:id/update",
  auth,
  checkRole(["admin"]),
  studentController.UpdateStudent
);

router.delete(
  "/:id/delete",
  auth,
  checkRole(["admin"]),
  studentController.DeleteStudent
);

router.post(
  "/student",
  auth,
  checkRole(["admin"]),
  studentController.createStudent
);

module.exports = router;
