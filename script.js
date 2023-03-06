const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./person'); 


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  // create a new Person instance
const person = new Person({
    name: 'Marwan Abdou',
    age: 25,
    favoriteFoods: ['pizza', 'burgers']
  });
  
  // save the Person instance to the database 
  person.save().then(() => console.log("Data saved"))

  // array of people objects
const arrayOfPeople = [
    { name: 'John Doe', age: 30, favoriteFoods: ['pizza', 'hamburger', 'burritos'] },
    { name: 'Jane Doe', age: 25, favoriteFoods: ['spaghetti', 'salad'] },
    { name: 'Bob Smith', age: 40, favoriteFoods: ['steak', 'potatoes', 'burritos'] },
    { name: 'Mary Mary', age: 40, favoriteFoods: ['steak', 'potatoes'] }

  ];
  
  // create the people in the array using Model.create()
  Person.create(arrayOfPeople)
  .then(people => {
    console.log(people);
  })
  .catch(err => {
    console.log(err);
  });


  // find all people with a given name using Model.find()
Person.find({ name: 'Marwan Abdou' })
.then(() => {
  console.log("matching name found using find method");
})
.catch(err => {
  console.log(err);
});

// find a single matching document with a given favorite food using Model.findOne()
Person.findOne({ favoriteFoods: 'burgers' })
.then(people => {
  console.log(people);
})
.catch(err => {
  console.log(err);
});


// searching by id
Person.findById('6405ec32a915a218b3bd15c1')
.then(people => {
  console.log(people);
  console.log('matching id found')
})
.catch(err => {
  console.log(err);
});

//Perform Classic Updates by Running Find, Edit, then Save
Person.findOneAndUpdate(
  { _id: '6405f43c536a33c831e7b16c' },
  { $push: { favoriteFoods: 'koshary' } },
  { new: true }
)
.then(updatedPerson => {
  return updatedPerson.save();
})
.then(savedPerson => {
  console.log(savedPerson);
})
.catch(error => {
  console.log(error);
});

  
//Perform New Updates on a Document Using model.findOneAndUpdate()
  Person.findOneAndUpdate({ name: 'Bob Smith' }, { age: 20 }, { new: true })
  .then(updatedPerson => {
    console.log(updatedPerson);
  })
  .catch(error => {
    console.log(error);
  });

  //Delete One Document Using model.findByIdAndRemove
  Person.findByIdAndRemove('6405f45b087ee1ac7867aa4c')
  .then(removedPerson => {
    console.log(`Removed person: ${removedPerson}`);
  })
  .catch(err => {
    console.log(err);
  });

//MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.deleteMany({ name: 'Mary' })
  .then(result => {
    console.log(`Deleted ${result.deletedCount} person(s)`);
  })
  .catch(error => {
    console.log(error);
  });


//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: 'burritos' })
  .sort({ name: 'asc' })
  .limit(2)
  .select('-age')
  .then(people => {
    console.log(people);
  })
  .catch(err => {
    console.log(err);
  });

