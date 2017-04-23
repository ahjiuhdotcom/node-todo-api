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
    // db.collection('Todos').find().toArray()
    // db.collection('Todos').find({completed: false}).toArray()
    // db.collection('Todos').find({_id: '58f9a454e86d930af9e08452')}).toArray() // This will not work
    db.collection('Todos').find({_id: new ObjectID('58f9a454e86d930af9e08452')}).toArray()
        .then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });    
    */
    /*
    db.collection('Todos').count()
        .then((count) => {
            console.log(`Todos count: ${count}`);
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });
    */
    
    // CHALLENGE
    db.collection('Users').find({name: 'Andrew'}).toArray()
        .then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2));
        });
        
    // db.close();
});

