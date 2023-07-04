const express = require('express');
const _ = require('lodash')
const Joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User} = require('../Model/users')
const router = express.Router();

router.get('/',async(req,res)=>{
    const users = await User.find();
    res.send(users)
})

router.post('/',async(req,res)=>{
    const {error} = ValidateEmailandPass(req.body)
    if(error) return res.status(400).send(error.details)

    const user = await User.findOne({email:req.body.email})
    // console.log(user.password,req.body.password);
    if(user.length == 0) return res.status(400).send('Email Doesnt exist')

    const ValidatePass = await bcrypt.compare(req.body.password,user.password)
    if(!ValidatePass) return res.status(400).send('Invalid Password')
    // const token = jwt.sign({_id:user._id}, 'hereComesAPrivateKey')//never store secret key like private key in source codes, instead store it in an environment variable
    const token = user.genAuthToken();
    res.send(token)

})

function ValidateEmailandPass(User) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(User, schema);
}


module.exports = router