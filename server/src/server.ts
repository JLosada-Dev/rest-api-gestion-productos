// Importación de librerías
import express from 'express'; // Importamos express
import colors from 'colors'; // Importamos colors
import swaggerUi from 'swagger-ui-express'; // Importamos swagger-ui-express
import swaggerSpec from './config/swagger'; // Importamos el archivo de configuración de swagger
import router from './router'; // Importamos el router
import db from './config/db'; // Importamos la base de datos

// Conectar a base de datos

// Conectar a la base de datos
export async function connectDB() {
  // Export de la función connectDB para los tests
  try {
    await db.authenticate(); // Autentica la conexión a la base de datos
    db.sync(); // Sincroniza los modelos de la base de datos con el esquema de la base de datos

    // console.log(colors.blue.bold('Conectado a la base de datos')); // Muestra un mensaje de éxito cuando se conecta a la base de datos
    
  } catch (error) {
    console.log(error); // Muestra cualquier error que ocurra durante la conexión
    console.log(colors.red.bold('Error al conectar a la base de datos')); // Muestra un mensaje de error cuando no se puede conectar a la base de datos
  }
}
connectDB(); // Llama a la función connectDB para conectar a la base de datos

// Instancia de express
const server = express(); // mandar la configuración del proyecto

// Leer datos de formularios
server.use(express.json()); // Middleware para leer datos de formularios

// Endpoint de productos
server.use('/api/products', router); 




// Método .use que engloba todas los verbos de http
// / es la ruta raíz y le pasamos el router que creamos en el archivo router.ts
// el req entra en .use y se va a router y se ejecuta la función que corresponda
// Con el use podemos cambiar la ruta raíz de la API, por ejemplo si cambiamos '/' por '/api' la API estaría en http://localhost:4000/api
// se pueden tener diferentes rutas para diferentes recursos de la API como /users, /products, /orders, etc. y cada uno de estos recursos puede tener sus propios métodos GET, POST, PUT y DELETE.



server.get('/api', (req, res) => {
  res.json({msg: 'API de productos'}); 
  // Ruta raíz de la API
});
// NOTA: nombrar de la misma forma el archivo de test, server.test.ts

// Docs de la API
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Middleware para mostrar la documentación de la API

// Exportación del servidor
export default server;
