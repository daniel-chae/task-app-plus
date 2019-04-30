require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("5cc48f25505e3aa0d6f7f5a4", {
//   age: 1
// })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then(count => {
//     console.log(count);
//   })
//   .catch(error => {
//     console.log(error);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5cc48f25505e3aa0d6f7f5a4", 2)
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });
