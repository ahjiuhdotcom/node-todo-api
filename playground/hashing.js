// HASH: convert string value to complex string
// SALT: adding specific secret during hashing to produce unique hash result

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

// '123abc' is secret (salt)
var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);

/*
// EXPLANATION OF HASHING AND SALTING

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust');
}


// adding 'somesecret' is called salt the data, 
// which is adding unique secret during hashing
// so that it is no reproducible by simply hashing 
// unless know and add the secret salt
*/

