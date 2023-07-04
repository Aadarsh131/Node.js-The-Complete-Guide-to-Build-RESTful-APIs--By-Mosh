const config = require("config");
const startupDebugger = require('debug')('express:startup')
const dbDebugger = require('debug')('express:db')
const express = require("express");
const mongoose = require('mongoose')
const app = express();

const goto = require('./routes/goto')
const home = require('./routes/home')



app.use('/goto',goto)
app.use('/',home)


//using middleware
app.use(express.json()); //express.json() returns a middleware
//without this middleware, listener cannot understand req.body(), it will be undefined


///////////////Env Varibles/////////
console.log(`Environment ${process.env.NODE_ENV}`);//it is undefined(Development by default)
console.log(app.get('env'))


///////////////CONFIG///////////////
console.log(`app name:${config.get("name")}`);
console.log(`mail server:${config.get("mail.host")}`);
console.log(`password:${config.get("mail.password")}`);

///////////////Debugging///////////////
startupDebugger('startup debugger on...')
dbDebugger('db debugger on...')

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}...`));
