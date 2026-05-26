const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cita = sequelize.define('Cita', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  paciente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmada', 'atendida', 'cancelada'),
    allowNull: false,
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'citas',
  timestamps: false,
  paranoid: true
});

module.exports = Cita;