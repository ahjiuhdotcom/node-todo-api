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
    // deleteMany
    // Assume there are several {text: 'Eat lunch'}
    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result)=> {
        console.log(result);
    });
    */
    
    /*
    //deleteOne
    // delete the first item that meet the criteria
    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=> {
        console.log(result);
    });
    */
    
    /*
    //findOneAndDelete
    // same as deleteOne, but we can get the details of the deleted doc in the 
    // 'result' object in the promise
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
       console.log(result); 
    });
    */
    
    /*
    // CHALLENGE
    db.collection('Users').deleteMany({name: 'Andrew'});
    
    db.collection('Users').findOneAndDelete({_id: new ObjectID("123456abc")})
        .then((results) => {
            console.log(JSON.stringify(results, undefined, 2));
        });
    */
    
    // db.close();
});

