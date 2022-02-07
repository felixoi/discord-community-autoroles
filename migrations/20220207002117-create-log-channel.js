'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogChannels', {
      guild: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      channel: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LogChannels');
  }
};
