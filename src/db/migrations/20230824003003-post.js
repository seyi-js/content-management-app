'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: Sequelize.STRING,
      content: Sequelize.STRING,
      user_id: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.addIndex('posts', ['id', 'title', 'content']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  },
};
