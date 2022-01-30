const config = require("./config.json");
const mongoose = require("mongoose");
const { onError } = require("./Events/db/on/error");
const { onceOpen } = require("./Events/db/once/open");
mongoose.connect(config.mongo.testURI);
const db = mongoose.connection;
db.on("error", onError);
db.once('open', onceOpen);

module.exports = { 
    db, 
    mongoose
};