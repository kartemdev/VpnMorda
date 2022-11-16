const {
  Model, INTEGER,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Account, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init({
    userName: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    adm: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
