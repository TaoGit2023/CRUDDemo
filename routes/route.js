const express = require("express");
const router = express.Router();
// CLUSTER DATABASE COLLECTION DOCUMENTS,FIELD

const Course = require("../models/Course");
router.get('/courses',async (req,res)=>{
  const courses = await Course.find();
    res.status(200).send(courses)
})

router.put('/courses/:id',async (req, res)=>{
  const courseId = req.params.id
  try {
    const course = await Course.findByIdAndUpdate(courseId,req.body,{new:true,})
    if(!course){
      return res.status(404).json({error:"cannot find the course"})
    }
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.delete("/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ error: "cannot find the course" });
    }
    res.json("Course deleted332");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/courses", async (req, res) => {
  try {
    console.log(req.body)
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course)
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
