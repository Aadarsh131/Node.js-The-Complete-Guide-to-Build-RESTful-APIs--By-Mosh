//////////DEFINING MODEL and Validation///////////////

const mongoose = require('mongoose')
const Joi = require('Joi')

const customerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type: Number,
        min:10,
    },
    isGold:Boolean
})

const Customers = mongoose.model('Customer',customerSchema)

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone:Joi.number().integer().min(10),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(customer, schema);
}

exports.Customers = Customers;
exports.validateCustomer = validateCustomer