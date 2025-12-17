class User {
    constructor(name, age, role) {
        this.name = name;
        this.age = age;
        this.role = role;
    }
}

function validateUser(user) {
    return user ? true : false;
}

const ROLES = ["student", "admin"];

module.exports = {User, validateUser, ROLES};
