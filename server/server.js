var express = require('express');
var bodyParser = require('body-parser'); 

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

app.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});


module.exports = {
    app
}