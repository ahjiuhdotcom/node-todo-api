var mongoose = require('mongoose');

// Tell mongoose whenever using promise, use global.Promise
mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/TodoApp');
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
};