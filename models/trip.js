'use strict';
module.exports = (sequelize, DataTypes) => {
  var Trip = sequelize.define('Trip', {
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    from_lat: DataTypes.INTEGER,
    from_lon: DataTypes.INTEGER,
    to_lat: DataTypes.INTEGER,
    to_lon: DataTypes.INTEGER,
    moneyCollected: DataTypes.BOOLEAN,
    fare: DataTypes.DOUBLE,
    state: DataTypes.STRING,
    passengersRating: DataTypes.DOUBLE,
    driversRating: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Trip.associate = function (models) {
    Trip.belongsTo(models.User, { as: 'driver'});
    Trip.belongsTo(models.User, { as: 'passenger' });
  }

  return Trip;
};