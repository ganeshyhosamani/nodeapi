'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripKey: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
      from_lat: {
        type: Sequelize.INTEGER
      },
      from_lon: {
        type: Sequelize.INTEGER
      },
      to_lat: {
        type: Sequelize.INTEGER
      },
      to_lon: {
        type: Sequelize.INTEGER
      },
      moneyCollected: {
        type: Sequelize.BOOLEAN
      },
      fare: {
        type: Sequelize.DOUBLE
      },
      state: {
        type: Sequelize.STRING
      },
      passengersRating: {
        type: Sequelize.DOUBLE
      },
      driversRating: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      driverId: {
        type: Sequelize.STRING
      },
      passengerId: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trips');
  }
};