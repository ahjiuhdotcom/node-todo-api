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
    db.collection('Todos').insertOne({
       text: 'Something to do',
       completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }
        
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    */
    /*
    db.collection('Users').insertOne({
       name: 'Andrew',
       age: 25,
       location: 'Philadelphia'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert use', err);
        }
        
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    */
    
    // we can get the time stamp of id is creacted from '_id' using '_id.getTimeStamp()'
    
    db.close();
});

