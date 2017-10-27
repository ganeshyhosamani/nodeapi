'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      document_verification: {
        type: Sequelize.STRING
      },
      dl_number: {
        type: Sequelize.STRING
      },
      online: {
        type: Sequelize.BOOLEAN
      },
      dl_back_URL: {
        type: Sequelize.STRING
      },
      dl_front_URL: {
        type: Sequelize.STRING
      },
      document_url: {
        type: Sequelize.STRING
      },
      driver_proof_type: {
        type: Sequelize.STRING
      },
      insurance_url: {
        type: Sequelize.STRING
      },
      model_year: {
        type: Sequelize.STRING
      },
      vehical_model: {
        type: Sequelize.STRING
      },
      vehical_number: {
        type: Sequelize.STRING
      },
      email_verification_code: {
        type: Sequelize.STRING
      },
      email_verifyed: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Drivers');
  }
};