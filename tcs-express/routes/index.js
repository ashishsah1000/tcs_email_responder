var express = require('express');
var router = express.Router();
var Data = require("../models/user");
var mongoose = require("mongoose");


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session)
    if (!req.session.user)
        res.render('login', { title: 'Express' });
    else
        res.render("index", { title: "express", data: req.session.user })
});
//-------------------------------login authentication----------------
router.get('/auth/login', function(req, res, next) {
    if (!req.session.user)
        res.render('login', { title: 'Express' });
    else
        res.render('index', { title: "success", data: req.session.user });
});


router.post("/authenticate", function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    Data.findOne({ email: new RegExp('^' + username + '$', "i") }, function(err, doc) {
        //Do your action here..
        if (err) {

            console.log(err);

        } else {
            req.session.user = doc;
            if (doc)
                res.render("index", { title: "succesfull", data: doc });
            else
                res.render("login", { title: "login" });
            console.log(req.session)
        }
    });

});

router.post("/logout", function(req, res) {
    req.session.destroy(function(err) {
        console.log(err + "a error code");
    });
    res.redirect("/auth/login")

})









// ---------------------------- Create user page------------------------------

router.get('/auth/create', function(req, res, next) {



    Data.find(function(err, docs) {
        if (err) {
            console.log(err);
            res.render("error", { error: err });
        } else {
            console.log(docs);
            res.render('create', { title: 'user', items: docs });
            console.log(mongoose.connection.readyState);
        }
    });


});







router.post('/updateUser', function(req, res, next) {
    // update in the database
    var posted = new Data({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        department: req.body.department
    });

    posted.save(function(err, callback) {
        if (err) {
            console.log(err);
            res.render("error", { error: err });
        } else {
            console.log("saved successfull");
            res.render("index");
        }

    });

    res.redirect("/");

});
module.exports = router;