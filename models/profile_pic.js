'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile_pic = sequelize.define('Profile_pic', { 
    path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
       
        // associations can be defined here
      }
    }
  });
  Profile_pic.associate = function (models) {
  }
  return Profile_pic;
};