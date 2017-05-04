require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

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

// SIGN UP
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        // 'x-' is custom header, not build in http header
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// Doing something with authenticated user, e.g. get the user
app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
});

// LOGIN
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        // Why regenerate token?
        // Andrew:  You could use a token generated from one device on another 
        // if you wrote the code to do that. 
        // The idea is to avoid one single token that lives on forever.
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
   req.user.removeToken(req.token).then(() => {
      res.status(200).send(); 
   }, () => {
       res.status(400).send();
   });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});


module.exports = {
    app
};