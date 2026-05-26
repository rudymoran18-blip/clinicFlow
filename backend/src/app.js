const express = require('express');
const cors = require('cors');

const pacienteRoutes = require('./routes/paciente.routes');
const citaRoutes = require('./routes/cita.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pacientes', pacienteRoutes);
app.use('/api/citas', citaRoutes);

module.exports = app;