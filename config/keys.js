if(process.env.NODE_ENV === 'production') {
    // Load in production keys
    module.exports = require('./prod');
} else {
    // Load in & export development keys
    module.exports = require('./dev');
}