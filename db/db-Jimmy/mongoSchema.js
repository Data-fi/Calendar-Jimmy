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