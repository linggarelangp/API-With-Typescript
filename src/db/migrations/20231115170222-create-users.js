/* eslint-disable @typescript-eslint/space-before-function-paren */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roleId: {
        allowNull: false,
        unique: true,
        type: Sequelize.BIGINT
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      accessToken: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
}
