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
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
