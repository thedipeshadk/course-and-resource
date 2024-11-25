const express = require("express");
const courseController = require("./controller/courseController");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/educationSystem");

app.get("/", courseController.index);

//
app.get("/courseDetail", courseController.courseDetail);

app.get("/eachCourse/:code", courseController.eachCourse);

//for admin
app.get("/admin-courses", courseController.courseLists);
app.get("/upload", courseController.renderUpload);
app.post("/uploadCourse", courseController.uploadCourse);
app.get("/editCourseByCode/:code", courseController.editCourseByCodeGet);
app.post("/editCourseByCode/:code", courseController.editCourseByCodePut);
app.post("/deleteCourse/:code", courseController.deleteCourse);

app.listen(8000, (req, res) => {
  console.log("connected!");
});
