const app = require('./app');
const sequelize = require('./config/db');
require('./models');

const PORT = 3000;

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada correctamente');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar la base de datos:', error.message);
  }
};

iniciarServidor();