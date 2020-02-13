'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    UserName: DataTypes.STRING,
    PassWord: DataTypes.STRING,
    PassWordOk: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Traitement);
  };
  return User;
};