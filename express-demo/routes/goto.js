const express = require("express");
const mongoose = require('mongoose');
const router = express.Router()

// //small database
// const course = [
//     { id: 1, book: "A Game of Thrones" },
//     { id: 2, book: "Song of Ice and Fire" },
//     { id: 3, book: "Star Wars" },
//   ];



router.get("/courses/", async(req, res) => {
    //   res.send(req.params);
    //   res.send(req.query);
    res.send(course);

    // ///////////using mongoDB////////
    // const course = await courseE.find();
    // res.send(course)
  });
  
  // router.get("/courses/:id", (req, res) => {
  //   const c = course.find((obj) => obj.id === parseInt(req.params.id));
  //   console.log("object", c);
  //   if (c) res.send(c);
  //   res.status(404).send("NOT FOUND");
  // });
  
  // router.post("/courses", (req, res) => {
  //   //by default we cannot access the "body" in express, so using json()middleware above. express.json() returns json object and sets it to 'req.body' if it finds anything to parse, else control passes on to the next middleware
  
  //   if (!req.body.name || req.body.name.length < 3) {
  //     res.status(400).send("Name is required of min 3 characters");
  //     return;
  //   }
  
  //   const tempCourse = {
  //     id: course.length + 1,
  //     name: req.body.name,
  //   };
  //   course.push(tempCourse);
  //   res.send(tempCourse); //by convention after 'post' req, the server should show the updated data to the user
  // });

  module.exports = router