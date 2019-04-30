// require mongoose
const mongoose = require("mongoose");

// use mongoose.model method to create a task model
// Model will create collection automatically in plural form "tasks"
const Task = mongoose.model("Task", {
  //each of this is equivalent to a field in collection
  description: {
    type: String, //basic validation given by mongoose
    required: true, 
    trim: true //basic sanitization given by mongoose
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = Task;
