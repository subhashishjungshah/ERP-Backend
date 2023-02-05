const express = require("express");
const router = express.Router();
const {
  login,
  registerStudents,
} = require("../../Controller/student/LoginController");

router.route("/login").post(login);
router.route("/registerStudent").post(registerStudents);
module.exports = router;

// this is dipesh code
