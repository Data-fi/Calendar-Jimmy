const faker = require('faker');
const fs = require('fs');

const writeMain = fs.createWriteStream("./db/db-jimmy/jimmy-post.csv");
writeMain.write('listing_id,descriptions,city,discount_rate,discount_measure,numBeds,bedType,min_sunday,min_monday,min_tuesday,min_wednesday,min_thursday,min_friday,min_saturday,max_days\n', 'utf8');

var toSeed = 10000000;

function generateMain(writer, encoding, callback) {
  console.log("Generating Data...")
  var seed = toSeed;
  var id = 0;
  function write() {
    var ok = true;
    do {
      if (id % 100000 === 0) {
        console.log("Main: " + Math.floor((id / 10000000) * 100) + '%');
      }
      seed -= 1;
      var minDate = faker.random.number({min:0, max:2});
      var maxDays = faker.random.number({min:7, max:14});
      var listing_id = id++;
      var descriptions =  faker.lorem.words();
      var city = faker.address.city();
      var discount_rate = faker.random.number({min:1, max:75});
      var discount_measure = maxDays;
      var numBeds = faker.random.number({min:1, max:5});
      var bedType = faker.lorem.word();
      var min_sunday = minDate;
      var min_monday = minDate;
      var min_tuesday = minDate;
      var min_wednesday = minDate;
      var min_thursday = minDate;
      var min_friday = minDate;
      var min_saturday = minDate;
      var max_days = maxDays;
      const data = `${listing_id},${descriptions},${city},${discount_rate},${discount_measure},${numBeds},${bedType},${min_sunday},${min_monday},${min_tuesday},${min_wednesday},${min_thursday},${min_friday},${min_saturday},${max_days}\n`;
      if (seed === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
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

generateMain(writeMain, 'utf-8', () => {
  writeMain.end();
  console.log("Finished generating main data")
});

const writeRes = fs.createWriteStream("./db/db-jimmy/jimmy-post2.csv");
writeRes.write('listing_id,reservation_id,startDate,endDate\n', 'utf8');

function addDays(date) {
  var result = new Date(date);
  result.setDate(date.getDate() + faker.random.number({min:1, max:7}));
  result = JSON.stringify(result)
  return result;
}

function generateReservations(writer, encoding, callback) {
  var randomCounter = 0;
  var resCounter = 0;
  var listCounter = 0;
  var seed = toSeed;
  console.log("Generating Reservations...")
  function idCounter(){
    randomCounter--;
    var result = resCounter++
    return result;
  }

  function write() {
    var ok = true;
    do {
      if (randomCounter == 0) {
        randomCounter = faker.random.number({min:1, max:5})
        listCounter++;
        seed -= 1;
      }
      if (listing_id % 100000 === 0) {
        console.log("Main: " + Math.floor((listing_id / 10000000) * 100) + '%');
      }
      var listing_id = listCounter;
      var reservation_id = idCounter();
      var startDate = faker.date.recent();
      var endDate = addDays(startDate)
      startDate = JSON.stringify(startDate);
      const data = `${listing_id},${reservation_id},${startDate},${endDate}\n`;
      if (seed <= 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
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

generateReservations(writeRes, 'utf-8', () => {
  writeRes.end();
  console.log("Finished Generating Reservations")
});

