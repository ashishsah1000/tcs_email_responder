var express = require('express');
var mongoose = require("mongoose");
var ticket = require("../models/ticket");

var mechanical = ["broken","screw","crack","tightness"];

module.exports={
    checker :function(docs){
        // var i,mp=0,ep=0;var dep = "";
        console.log("I was executed" + docs);
        // var subject = docs.subject.split(" ");
        // for(i=0;i<mechanical.length;i++){
        //     for(var j=0;j<subject.length;j++){
        //         if(subject[j]==mechanical[i]){
        //             mp++;
        //         }
        //     }
        // }
        // // for electrical
        // for(i=0;i<mechanical.length;i++){
        //     for(var j=0;j<subject.length;j++){
        //         if(subject[j]==mechanical[i]){
        //             ep++;
        //         }
        //     }
        // }
        
        
        // //last
        // if(mp>ep)
        //     dep = "mechanical";
        // else
        //     dep = "electrical";
    }
}