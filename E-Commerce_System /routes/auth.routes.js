const express = require("express");
const router = express.Router();

const validators = require("../middlewares/validation");
const authController = require("../controllers/auth.controller");

router.use(validators.validateEmailAndPassword);
router.post("/register", authController.register);
router.post("/login", authController.login);;

module.exports = router;