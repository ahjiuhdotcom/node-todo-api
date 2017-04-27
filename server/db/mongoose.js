var mongoose = require('mongoose');

// Tell mongoose whenever using promise, use global.Promise
mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/TodoApp');
mongoose.connect('mongodb://heroku_mvpfcp81:n3j21f2srv8ssmn1ksflval9p@ds123351.mlab.com:23351/heroku_mvpfcp81' || 'mongodb://localhost/TodoApp');

module.exports = {
    mongoose
};