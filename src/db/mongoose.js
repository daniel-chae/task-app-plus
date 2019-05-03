// require mongoose
const mongoose = require("mongoose");

//use mongoose.connect method to connect to database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true, // included for every connection
  useCreateIndex: true, //
  useFindAndModify: false //decide whether to use useFindAndModify for model alternation or not
});
