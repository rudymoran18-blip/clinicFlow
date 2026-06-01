const app = require('./app');
const sequelize = require('./config/db');
require('./models');

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada correctamente');

    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error al conectar la base de datos:', error.message);
  }
};

iniciarServidor();