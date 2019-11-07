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
    var resCounter = 1;    
    for (var i=0; i < 1; i++) {
        var minDate = faker.random.number({min:1, max:2});
        var startDate = faker.date.recent();
        var endDate = faker.date.recent();
        var numBeds = faker.random.number({min:1, max:5});
        var bedType = faker.lorem.word();
        var maxDays = faker.random.number({min:7, max:14});
        fakerdata.push({
            listing_id: i,
            description: faker.lorem.word(),
            city: faker.address.city(),
            discount_rate: faker.random.number({min:1, max:100}),
            discount_measure: faker.random.number({min:1, max:100}),
            bedrooms: `{numBeds: ${numBeds}, bedType: ${bedType}}`,
            minMaxDates: `{sunday: ${minDate} monday: ${minDate} tuesday: ${minDate} wednesday: ${minDate} thursday: ${minDate} friday: ${minDate} saturday: ${minDate} max_days: ${maxDays}}`,
            reservations: `[{reservation_id: ${resCounter++} start: ${startDate} end: ${endDate} }]`,
          })
    }
    return fakerdata;
}

data = generate();
console.log()
//TODO: Find a way to remove extra ", workaround just find and replace them from CSV before using
// for (var each in data){
//         // if (typeof data[each][every] === 'string') {
//             console.log(data[each])
//             // {data[each][every].replace('\"', '')}
//         // }
// }

csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));