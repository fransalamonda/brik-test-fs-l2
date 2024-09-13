const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

// Controller
const ProductController = require("../controllers/product");

// Validator
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let err = {
            name: "Bad request",
            errors: errors.array(),
        };
        next(err);
    }
    next();
};

const { addProductValidator } = require("../validator/productValidator");

router.post(
    "/",
    addProductValidator,
    validate,
    ProductController.createProduct
);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
