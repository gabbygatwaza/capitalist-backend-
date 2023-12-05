'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    // toJSON({return {...this.get(), id=undefined}})
    toJSON() {return { ...this.get(), id: undefined };}    
  }
  User.init({
    uuid:{type:DataTypes.UUID, defaultValue:UUIDV4},
    firstName:{type:DataTypes.STRING, allowNull:false},
    lastName: {type:DataTypes.STRING, allowNull:false},
    email: {type:DataTypes.STRING, allowNull:false, unique:true},
    password: {type:DataTypes.STRING, allowNull:false}
  },{
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};