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

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   // const task = await Task.findById("5cc95ca83153f0b817c0eaeb");
//   // await task.populate('owner').execPopulate() //populate the mentioned field with full data
//   // console.log(task.owner);

//   const user = await User.findById("5cc95bbc0ea7d0b517f477ed");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
