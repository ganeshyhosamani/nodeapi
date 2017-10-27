'use strict';
module.exports = (sequelize, DataTypes) => {
  var Driver = sequelize.define('Driver', {
    document_verification: DataTypes.STRING,
    dl_number: DataTypes.STRING,
    online: DataTypes.BOOLEAN,
    dl_back_URL: DataTypes.STRING,
    dl_front_URL: DataTypes.STRING,
    document_url: DataTypes.STRING,
    driver_proof_type: DataTypes.STRING,
    insurance_url: DataTypes.STRING,
    model_year: DataTypes.STRING,
    vehical_model: DataTypes.STRING,
    vehical_number: DataTypes.STRING,
    email_verifyed: DataTypes.BOOLEAN,
    email_verification_code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Driver.associate = function (models) {
    Driver.belongsTo(models.User);
  }

  return Driver;
};