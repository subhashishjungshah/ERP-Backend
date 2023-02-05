const { StatusCodes } = require("http-status-codes");
const Student = require("../../models/student");
const { BadRequestError, UnauthenticatedError } = require("../../errors/index");

// Register Student controller
const registerStudents = async (req, res) => {
  const student = await Student.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(student);
};
// login controller
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Invalid Credentials");
  }
  const student = await Student.findOne({ email });
  if (!student) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // Checking for the password
  const isPasswordCorrect = await student.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = student.createJWT();
  res.status(StatusCodes.OK).json({
    student: {
      RegistrationNumber: student.RegistrationNumber,
      name: student.firstName,
    },
    token,
  });
};

module.exports = { login, registerStudents };
