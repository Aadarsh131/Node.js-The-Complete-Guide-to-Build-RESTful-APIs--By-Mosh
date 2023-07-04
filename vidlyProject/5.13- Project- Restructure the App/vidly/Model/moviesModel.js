const mongoose = require("mongoose");
const Joi = require('Joi')
const { genreSchema} = require('./genreModel')

const moviesSchema = mongoose.Schema({
    title:{
      type:String,
      required: true,
    },
    genre: {
      type:genreSchema,
      required:true
    },
    numberInStock: Number,
    dailyRentalRate: Number
})
  
const Movie = mongoose.model('Movie',moviesSchema)

// exports.moviesSchema = moviesSchema;
exports.Movie = Movie