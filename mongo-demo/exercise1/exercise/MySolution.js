const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises').then(()=>console.log('db connected....')).catch((err)=>console.log('error:',err))

const courseSchema = mongoose.Schema({
    tags: [String],
    date: {type: Date,default:Date.now()},
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course',courseSchema)

async function getResult(){

    let course = await Course.find({isPublished: true,tags:{$in:["backend"]}}).sort({name:1}).select({name:1,author:1})

    console.log(course);
}
getResult()

