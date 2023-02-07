const express = require("express");
const {
  getSingleStudent,
  getCourseInformation,
} = require("../../Controller/student/StudentController");
const router = express.Router();
router.route("/getsinglestudent").get(getSingleStudent);
router.route("/getCourseInformation").get(getCourseInformation);
module.exports = router;
