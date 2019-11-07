var fs = require("fs");
var csv = require("fast-csv");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/calendarcsv');

console.log("Running mongoSeed")
    var mongoSchema = require('./mongoSchema.js');
    var mongoFile = require('./jimmy-data.csv');
    var mongo = [];
         
    csv
     .fromString(mongoFile.data.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
          
         mongo.push(data);
     })
     .on("end", function(){
        mongoSchema.create(mongo, function(err, documents) {
            if (err) throw err;
         });
          
         res.send(mongo.length + ' authors have been successfully uploaded.');
     });