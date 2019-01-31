const bcrypt = require("bcryptjs");

const User = require("../models/user");

User.create({
  username: "Administrator",
  password: "test",
  role: "Administrator"
})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

User.create({
  username: "Client",
  password: "test",
  role: "Client"
})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

User.create({
  username: "Planner",
  password: "test",
  role: "Planner"
})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

User.create({
  username: "Maintainer",
  password: "test",
  role: "Maintainer"
})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
