const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
//db.tutorials = require("./tutorial.model.js")(mongoose);
db.Flights = require("./flights.model.js")(mongoose);
db.users = require("./users.model.js")(mongoose);
db.reservations = require("./reservations.model.js")(mongoose);
module.exports = db;
