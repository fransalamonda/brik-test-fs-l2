"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "categories",
            [
                {
                    name: "Kategori 1",
                    description: "Kategori Satu",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Kategori 2",
                    description: "Kategori Dua",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                  
                    name: "Kategori 3",
                    description: "Kategori Tiga",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                  
                    name: "Kategori 4",
                    description: "Kategori Empat ",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                  
                    name: "Kategori 5",
                    description: "Kategori Lima",
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Categories", null, {});
    },
};
