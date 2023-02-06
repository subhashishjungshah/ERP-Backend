const { StatusCodes } = require("http-status-codes");
const Student = require("../../models/student");
// Retrieve a single student data for dashboard
const getSingleStudent = async (req, res) => {
  try {
    const { email } = req.user;
    const student = await Student.findOne({ email }).select("-password");
    res.status(200).json(student);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getSingleStudent };
