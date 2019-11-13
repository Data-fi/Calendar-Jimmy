var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var calendarSchema = new Schema({
    listing_id: Number,
    description: String,
    city: String,
    discount_rate: Number,
    discount_measure: Number,
    bedrooms: {
        numBeds: Number,
        bedType: String,
    },
    minMaxDates: {
        sunday: Number,
        monday: Number,
        tuesday: Number,
        wednesday: Number,
        thursday: Number,
        friday: Number,
        saturday: Number,
        max_days: Number,
    },
    reservations: [{
        reservation_id: Number,
        start: Date,
        end: Date,
    }],
  });

  module.exports = mongoose.model('calendar', calendarSchema);

//Copy of inserts for deliverable
// db.calendar.find({}, {"listing_id":1}).sort({"listing_id":-1}).limit(1)
// db.calendar.insert({
//     listing_id: 10000001,
//     description: "Cat",
//     city: "Catville",
//     discount_rate: 50,
//     discount_measure: 7,
//     bedrooms: {
//         numBeds: 1,
//         bedType: "Paper Bag",
//     },
//     minMaxDates: {
//         sunday: 2,
//         monday: 2,
//         tuesday: 2,
//         wednesday: 2,
//         thursday: 2,
//         friday: 2,
//         saturday: 2,
//         max_days: 2,
//     },
//     reservations: [{
//         reservation_id: 1,
//         start: "2019-11-12T05:40:40.221Z",
//         end: "2019-11-16T05:40:40.221Z",
//     }],
//   })