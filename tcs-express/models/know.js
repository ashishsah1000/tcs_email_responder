var mongoose = require('mongoose');
var schema = mongoose.Schema;
const objectId = schema.ObjectId;

var newUser = new schema({
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    },
    subject: {
        type: String,
    },
    reply: {
        type: String,
    },
    department: {
        type: String,
        default: ""
    },
    tags: {
        type: [String],
        default: []
    }
})
module.exports = mongoose.model("kData", newUser);