'use strict';
module.exports = (sequelize, DataTypes) => {
  const Traitement = sequelize.define('Traitement', {
    USERS_idUSERS: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    Content: DataTypes.STRING,
    Attachement: DataTypes.STRING
  }, {});
  Traitement.associate = function(models) {
    // associations can be defined here

    models.Traitement.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Traitement;
};