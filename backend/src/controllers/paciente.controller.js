const { Paciente } = require('../models');

const getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();

    return res.status(200).json({
      mensaje: 'Pacientes obtenidos correctamente',
      pacientes
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener pacientes',
      error: error.message
    });
  }
};

const getPacienteById = async (req, res) => {
  
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      return res.status(404).json({
        mensaje: 'Paciente no encontrado'
      });
    }

    return res.status(200).json({
      mensaje: 'Paciente obtenido correctamente',
      paciente
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener paciente',
      error: error.message
    });
  }
};

const createPaciente = async (req, res) => {
  const { nombre, telefono, fecha_nacimiento, genero } = req.body;

  try {
    // 1. Validar campos obligatorios
    if (!nombre || !telefono || !fecha_nacimiento || !genero) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    // 2. NUEVA VALIDACIÓN: Evitar duplicados por teléfono
    // Buscamos si ya existe alguien con ese mismo número
    const pacienteExistente = await Paciente.findOne({ where: { telefono } });

    if (pacienteExistente) {
      return res.status(409).json({
        mensaje: 'Ya existe un paciente registrado con este número de teléfono',
        // Opcional: podrías devolver el nombre del paciente encontrado
        detalle: `El número pertenece a: ${pacienteExistente.nombre}`
      });
    }

    // 3. Crear el paciente si no hay duplicados
    const nuevoPaciente = await Paciente.create({
      nombre,
      telefono,
      fecha_nacimiento,
      genero
    });

    return res.status(201).json({
      mensaje: 'Paciente creado correctamente',
      paciente: nuevoPaciente
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al crear paciente',
      error: error.message
    });
  }
};

const updatePaciente = async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, fecha_nacimiento, genero } = req.body;

  try {
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      return res.status(404).json({
        mensaje: 'Paciente no encontrado'
      });
    }

    await paciente.update({
      nombre,
      telefono,
      fecha_nacimiento,
      genero
    });

    return res.status(200).json({
      mensaje: 'Paciente actualizado correctamente',
      paciente
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar paciente',
      error: error.message
    });
  }
};

const deletePaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      return res.status(404).json({
        mensaje: 'Paciente no encontrado'
      });
    }

    await paciente.destroy();

    return res.status(200).json({
      mensaje: 'Paciente eliminado correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar paciente',
      error: error.message
    });
  }
};

module.exports = {
  getPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};