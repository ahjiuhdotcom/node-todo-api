// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

/*
var obj = new ObjectID();
console.log(obj);
*/
MongoClient.connect('mongodb://localhost/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    
    console.log('Connected to MongoDB server');
   
   /*
   db.collection('Todos').findOneAndUpdate({
       _id: new ObjectID('123456abc')
   }, {
       $set: {completed: true}
   }, {
       returnOriginal: false
   }).then((result) => {
       console.log(result);
   });
   */
   
   /*
   // CHALLENGE
   db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('123456abc') 
   }, {
      $set: {name: 'Andrew'},
      $inc: {
          age: 1
      }
   }, {
       returnOriginal: false
   }).then((result) => {
       console.log(result);
   });
   */
   
    // db.close();
});

