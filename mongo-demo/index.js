const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground').then(()=>console.log('connected to mongodb(better to use debug module)....')).catch((err)=>console.log('could not connect to db',err))

const courseSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match:/pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['Web','Mobile','Network']
    },
    author: String,
    // tags: [String],
    tags:{
        type:Array,
        validate:{
            isAsync:true,
            validator: function(v){
                // below code didn't worked: check why???(code is as same as in the lecture)
                // setTimeout(()=>{
                //     const validatorRes= v.length > 0
                //     callback(validatorRes)
                    
                // },4000)
                return v.length > 0
            },
            message: 'Should have atleast one value in arr'
        }
    },
    date: {type:Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type:Number,
        required: function(){ console.log('"this" value-------->',this); return this.isPublished},
        min:10,
        max:9000
    },
    
})

const Course = mongoose.model('Course',courseSchema) //Pascal case for Classes

async function createCourse(){
    const course = new Course({ //camel case for objects
        name: 'Physics',
        category: 'fefe',
        author: 'Aadarsh KUMAR SHah',
        // tags: ['BSC','Phy'],
        tags:[],
        price: 5000,
        isPublished: true
    })
    
    try{
        const result = await course.save();
        // await course.validate();//returns promise of type void
        console.log(result);
    }catch(ex){
        // console.log(ex.message);
        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
        // console.log(ex.errors);
    }
}
createCourse()

async function getCourse(){
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // lt (less than)
    // gte(greater than or equals to)
    // lte(less than or equals to)
    // in
    // nin(not in)
    ///////////Logical Operator/////////
    //or
    //and

    const courses = await Course
    .find({author:'Aadarsh',tags:{$in:['angular','backend','frontend','Database']}})
    // .find({price:{$gte:10, $lte: 20}})
    // .find({price:{$in:[15,20,30]}})

    // .find()
    // .or([{author:'Aadarsh'},{isPublished:true}])
    // .and([{author:'Aadarsh'},{isPublished:true}])
    .limit(10)
    // .sort({name:1})
    .sort('-price')
    .select({name:1,tags:1, author:1,price:1})
    // .count()
    // console.log(courses);
}
// getCourse()


///////////UPDATing Document////////////
//2 approaches-

/*Approach: Query first
findById()
Modify it properties and save
*/

/*Approach: Update first
Update directly
optionally: get the updated data
*/


async function updateCourse(id){
    // const course = await Course.findById(id)//Mostly used for Business logics

    // if(!course) return;
    // course.isPublished = true
    // course.author = 'New Author'
    
    /*set method*/
    // course.set({
    //     isPublished:true,
    //     author: "New Author"
    // })

    //////update method///////
    // const course = await Course.update({_id:id},{
    //     $set:{
    //         isPublished:true,
    //         author:'Unique Author'
    //     }
    // })

    /////////findByIdAndUpdate method/////////
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            price:5000,
            isPublished:true,
            author:'Aadarsh Kumar Shah'
        }
    },{new: true}) // {new: true} ensures the clg is the new data
    
    
    const updatedCourse = await course.save()//.save() returns a promise
    console.log(updatedCourse);
}
// updateCourse('63ad3b7589545f1bf3f0f4c3')


///////////DELETING Document////////////
async function deleteDocument(id){
    // const course  = await Course.deleteOne({_id:id})//if deleteOne recieves multiple documents, it will delete the first one
    const course = await Course.findByIdAndRemove(id)
    console.log(course);
}
// deleteDocument('63a82caaee624877076df3ef')

// createCourse()