'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      Category.hasMany(models.Product, { foreignKey: "categoryId" });
   }
  }
  Category.init({
    id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                  notEmpty: {
                      msg: "Name is required",
                  },
                  notNull: {
                      msg: "Name is required",
                  },
              },
          },
          description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Category', // Nama model harus konsisten dengan asosiasi
    tableName: 'categories',
  });
  return Category;
};