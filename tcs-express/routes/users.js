var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var ticket = require("../models/ticket");
var db_url = "mongodb://ashishsah1000:ashish1998@ds141328.mlab.com:41328/tcsdatabase";
var algo = require("../algo/finder");



/* GET users listing. */
router.get('/data', function(req, res, next) {
    res.render("mailer/mail", { docs: "" });
});
router.post("/mail/data", function(req, res) {
    // now insertion of data
    var data = new ticket({
        subject: req.body.subject,
        content: req.body.content
    });
    data.tags= data.subject.split(" ");
    
    data.save(function(err, callback) {
        if (err) {
            console.log(err);
            res.render("error", { error: err });
        } else {
            console.log("saved successfull" + callback._id);
            res.send(callback._id + " <h1> Check your status <a href='/tik/data'>My response</a<</h1>");
            algo.checker(callback);
        }

    });
 // Reply to the ticket that has been checked




});

module.exports = router;