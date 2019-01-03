var mongoose = require('mongoose');
var schema = mongoose.Schema;
const objectId = schema.ObjectId;

var newUser = new schema({
    name: String,
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    },
    subject: {
        type: String,
    },
    content: {
        type: String,
    },
    department: {
        type: String,
        default: ""
    },
    tags: {
        type: [String],
        default: []
    },
    repliedBy: {
        type: [String],
        default: ["System"]
    },
    reply: {
        type: [String],
        default: ["In transist will contact you soon (hint : write subject to the point to get help immediatly)"],
        unique: false
    },
    email: {
        type: String,
        default: 'xyz@gmail.com',
        unique: false
    }
})
module.exports = mongoose.model("sData", newUser);