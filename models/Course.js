const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minLength: [5, "Title must be at least 5 charater"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  instructor: {
    type: String,
    required: [true, "instructor is required"],
  },
  duration: {
    type: Number,
    required: [true, "duration is required"],
    min:[0,"Duration must be a positive number"]
  },
});
//create a collection with rules
module.exports = mongoose.model("Course",courseSchema);