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
       // 'returnOriginal' is wheather we want original object or updated object
       // return in 'then' promise. Set to false means return updated object
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

