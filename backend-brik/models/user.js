"use strict";
const { Model } = require("sequelize");

const { hasPassword } = require("../helper/bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            nama: {
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Email must be unique",
                },
                validate: {
                    notEmpty: {
                        msg: "Email is required",
                    },
                    notNull: {
                        msg: "Email is required",
                    },
                    isEmail: {
                        msg: "Invalid email format",
                    },
                },
            },
            group: {
                type: DataTypes.ENUM("admin", "user"),
                allowNull: false,
                defaultValue: "user",
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Password is required",
                    },
                    notNull: {
                        msg: "Password is required",
                    },
                    len: {
                        args: [5, 100],
                        msg: "Password length min 5",
                    },
                },
            },
        },
        {
            hooks: {
                beforeCreate(inst, opt) {
                    inst.password = hasPassword(inst.password);
                },
            },
            sequelize,
            modelName: "User",
        }
    );

    return User;
};
