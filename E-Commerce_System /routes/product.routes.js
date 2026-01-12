const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const authMiddleweare = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const Validation = require("../middlewares/validation");

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post(
    "/",
    authMiddleweare,
    roleMiddleware("admin"),
    Validation.validateCreateProduct,
    productController.create
);
router.patch(
    "/:id",
    authMiddleweare,
    roleMiddleware("admin"),
    Validation.validateUpdateProduct,
    productController.update
);
router.delete("/:id", authMiddleweare, roleMiddleware("admin"), productController.remove);

module.exports = router;
