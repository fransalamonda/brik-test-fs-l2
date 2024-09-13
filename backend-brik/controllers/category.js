const { Category } = require("../models/index");

class CategoriesController {
    static async createCategory(req, res, next) {
        try {
            const { name, description } = req.body;

            const newCategory = await Category.create({ name, description });

            res.status(201).json({
                status: true,
                message: "Category created successfully",
                data: newCategory,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll({
                where: { isActive: true },
                attributes: ["id", "name", "description"],
            });

            res.status(200).json({
                status: true,
                message: "Categories retrieved successfully",
                data: categories,
            });
        } catch (err) {
            console.error("Error retrieving categories:", err); // Tambahkan log
            next(err);
        }
    }

    static async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findOne({
                where: { id, isActive: true },
            });

            if (!category) {
                throw {
                    name: "Category not found",
                };
            }

            res.status(200).json({
                status: true,
                message: "Category retrieved successfully",
                data: category,
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const category = await Category.findOne({
                where: { id, isActive: true },
            });

            if (!category) {
                throw {
                    name: "Category not found",
                };
            }

            category.name = name || category.name;
            category.description = description || category.description;
            await category.save();

            res.status(200).json({
                status: true,
                message: "Category updated successfully",
                data: category,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findOne({
                where: { id, isActive: true },
            });

            if (!category) {
                throw {
                    name: "Category not found",
                };
            }

            category.isActive = false;
            await category.save();

            res.status(200).json({
                status: true,
                message: "Category deleted successfully",
                data: null,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CategoriesController;
