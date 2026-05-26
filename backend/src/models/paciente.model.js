const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'pacientes',
  timestamps: false,
  paranoid: true
});

module.exports = Paciente;