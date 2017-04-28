var mongoose = require('mongoose');

// Tell mongoose whenever using promise, use global.Promise
mongoose.Promise = global.Promise;

const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost/TodoApp';

mongoose.connect(mongodbURI, () => {
    console.log(`MongoDB started up at ${mongodbURI}`);
});

module.exports = {
    mongoose
};