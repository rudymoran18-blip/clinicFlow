const { Cita, Paciente } = require('../models');

const getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: {
        model: Paciente,
        attributes: ['id', 'nombre', 'telefono']
      }
    });

    return res.status(200).json({
      mensaje: 'Citas obtenidas correctamente',
      citas
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener citas',
      error: error.message
    });
  }
};


const getCitaById = async (req, res) => {
  const { id } = req.params;

  try {
    const cita = await Cita.findByPk(id, {
      include: {
        model: Paciente,
        attributes: ['id', 'nombre', 'telefono']
      }
    });

    if (!cita) {
      return res.status(404).json({
        mensaje: 'Cita no encontrada'
      });
    }

    return res.status(200).json({
      mensaje: 'Cita obtenida correctamente',
      cita
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener cita',
      error: error.message
    });
  }
};

const createCita = async (req, res) => {
  const { paciente_id, fecha, hora, motivo, estado } = req.body;

  try {
    // 1. Validar campos obligatorios
    if (!paciente_id || !fecha || !hora || !motivo) {
      return res.status(400).json({
        mensaje: 'Los campos paciente_id, fecha, hora y motivo son obligatorios'
      });
    }

    // 2. Verificar que el paciente existe
    const pacienteExiste = await Paciente.findByPk(paciente_id);
    if (!pacienteExiste) {
      return res.status(404).json({
        mensaje: 'El paciente no existe'
      });
    }

    // 3. NUEVA VALIDACIÓN: Verificar si el paciente ya tiene cita ese día a esa hora
    const citaDuplicada = await Cita.findOne({
      where: {
        paciente_id,
        fecha,
        hora
      }
    });

    if (citaDuplicada) {
      return res.status(409).json({ // 409 es el código HTTP para "Conflict"
        mensaje: 'Este paciente ya tiene una cita agendada para la misma fecha y hora'
      });
    }

    // 4. Si pasa las validaciones, crear la cita
    const nuevaCita = await Cita.create({
      paciente_id,
      fecha,
      hora,
      motivo,
      estado: estado || 'pendiente' // Valor por defecto si no viene en el body
    });

    return res.status(201).json({
      mensaje: 'Cita creada correctamente',
      cita: nuevaCita
    });

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al crear cita',
      error: error.message
    });
  }
};

const updateCita = async (req, res) => {
  const { id } = req.params;
  const { paciente_id, fecha, hora, motivo, estado } = req.body;

  try {
    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({
        mensaje: 'Cita no encontrada'
      });
    }

    if (paciente_id) {
      const pacienteExiste = await Paciente.findByPk(paciente_id);

      if (!pacienteExiste) {
        return res.status(404).json({
          mensaje: 'El paciente no existe'
        });
      }
    }

    await cita.update({
      paciente_id,
      fecha,
      hora,
      motivo,
      estado
    });

    return res.status(200).json({
      mensaje: 'Cita actualizada correctamente',
      cita
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar cita',
      error: error.message
    });
  }
};

const deleteCita = async (req, res) => {
  const { id } = req.params;

  try {
    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({
        mensaje: 'Cita no encontrada'
      });
    }

    await cita.destroy();

    return res.status(200).json({
      mensaje: 'Cita eliminada correctamente'
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar cita',
      error: error.message
    });
  }
};

module.exports = {
  getCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita
};

