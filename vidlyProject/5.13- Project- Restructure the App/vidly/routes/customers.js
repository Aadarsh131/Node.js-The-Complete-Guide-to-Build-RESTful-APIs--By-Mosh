const express = require('express')
const router = express.Router()
const {Customers,validateCustomer} = require('../Model/customersModel')

// const createCustomers = async()=>{
//     const customer = new Customers({
//         name: 'Rohan',
//         phone: 4586598659,
//         isGold: false
//     })
//     try{
//         await customer.save();
//     }catch(ex){
//         console.log(ex);
//     }
// }
// createCustomers()

router.get('/',async(req,res)=>{
    const customers = await Customers.find();
    res.send(customers)
})

router.post('/',async(req,res)=>{
    const validatedCustomer = validateCustomer(req.body);
    if(!validatedCustomer) res.status(400).send(validateCustomer)

    const customer = new Customers({
        name:req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    await customer.save()
    res.send(customer)
})



module.exports = router