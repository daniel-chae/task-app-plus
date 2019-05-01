// require express
const express = require("express");

// create a router instance
const router = new express.Router();

// require the task model
const Task = require("../models/task");
const auth = require("../middleware/auth");

//C(create)
//Same as app.post but when it is defined in a separate file as a router
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    const savedTask = await task.save();
    res.status(201).send(savedTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

//R(read)
// GET /tasks?completed=true/false
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:asc||createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  const options = {
    limit: !!req.query.limit ? parseInt(req.query.limit) : undefined,
    skip: !!req.query.skip ? parseInt(req.query.skip) : undefined,
    sort
  };

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//U(update)
router.patch("/tasks/:id", auth, async (req, res) => {
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
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => {
      task[update] = req.body[update];
    });

    task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//D(Delete)
router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
