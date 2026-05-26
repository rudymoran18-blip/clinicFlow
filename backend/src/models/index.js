const Paciente = require('./paciente.model');
const Cita = require('./cita.model');

//Tiene muchos

Paciente.hasMany(Cita, {
  foreignKey: 'paciente_id',
  sourceKey: 'id'
});

//Pertenece a 

Cita.belongsTo(Paciente, {
  foreignKey: 'paciente_id',
  targetKey: 'id'
});

module.exports = {
  Paciente,
  Cita
};