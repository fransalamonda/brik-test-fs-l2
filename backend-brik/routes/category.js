const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

// Controller
const CategoryController = require("../controllers/category");

// validator
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

const { addCategoryValidator } = require("../validator/categoryValidator");

router.post(
    "/",
    addCategoryValidator,
    validate,
    CategoryController.createCategory
);
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
