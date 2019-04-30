//require express and create express app
const express = require("express");
const app = express();

//parse incoming json to object. Thus, json.Parse() is not reuqired.
app.use(express.json()); //automatically parse incoming json to object.

//require mongoose.js file that builds connection to mongodb through mongoose
require("./db/mongoose");

//require userRouter and use it
const userRouter = require("./routers/user");
app.use(userRouter);

//require userRouter and use it
const taskRouter = require("./routers/task");
app.use(taskRouter);

//define port for heroku or dev environment and listen to it
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const jwt = require("jsonwebtoken");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
//     expiresIn: "0 seconds"
//   });
//   console.log(token);

//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);
// };

// myFunction();

//How to use bcrypt
// require bcryptjs
// const bcrypt = require("bcryptjs");

// const myFunction = async () => {

//   const password = "Red12345!";

//   hash the password
//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log(password);
//   console.log(hashedPassword);

//   check the matching between string and hassed password
//   const isMatch = await bcrypt.compare("Red12345", hashedPassword);
//   console.log(isMatch);
// };

// myFunction();
