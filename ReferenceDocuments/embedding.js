const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:{
    type:authorSchema,
    required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// createCourse('Mongo Course', new Author({ name: 'Atul' }));

/////updating a nested document//////
async function updateNestedAuthor(courseId){
  const course = await Course.findById(courseId)
  course.author.name = 'Jeetendra'
  // course.author.save() //this will not work(we cannot do the save() operation on child objects, instead use the parent objects)
  course.save() // this is valid
}
updateNestedAuthor('63bac25e3c613ad63b2115d2')
