import express from 'express';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import db from './config/db';

// Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log( colors.blue( 'Conexión exitosa a la BD'))
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold('Hubo un error al conectar a la BD'));
  }
}
connectDB();

// Instancia de express
const server = express();

//Permitir Conexiones
const corsOptions: CorsOptions = {
  /**
   * Origin: Es el dominio que tiene permitido hacer peticiones a la API
   * callback: Es la función que se ejecuta si el origen tiene permitido hacer peticiones
   */
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL ) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};

server.use(cors(corsOptions)); // Habilitar cors

// Leer datos de formularios
server.use(express.json());

server.use('/api/products', router);

// Docs
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
