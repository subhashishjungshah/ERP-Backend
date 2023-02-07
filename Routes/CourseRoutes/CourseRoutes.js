const express = require("express");
const router = express.Router();

const {
  getAllcourses,
  getSingleCourseInfo,
  addNewCourse,
  updateCourse,
  deleteCourse,
} = require("../../Controller/CourseController");

router.route("/courses/").get(getAllcourses).post(addNewCourse);
router
  .route("/courses/:courseName")
  .get(getSingleCourseInfo)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
