require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("5cc491f130ac0aa825d693f1")
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(count => {
//     console.log(count);
//   })
//   .catch(error => {
//     console.log(error);
//   });

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5cc491f130ac0aa825d693f1")
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });
