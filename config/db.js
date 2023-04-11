 const mongoose = require('mongoose')
// require('dotenv').config()
// const {MONGO_URL} = process.env.mongo

// const connection = mongoose.connect(MONGO_URL)

// module.exports = {connection}

const connection = mongoose.connect(`mongodb+srv://goyalaryan51:123456789Ag@jscop.q8vmqu7.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
});
console.log(`Connected to mongo!!`);

module.exports = {
    connection
}