const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class NewPlayer extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

NewPlayer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,

    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
      length: [8],
      }
    },
    
    },
    playerScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    },
    {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'NewPlayer',
  }
);

module.exports = NewPlayer;