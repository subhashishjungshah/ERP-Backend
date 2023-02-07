const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const studentSchema = new mongoose.Schema({
  RegistrationNumber: {
    type: String,
    unique: true,
  },
  studentStatus: {
    type: String,
    enum: {
      values: ["PASSED OUT", "ACTIVE", "DROPPED"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Student's status is required"],
    default: "ACTIVE",
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
  },
  sex: {
    type: String,
    required: [true, "Please provide your sex!"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  phoneNumber: {
    type: [String],
    required: [true, "Please provide phone number!"],
  },
  dob: {
    type: Date,
    required: [true, "Please provide date of birth"],
  },
  address: {
    type: String,
    required: [true, "Please provide address!"],
  },
  enrollmentDate: {
    type: Date,
    default: Date.now(),
  },
  Section: {
    type: String,
    required: [true, "Please provide section!"],
  },
  currentSem: {
    type: String,
    enum: {
      values: ["I", "II", "III", "IV", "V", "VI", "VII"],
      message: "{VALUE} is not supported",
    },
    default: "I",
  },
  faculty: {
    type: String,
    enum: {
      values: ["IT", "HM", "BBA"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Please provide faculty!"],
  },
  fathersName: {
    type: String,
  },
  mothersName: {
    type: String,
  },
  guardianNumber: {
    type: String,
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
