var mongoose = require('mongoose');
var schema = mongoose.Schema;
const objectId = schema.ObjectId;

var newUser = new schema({
    name: String,
    password: String,
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    },
    email: {
        type: String,
        unique: true
    },
    department: String
})
module.exports = mongoose.model("Data", newUser);