console.log("writing csv")
const fs = require('fs');
var faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './db/db-jimmy/jimmy-data.csv',
    header: [
    {id: 'listing_id', title: 'Listing_id'},
    {id: 'description', title: 'Description'},
    {id: 'city', title: 'City'},
    {id: 'discount_rate', title: 'Discount_rate'},
    {id: 'discount_measure', title: 'Discount_measure'},
    {id: 'bedrooms', title: 'Bedrooms'},
    {id: 'minMaxDates', title: 'MinMaxDates'}, 
    {id: 'reservations', title: 'Reservations'}
]
});

var data = [];
var generate = () => {
    var fakerdata = [];
    var counter = 0;
    var resCounter = 1;    
    for (var i=0; i < 1; i++) {
        var minDate = faker.random.number({min:1, max:100});
        var startDate = faker.date.recent();
        var endDate = faker.date.recent();
        var numBeds = faker.random.number({min:1, max:5});
        var bedType = faker.lorem.word();
        var maxDays = faker.random.number({min:7, max:14});
        fakerdata.push({
            listing_id: counter++,
            description: faker.lorem.word(),
            city: faker.address.city(),
            discount_rate: faker.random.number({min:1, max:100}),
            discount_measure: faker.random.number({min:1, max:100}),
            bedrooms: JSON.stringify({
                numBeds: numBeds,
                bedType: bedType,
            }),
            minMaxDates: JSON.stringify({
                sunday: minDate,
                monday: minDate,
                tuesday: minDate,
                wednesday: minDate,
                thursday: minDate,
                friday: minDate,
                saturday: minDate,
                max_days: maxDays,
            }),
            reservations: [JSON.stringify({
                reservation_id: resCounter++,
                start: startDate,
                end: endDate,
            })],
          })
    }
    return fakerdata;
}

data = generate();
console.log(data);

csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));