const fs = require('fs');
const csvWriter = require('csv-write-stream')
var writer = csvWriter();   
var faker = require('faker');
var counter = 0;
var resCounter = 1;

const dataGen = () => {
    writer.pipe(fs.createWriteStream('jimmy-post.csv'));
    for (var i=0; i < 1000; i++) {
        var minDate = faker.random.number({min:1, max:100});
        var startDate = faker.date.recent();
        var endDate = faker.date.recent();
        writer.write({
            listing_id: counter++,
            description: faker.lorem.paragraph(),
            city: faker.address.city(),
            discount_rate: faker.random.number({min:1, max:100}),
            discount_measure: Number,
                numBeds: faker.random.number({min:1, max:5}),
                bedType: faker.lorem.words(),
                sunday: minDate,
                monday: minDate,
                tuesday: minDate,
                wednesday: minDate,
                thursday: minDate,
                friday: minDate,
                saturday: minDate,
                max_days: faker.random.number({min:7, max:14}),
            reservations: [{
                reservation_id: resCounter++,
                start: startDate,
                end: endDate,
            }],
          })
    }
    writer.end();
    console.log('done');
}

dataGen();