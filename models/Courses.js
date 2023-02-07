const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    enum: {
      values: ["IT", "HM", "BBA"],
      message: "{VALUE} is not supported",
    },
    trim: true,
    required: [true, "Please provide faculty!"],
  },
  modules: {
    type: [String],
  },
  description: {
    type: "String",
  },
});

module.exports = mongoose.model("Course", courseSchema);
