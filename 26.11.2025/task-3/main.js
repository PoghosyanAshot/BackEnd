const {User, validateUser, ROLES} = require("./userService");

const user = new User("James", 20, ROLES[0]);

console.log(validateUser(user));
console.log(ROLES);
console.log(user);
