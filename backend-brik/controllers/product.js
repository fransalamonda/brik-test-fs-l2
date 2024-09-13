const { Product, Category } = require("../models/index");
const { Op } = require("sequelize");

class ProductsController {
    static async createProduct(req, res, next) {
        try {
            const {
                name,
                sku,
                description,
                weight,
                width,
                length,
                height,
                image,
                price,
                categoryId,
            } = req.body;

            const category = await Category.findOne({
                where: { id: categoryId, isActive: true },
            });
            if (!category) {
                throw {
                    name: "Category not found",
                };
            }

            const newProduct = await Product.create({
                name,
                sku,
                description,
                weight,
                width,
                length,
                height,
                image,
                price,
                categoryId,
            });

            res.status(201).json({
                status: true,
                message: "Product created successfully",
                data: newProduct,
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    static async getAllProducts(req, res, next) {
        try {
            const { page = 1, limit = 10, categoryId, name, sku } = req.query;
            const offset = (page - 1) * limit;

            const searchConditions = {
                isActive: true,
            };

            if (categoryId) {
                searchConditions.categoryId = categoryId;
            }

            if (name) {
                searchConditions.name = {
                    [Op.like]: `%${name}%`,
                };
            }

            if (sku) {
                searchConditions.sku = {
                    [Op.like]: `%${sku}%`,
                };
            }

            const { count, rows: products } = await Product.findAndCountAll({
                where: searchConditions,
                include: {
                    model: Category,
                    attributes: ["id", "name", "description"],
                    where: { isActive: true },
                },
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [["createdAt", "DESC"]],
            });

            const productsSchema = products.map((product) => ({
                id: product.id,
                categoryId: product.categoryId,
                categoryName: product.Category.name,
                sku: product.sku,
                name: product.name,
                description: product.description,
                weight: product.weight,
                width: product.width,
                length: product.length,
                height: product.height,
                image: product.image,
                price: product.price,
            }));

            res.status(200).json({
                status: true,
                message: "Success get data",
                data: {
                    products: productsSchema,
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    page: parseInt(page),
                },
            });
        } catch (err) {
            next(err);
        }
    }

    static async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id, isActive: true },
                include: {
                    model: Category,
                    attributes: ["id", "name", "description"],
                    where: { isActive: true },
                },
            });

            if (!product) {
                throw {
                    name: "Product not found",
                };
            }

            res.status(200).json({
                status: true,
                message: "Product retrieved successfully",
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const {
                name,
                sku,
                description,
                weight,
                width,
                length,
                height,
                image,
                price,
                CategoryId,
            } = req.body;

            const product = await Product.findOne({
                where: { id, isActive: true },
            });

            if (!product) {
                throw {
                    name: "Product not found",
                };
            }

            if (CategoryId && CategoryId !== product.CategoryId) {
                const category = await Category.findOne({
                    where: { id: CategoryId, isActive: true },
                });
                if (!category) {
                    throw {
                        name: "Category not found",
                    };
                }
            }

            product.name = name || product.name;
            product.sku = sku || product.sku;
            product.description = description || product.description;
            product.weight = weight || product.weight;
            product.width = width || product.width;
            product.length = length || product.length;
            product.height = height || product.height;
            product.image = image || product.image;
            product.price = price || product.price;
            product.CategoryId = CategoryId || product.CategoryId;
            await product.save();

            res.status(200).json({
                status: true,
                message: "Product updated successfully",
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id, isActive: true },
            });

            if (!product) {
                throw {
                    name: "Product not found",
                };
            }

            product.isActive = false;
            await product.save();

            res.status(200).json({
                status: true,
                message: "Product deleted successfully",
                data: null,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ProductsController;
