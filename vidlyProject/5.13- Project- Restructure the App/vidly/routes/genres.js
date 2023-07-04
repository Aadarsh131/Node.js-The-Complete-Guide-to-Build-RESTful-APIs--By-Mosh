const express = require('express');
const auth = require('../middlewares/auth');
const {Genre,validateGenre} = require('../Model/genreModel')
const router = express.Router();


// const createGenre = async()=>{
//   const gen = new Genre({
//     name:'Ak-47'
//   })
//   await gen.save()
// }
// createGenre()

router.get('/', async(req, res) => {
  let genres =  await Genre.find();
  res.send(genres);
});

router.post('/',auth, async(req, res) => {//using auth(custom made) middleware and route handler middleware
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre ({name: req.body.name})
  await genre.save()
  res.send(genre);
});

router.put('/:id', async(req, res) => {
  // const genre = await Genre.find(c => c.id === parseInt(req.params.id));

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.update({_id:req.params.id},{
    $set:{
      name:req.body.name
    }
  });
  

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  
  res.send(genre);
});

router.delete('/:id', async(req, res) => {
  // const genre = genres.find(c => c.id === parseInt(req.params.id));
  const deletedDocument = await Genre.deleteOne({_id:req.params.id})
  if (!deletedDocument) return res.status(404).send('The genre with the given ID was not found.');

  res.send(deletedDocument);
});

router.get('/:id',async (req, res) => {
  const genre = await Genre.find({_id:req.params.id});
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});



module.exports = router;