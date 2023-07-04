const Joi = require('joi');
const config = require("config")
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const users = require('./routes/users')
const auth = require('./routes/auth')
const express = require('express');
const mongoose = require('mongoose')
const app = express();

if(!config.get('jwtPrivateKey')){
    console.error('FATAL Error: PrivateKey not found')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/vivdly').then(()=>console.log('db connected...')).catch(()=>console.log("couldn't connect with db"))

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers',customers)
app.use('/api/movies',movies)
app.use('/api/users',users)
app.use('/api/auth',auth)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));