const express = require('express');
const { Movie } = require('../Model/moviesModel');
const { Genre } = require('../Model/genreModel')
const router = express.Router();

router.get('/',async(req,res)=>{
    const movies = await Movie.find();
    res.send(movies)
})

router.post('/',async(req,res)=>{
    const genre = await Genre.findById(req.body.genreID)
    const movies = new Movie({
        title:req.body.title,
        // genre:genre,//usually we dont need all the object properties
        genre: {//setting only those properties which is needed
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    await movies.save()
    res.send(movies)
})

// const createMovie = async(genre)=>{
//     const movie = new Movie({
//         title:'Thrones',
//         genre: genre,
//         numberInStock: 2,
//         dailyRentalRate:200    
//     })
//     await movie.save()

// }
// createMovie(new Genre({name:'Thriller'}))

module.exports = router