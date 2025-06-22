'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicle.belongsTo(models.VehicleType, {
        foreignKey: 'vehicle_type_id'
      });
      Vehicle.hasMany(models.Booking, {
        foreignKey: 'vehicle_id'
      });
    }
  }
  Vehicle.init({
    vehiclesid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    vehicle_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicle',
    tableName: 'Vehicles',
    timestamps: false
  });
  return Vehicle;
};