// Importación de librerías
import express from 'express'; // Importamos express
import colors from 'colors'; // Importamos colors
import swaggerUi from 'swagger-ui-express'; // Importamos swagger-ui-express
import swaggerSpec from './config/swagger'; // Importamos el archivo de configuración de swagger
import router from './router'; // Importamos el router
import db from './config/db'; // Importamos la base de datos

// Conectar a la base de datos
export async function connectDB() {
  try {
    await db.authenticate(); // Autentica la conexión a la base de datos
    await db.sync(); // Sincroniza los modelos de la base de datos con el esquema de la base de datos
    // console.log(colors.blue.bold('Conectado a la base de datos')); // Muestra un mensaje de éxito cuando se conecta a la base de datos
  } catch (error) {
    console.log(error); // Muestra cualquier error que ocurra durante la conexión
    console.log(colors.red.bold('Error al conectar a la base de datos')); // Muestra un mensaje de error cuando no se puede conectar a la base de datos
  }
}
connectDB(); // Llama a la función connectDB para conectar a la base de datos

// Instancia de express
const server = express(); // Crear instancia de express

// Middleware para leer datos de formularios
server.use(express.json());

// Documentación de la API
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Middleware para mostrar la documentación de la API

// Exportación del servidor
export default server;
