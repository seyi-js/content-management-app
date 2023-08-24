'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: Sequelize.INTEGER,
      content: Sequelize.STRING,
      post_id: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.addIndex('comments', ['id', 'content'], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  },
};
