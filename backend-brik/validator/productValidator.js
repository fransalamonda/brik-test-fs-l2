const { body } = require("express-validator");

const addProductValidator = [
    body("name")
        .notEmpty()
        .withMessage("Product name is required")
        .isString()
        .withMessage("Product name must be a string")
        .isLength({ max: 255 })
        .withMessage("Product name must be less than 255 characters"),

    body("sku")
        .notEmpty()
        .withMessage("SKU is required")
        .isString()
        .withMessage("SKU must be a string")
        .isLength({ max: 50 })
        .withMessage("SKU must be less than 50 characters"),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string")
        .isLength({ max: 500 })
        .withMessage("Description must be less than 500 characters"),

    body("weight")
        .notEmpty()
        .withMessage("Weight is required")
        .isNumeric()
        .withMessage("Weight must be a number")
        .isFloat({ min: 0 })
        .withMessage("Weight must be a positive number"),

    body("width")
        .notEmpty()
        .withMessage("Width is required")
        .isNumeric()
        .withMessage("Width must be a number")
        .isFloat({ min: 0 })
        .withMessage("Width must be a positive number"),

    body("length")
        .notEmpty()
        .withMessage("Length is required")
        .isNumeric()
        .withMessage("Length must be a number")
        .isFloat({ min: 0 })
        .withMessage("Length must be a positive number"),

    body("height")
        .notEmpty()
        .withMessage("Height is required")
        .isNumeric()
        .withMessage("Height must be a number")
        .isFloat({ min: 0 })
        .withMessage("Height must be a positive number"),

    body("image")
        .notEmpty()
        .withMessage("Image URL is required")
        .isString()
        .withMessage("Image URL must be a string")
        .isURL({ require_protocol: true, require_host: false })
        .withMessage("Image must be a valid URL"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isNumeric()
        .withMessage("Price must be a number")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("categoryId")
        .notEmpty()
        .withMessage("Category ID is required")
        // .isUUID()
        .isInt()
        .withMessage("Category ID must be a valid UUID"),
];

module.exports = { addProductValidator };
