const mongoose = require("mongoose");
const Course = require("../model/coursesModel");

module.exports = {
  getAllCourse: async function (req, res) {
    try {
      const course = await Course.find();
      res.render("courseList.ejs", { courses: course });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  index: async function (req, res) {
    res.render("index");
  },

  courseLists: async function (req, res) {
    const courses = await Course.find();
    console.log(courses);
    res.render("courseList.ejs", { courses });
  },

  renderUpload: function (req, res) {
    res.render("uploadCourse.ejs");
  },

  uploadCourse: async function (req, res) {
    try {
      const course = await Course.create(req.body);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  editCourseByCodeGet: async function (req, res) {
    const courseCode = req.params.code;
    const course = await Course.findOne({ code: courseCode });
    res.render("editCourse.ejs", { course });
  },

  editCourseByCodePut: async function (req, res) {
    const courseCode = req.params.code;
    const { name, code, instructor, price, resource, rating } = req.body;
    const updatedCourse = await Course.findOneAndUpdate(
      { code: courseCode },
      { name, code, instructor, price, resource, rating },
      { new: true } // Return the updated course document
    );
    console.log(courseCode);

    if (updatedCourse) {
      res.redirect("/"); // Redirect after successful update
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  },
  deleteCourse: async function (req, res) {
    const courseCode = req.params.code;

    try {
      const deletedCourse = await Course.findOneAndDelete({ code: courseCode });

      if (deletedCourse) {
        res.redirect("/"); // Redirect to the homepage or course list
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error });
    }
  },

  ////for USER SIDE
  courseDetail: async function (req, res) {
    const courses = await Course.find();
    res.render("courseDetail.ejs", { courses });
  },

  eachCourse: async function (req, res) {
    try {
      // Find all courses (if needed)
      const courses = await Course.find();

      // Find a specific course by its code (using findOne for single result)
      const course = await Course.findOne({ code: req.params.code });

      // Check if the course was found
      if (!course) {
        return res.status(404).send("Course not found"); // Handle if no course matches the code
      }

      // Render the course detail page with both the list of all courses and the selected course
      res.render("eachCourse.ejs", { courses, course });
    } catch (error) {
      // Handle errors in the database query
      console.error(error);
      res.status(500).send("Error retrieving course data");
    }
  },
};
