const fs = require('fs');
const path = require('path');
var knex = require('knex')
console.log("================================asfsdfsdfsaf", __dirname);

module.exports = {
  development: {
    client: "pq",
    connection: `postgres://jimmy@localhost:5432/database`,
    migrations: {
        directory: __dirname + "/migrations"
    },
    seeds: {
        diretory: __dirname + "/seeds"
    }
  }
}