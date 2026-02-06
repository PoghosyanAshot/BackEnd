const formatter = require("../utils/responseFormater");
const asyncHandler = require("../utils/asyncHandler");
const usersService = require("../services/users.service");

const getUsers = asyncHandler(async (req, res) => {
    const users = await usersService.getAllUsers();
    return formatter.success(res, users);
});

module.exports = { getUsers };
