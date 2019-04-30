// require mongoose
const mongoose = require("mongoose");

// connection URL to mongodb
const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

//use mongoose.connect method to connect to database
mongoose.connect(connectionURL, {
  useNewUrlParser: true, // included for every connection
  useCreateIndex: true, //
  useFindAndModify: false //decide whether to use useFindAndModify for model alternation or not
});
