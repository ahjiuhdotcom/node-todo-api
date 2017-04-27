const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
/*

// remove everything
// we can't simply put .remove(), must pass in an empty object .remove({})
Todo.remove({}).then((result) => {
   console.log(result); 
});
*/

Todo.findOneAndRemove({_id: '12345'}).then((todo) => {
   console.log(todo);   
});

Todo.findByIdAndRemove('12345').then((todo) => {
    console.log(todo);      
});