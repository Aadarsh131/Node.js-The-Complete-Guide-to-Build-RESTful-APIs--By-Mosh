const express = require('express');
const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User, validateUser} = require('../Model/users');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const router = express.Router();

router.get('/',async(req,res)=>{
    const users = await User.find();
    res.send(users)
})

router.get('/myID',auth,async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password")
    res.send(user)
})

router.post('/',async(req,res)=>{
    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details)

    const acc = await User.find({email:req.body.email})
    if(acc.length != 0) return res.status(400).send('Email already registered!!')
    // const user = new User({
    // name:req.body.name,
    // email: req.body.email,
    // password: req.body.password
    // })
    let user = new User(_.pick(req.body,['name','email',"password"]))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
    await user.save()
    // const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'));//according to "Information Expert Priniciple", we are going to move out the signature object to the User's modal, as we are handling users logic there and it is our 'Information Expert'
    
    //instead making a reusable way to handle token
    const token = user.genAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['name','email']))
})

router.delete('/',[auth,admin],async(req,res)=>{
    const user = await User.findByIdAndRemove(req.user._id) //"req.user._id" is from the token signature payload
    res.send(user)
})

module.exports = router