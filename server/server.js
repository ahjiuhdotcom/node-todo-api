var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// get the json string and convert it to js object (in req.boy)
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
      // send back the information in object {} form
      // give us more flexibility e.g. allow us to 
      // add other property to it later 
      res.send({todos}); 
   }, (e) => {
      res.status(400).send(e); 
   }); 
});

app.get('/todos/:id', (req, res) => {
   var id = req.params.id;

   if (!ObjectID.isValid(id)) {
        console.log('ID not valid');
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        
        // res.send({todo: todo});
        res.send({todo});
        
    }).catch((e) => {
        res.status(400).send();
    });
    
});

app.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});


module.exports = {
    app
};