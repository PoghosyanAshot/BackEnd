const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const authMiddleweare = require("../middlewares/auth.middleware");
const Validation = require("../middlewares/validation");
const roleMiddleware = require("../middlewares/role.middleware");

router.get("/", authMiddleweare, orderController.getMine);
router.get("/all", authMiddleweare, roleMiddleware("admin"), orderController.getAll);
router.post("/", authMiddleweare, Validation.validateCreateOrder, orderController.create);

module.exports = router;
