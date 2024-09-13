const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const categoryRoutes = require("./category");
const productRoutes = require("./product");

// Controller
const UserController = require("../controllers/user");

// midleware
const authentication = require("../midleware/authentication");

// validator
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: "Bad request",
            errors: errors.array(),
        });
    }
    next();
};

const {
    userLoginValidator,
    userRegisterValidator,
} = require("../validator/userValidator");

router.get('/test-db', async (req, res) => {
    try {
        await db.sequelize.authenticate();
        res.status(200).json({
            status: true,
            message: 'Database connection is successful',
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json({
            status: false,
            message: 'Unable to connect to the database',
            error: error.message,
        });
    }
});

// router auth
router.post("/login", userLoginValidator, validate, UserController.loginUser);
router.post(
    "/register",
    userRegisterValidator,
    validate,
    UserController.registerUser
);


router.use("/categories", authentication, categoryRoutes);
router.use("/products", authentication, productRoutes);

module.exports = router;
