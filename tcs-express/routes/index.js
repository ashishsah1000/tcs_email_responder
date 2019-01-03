var express = require('express');
var router = express.Router();
var Data = require("../models/user");
var ticket = require("../models/ticket");
var know = require("../models/know");
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
                res.redirect("/workspace");
            else
                res.render("login", { title: "login" });
        }
    });

});

router.post("/logout", function(req, res) {
    req.session.destroy(function(err) {
        console.log(err + "a error code");
    });
    res.redirect("/auth/login")

});


router.get("/workspace",function(req, res, next) {
        var ticektData="";
         if (req.session.user){
             ticket.find(function(err, docs) {
                if (err) {
                        console.log(err);
                         res.render("workspace", { user : req.session.user, item : err});
                }
                else{
                    console.log(docs);
                    res.render("workspace", { user : req.session.user, item : docs});
                }
             });
                
             
         }
            else
                res.render("login", { title: "Please login" });
            console.log(req.session)
});









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




// -------------------------------For Replying a mail

router.post('/reply', function(req, res, next) {
    var id = req.body.rid;
    var data={
        reply : req.body.reply,
        department : req.body.department
    }
    console.log(id);
    ticket.update({ _id: id }, { $set: { department: data.department }}, function(err,doc){
        if (err) return res.send(500, { error: err });
    else
    console.log("succesfully saved department");
    });
    ticket.updateMany({ _id: id }, { $push: { reply: data.reply,repliedBy:req.session.user.name }}, function(err,doc){
        if (err) return res.send(500, { error: err });
    console.log("succesfully saved");
    });
    var saved;
    ticket.findOne({_id:id},function(err,docs){
        if(err)
            console.log(err);
        else{
            var ln = docs.reply.length-1;
            var r = docs.reply[ln];
            var t = docs.subject.split(" ");
            saved = {
                subject : docs.subject,
                reply: r,
                department: docs.department,
                tags:t
            }
        }
            
    });
    var d = new know(saved);
     d.save(function(err, callback) {
        if (err) {
            console.log(err);
            res.render("error", { error: err });
        } else {
            console.log("saved successfull in knowledge database");
            res.redirect("/workspace");
        }

    });
});

// tickets for the user and they can see the reply

 router.get('/tik/data', function(req, res, next) {
     var d = {
         show : false
     }
    res.render("tickets", { docs: d });
});


// updating the tickets reply also
router.post("/getTicket",function(req,res){
    var id= req.body.ticket;
    var doc= {};
    
     
    
    ticket.findOne({_id:id},function(err,docs){
        if(err)
            console.log(err);
        else{
            doc =docs;
            doc.show = true;
            res.render("tickets",{docs: doc});
        }
            
    });
    
});


module.exports = router;