// require express
const express = require("express");

// create a router instance
const router = new express.Router();

// require the task model
const Task = require("../models/task");

//C(create)
//Same as app.post but when it is defined in a separate file as a router
router.post("/tasks", async (req, res) => {
  console.log(req.body);
  const task = new Task(req.body); //use task model required

  try {
    const savedTask = await task.save();
    res.status(201).send(savedTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

//R(read)
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//U(update)
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach(update => {
      task[update] = req.body[update];
    });

    task.save();

    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//D(Delete)
router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
