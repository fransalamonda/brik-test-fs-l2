const { body } = require("express-validator");

const userRegisterValidator = [
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email is required"),
    body("password")
        .isLength({ min: 5, max: 25 })
        .withMessage("Password must be at least 6 characters long")
        .notEmpty()
        .withMessage("Password is required"),
    body("name")
        .optional()
        .isLength({ min: 2, max: 25 })
        .withMessage("Name is required if provided"),
];

const userLoginValidator = [
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .notEmpty()
        .withMessage("Email is required"),
    body("password")
        .isLength({ min: 5, max: 25 })
        .withMessage("Password must be at least 6 characters long")
        .notEmpty()
        .withMessage("Password is required"),
];

module.exports = { userRegisterValidator, userLoginValidator };
