const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const studentSchema = new mongoose.Schema({
  RegistrationNumber: {
    type: String,
    unique: true,
    trim: true,
  },
  studentStatus: {
    type: String,
    enum: {
      values: ["PASSED OUT", "ACTIVE", "DROPPED"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Student's status is required"],
    default: "ACTIVE",
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    trim: true,
  },
  sex: {
    type: String,
    required: [true, "Please provide your sex!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    trim: true,
  },
  phoneNumber: {
    type: [String],
    required: [true, "Please provide phone number!"],
    trim: true,
  },
  dob: {
    type: Date,
    required: [true, "Please provide date of birth"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please provide address!"],
    trim: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now(),
  },
  Section: {
    type: String,
    required: [true, "Please provide section!"],
    trim: true,
  },
  currentSem: {
    type: String,
    enum: {
      values: ["I", "II", "III", "IV", "V", "VI", "VII"],
      message: "{VALUE} is not supported",
    },
    trim: true,
    default: "I",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  fathersName: {
    type: String,
    trim: true,
  },
  mothersName: {
    type: String,
    trim: true,
  },
  guardianNumber: {
    type: String,
    trim: true,
  },
  educationalBackgroud: {
    type: [String],
  },
  previousGrading: {
    type: [Number],
  },
  scholorship: {
    type: Number,
    default: 0,
    trim: true,
  },
});

studentSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

studentSchema.methods.getID = function () {
  return this._id;
};
studentSchema.methods.createJWT = function () {
  return jwt.sign({ email: this.email }, "jwtSecret", {
    expiresIn: "30d",
  });
};
studentSchema.methods.comparePassword = async function (providedPassword) {
  const isMatch = bcrypt.compare(providedPassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("Student", studentSchema);
