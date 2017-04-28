// if in heroku, heroku automatic set it to 'production'
// if in test, we set it in package.json before run the test script
// else, we run it as development
// in package.json script: 
// export NODE_ENV=test is for mac or linux
// SET \"NODE_ENV=test\" is for window
const env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if (env === 'development') {
    process.env.PORT = process.env.PORT || 3000;
    process.env.MONGODB_URI = 'mongodb://localhost/TodoApp';
} else if (env === 'test') {
    process.env.PORT = process.env.PORT || 3000;
    process.env.MONGODB_URI = 'mongodb://localhost/TodoAppTest';
}