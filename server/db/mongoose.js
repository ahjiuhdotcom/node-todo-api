var mongoose = require('mongoose');

// Tell mongoose whenever using promise, use global.Promise
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/TodoApp');

module.exports = {
    mongoose
};