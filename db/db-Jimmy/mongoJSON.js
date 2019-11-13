const faker = require('faker');
const fs = require('fs');

const writeUsers = fs.createWriteStream('./db/db-jimmy/jimmy-mongo.json');

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

var generateReservations = () => {
    var reservationsArray =[]
    var resCounter=1
    for (var i = 0; i < faker.random.number({min:1, max:7}); i++){
        var startDate = faker.date.recent();
        var endDate = addDays(startDate, faker.random.number({min:1, max:7}))
        reservationsArray.push({
            reservation_id: resCounter++,
            start: startDate,
            end: endDate,
      })
    }
    return reservationsArray;
  };

function generate(writer, encoding, callback) {
  let seed = 10000000;
  let id = 0;
  //setup begining [
  writer.write("[", encoding);

    function write() {
      let ok = true;
      do {
        seed -= 1;
        id += 1;
            var fakerdata = "";
            if (id % 100000 === 0) {
                console.log(Math.floor((id / 10000000) * 100) + '%');
              }
            var minDate = faker.random.number({min:0, max:2});
            var numBeds = faker.random.number({min:1, max:5});
            var bedType = faker.lorem.word();
            var maxDays = faker.random.number({min:7, max:14});
            fakerdata ={
                listing_id: id,
                description: faker.lorem.words(),
                city: faker.address.city(),
                discount_rate: faker.random.number({min:1, max:75}),
                discount_measure: maxDays,
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
                reservations: generateReservations()
              }
        var data = JSON.stringify(fakerdata);
        if (seed === 0) {
          data += "]";
          writer.write(data, encoding, callback);
        } else {
  // see if we should continue, or wait
  // don't pass the callback, because we're not done yet.
    data += ",";
    ok = writer.write(data, encoding);
        }
      } while (seed > 0 && ok);
      if (seed > 0) {
  // had to stop early!
  // write some more once it drains
        writer.once('drain', write);
      }
    }
  write()
  }

generate(writeUsers, 'utf-8', () => {
    writeUsers.end();
  });