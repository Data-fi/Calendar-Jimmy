// file system module to perform file operations
const fs = require('fs');
var faker = require('faker');

// json data
var jsonData = [];

var generate = () => {
    var fakerdata = [];
    var counter = 0;
    var resCounter = 1;    
    for (var i=0; i < 500000; i++) {
        if (i % 10000 == 0){console.log("Progress: ", i/500000*100)}
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
            bedrooms: {
                numBeds: numBeds,
                bedType: bedType,
            },
            minMaxDates: {
                sunday: minDate,
                monday: minDate,
                tuesday: minDate,
                wednesday: minDate,
                thursday: minDate,
                friday: minDate,
                saturday: minDate,
                max_days: maxDays,
            },
            reservations: [{
                reservation_id: resCounter++,
                start: startDate,
                end: endDate,
            }],
          })
    }
    return fakerdata;
}

var jsonData = generate();
// console.log(jsonData)

 
// stringify JSON Object
var jsonContent = JSON.stringify(jsonData);
// console.log(jsonContent);

// // parse json
// var jsonObj = JSON.parse(jsonData);
// console.log(jsonObj);

fs.writeFile("./db/db-jimmy/jimmy-mongo.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});