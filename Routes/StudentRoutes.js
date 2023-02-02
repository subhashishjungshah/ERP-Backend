const express = require("express");
const {
  getAllStudents,
  addNewStudent,
  getSingleStudent,
} = require("../Controller/StudentController");
const router = express.Router();

router.route("/getallstudents").get(getAllStudents);
router.route("/getsinglestudent").get(getSingleStudent);
router.route("/addstudent").post(addNewStudent);

module.exports = router;
