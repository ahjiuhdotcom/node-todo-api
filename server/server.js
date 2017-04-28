require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

   if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        
        res.send({todo});
        
    }).catch((e) => {
        res.status(400).send();
    });
});

// TO UPDATE
app.patch('/todos/:id', (req, res) => {
   var id = req.params.id;

   // pick property 'test', 'completed' from req.body
   // we don't want user able to update all other property manually, e.g. completedAt, _id
   // which is system automatic generated
   var body = _.pick(req.body, ['text', 'completed']);
   
   if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime(); // 'getTime()' is js time stamp
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    
    // {new: true} to to set the return object (in return promise, e.g. 'todo' item)
    // is updated oject or original object. 'new: true' means updated object
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});


module.exports = {
    app
};