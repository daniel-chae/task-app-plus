// require mongoose
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    //each of this is equivalent to a field in collection
    description: {
      type: String, //basic validation given by mongoose
      required: true,
      trim: true //basic sanitization given by mongoose
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      //data stored in owner will be an object id
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User" // model name that this field is referring to
    }
  },
  {
    timestamps: true
  }
);

// use mongoose.model method to create a task model
// Model will create collection automatically in plural form "tasks"
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
