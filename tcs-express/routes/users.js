var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var ticket = require("../models/ticket");
var db_url = "mongodb://ashishsah1000:ashish1998@ds141328.mlab.com:41328/tcsdatabase";



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
    data.save(function(err, callback) {
        if (err) {
            console.log(err);
            res.render("error", { error: err });
        } else {
            console.log("saved successfull" + callback._id);
            //seving a ajax request
            $j.ajax({
                url: "http://localhost:4000/",
                type: 'POST',
                dataType: callback,
                success: function() {
                    alert('data sent');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + jqXHR.status);
                    } // <-- remove the trailing comma you had here
            });
            responder(callback);
            res.render("tickets", { docs: callback });
        }

    });



});

module.exports = router;