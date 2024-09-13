"use strict";

const { hasPassword } = require("../helper/bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Users", [
            {
                id: uuidv4(),
                isActive: true,
                nama: "Admin brik",
                email: "adminbrik@gmail.com",
                group: "admin",
                password: hasPassword("Brik123"),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                isActive: true,
                nama: "User brik",
                email: "userbrik@gmail.com",
                group: "user",
                password: hasPassword("Brik123"),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
