const usersRepo = require("../repositories/users.repo");
const { NotFoundError } = require("../errors");

const getAllUsers = async () => {
    return usersRepo.findAll();
};

module.exports = { getAllUsers };
