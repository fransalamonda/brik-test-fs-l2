const { body } = require("express-validator");

const addCategoryValidator = [
    body("name")
        .optional()
        .isLength({ min: 2, max: 25 })
        .withMessage("Name is required if provided"),
];

module.exports = { addCategoryValidator };
