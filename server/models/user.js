const mongoose =require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
   email: {
       type: String,
       required: true,
       trim: true,
       minlength: 1,
       unique: true,
       // google mongoose validator for details
       validate: {
           validator: (value) => {
                // require npm module 'validator'
               return validator.isEmail(value);
           },
           message: '{VALUE} is not a valid email'
       }
   },
   password: {
       type: String,
       require: true,
       minLength: 6
   },
   tokens: [{
       access: {
          type: String,
          required: true
       },
       token: {
          type: String,
          required: true
       }
   }]
});

// Add custom methods to the instance of the User model (instance method)
// Limits/reduces the information that available in the return body
// this method automatic called in 're.send'
// Andrew 1: res.send calls toJSON if it's called with an object
// Andrew 2: It's automatically called when we respond to the express request with res.send. 
// That converts our object to a string by calling JSON.stringify. 
// JSON.stringify is what calls toJSON.
// Sia: We are actually overiding .toJSON() method
UserSchema.methods.toJSON = function() {
    var user = this;
    // 'user.toObject()' taking mongoose variable and convert it to regular object
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
};

// Add custom methods to the instance of the User model (instance method)
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  
  user.tokens.push({access, token});
  
  return user.save().then(() => {
      return token;
  });
  
  // two 'return'
  // user.save returns a promise. This allows us to attach then/catch calls to do something when the user is save or the save fails. 
  // By returning token, we're enabling whoever calls generateAuthToken to get that value. 
};

UserSchema.methods.removeToken = function(token) {
  var user = this;
  return user.update({
      // 'pull' or remove entire object of the matched token from tokens arrays
      $pull: {
          tokens: {token}
      }
  });
};

// '.statics' create Model method
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  
  try {
    decoded = jwt.verify(token, 'abc123');    
  } catch(e) {
    // return new Promise((resolve, reject) => {
    //     reject();
    // });
    return Promise.reject();
  }
  
  // quote '' is required when we have .xxx for key
  return User.findOne({
     '_id': decoded._id,
     'tokens.token': token,
     'tokens.access': 'auth'
  });
  
};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    
    return User.findOne({email}).then((user) => {
       if(!user) {
           return Promise.reject();
       } 
       
       return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
               if (res) {
                   resolve(user);
               } else {
                   reject();
               }
            });
       });
    });
};

UserSchema.pre('save', function(next) {
   var user = this;
   
   if (user.isModified('password')) {
       bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(user.password, salt, (err, hash) => {
              user.password = hash;
              next();
           });
       });
   } else {
       next();
   }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};