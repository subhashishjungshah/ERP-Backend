const express = require("express");
const {
  getSingleStudent,
} = require("../../Controller/student/StudentController");
const router = express.Router();
router.route("/getsinglestudent").get(getSingleStudent);
module.exports = router;
