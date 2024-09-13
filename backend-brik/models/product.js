'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product  extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product .belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Product.init(
    {
        id: {
            //type: DataTypes.UUID,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            //defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "SKU must be unique",
            },
            validate: {
                notEmpty: {
                    msg: "SKU is required",
                },
                notNull: {
                    msg: "SKU is required",
                },
            },
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
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "weight is required",
                },
                notNull: {
                    msg: "weight is required",
                },
            },
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "width is required",
                },
                notNull: {
                    msg: "width is required",
                },
            },
        },
        length: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "length is required",
                },
                notNull: {
                    msg: "length is required",
                },
            },
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "height is required",
                },
                notNull: {
                    msg: "height is required",
                },
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Price is required",
                },
                notNull: {
                    msg: "Price is required",
                },
            },
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
      },
    },
    {
        sequelize,
        modelName: "Product",
        tableName: 'products',
    }
);
  return Product ;
};