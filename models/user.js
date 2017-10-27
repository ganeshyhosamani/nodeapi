'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    uid: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    dob: DataTypes.DATE,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    disabled: DataTypes.BOOLEAN,
    active_profile_pic: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Profile_pic, { as: 'profile_pic' })
  }

  return User;
};