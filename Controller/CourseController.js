const Course = require("../models/Courses");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");

const getAllcourses = async (req, res) => {
  const course = await Course.find({});
  res.status(StatusCodes.OK).json(course);
};

const getSingleCourseInfo = async (req, res) => {
  const { courseName } = req.params;
  try {
    const course = await Course.findOne({ courseName });
    if (!course) {
      throw new BadRequestError("Course Doesn't Exist!");
    }
    res.status(StatusCodes.OK).json(course);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const addNewCourse = async (req, res) => {
  const course = await Course.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(course);
};

const updateCourse = (req, res) => {};

const deleteCourse = (req, res) => {};

module.exports = {
  getAllcourses,
  addNewCourse,
  updateCourse,
  deleteCourse,
  getSingleCourseInfo,
};
