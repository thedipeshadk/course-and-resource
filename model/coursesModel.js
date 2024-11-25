const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  instructor: { type: String },
  price: { type: Number },
  resource: { type: String },
  rating: { type: Number },
});

module.exports = mongoose.model("Course", courseSchema);
