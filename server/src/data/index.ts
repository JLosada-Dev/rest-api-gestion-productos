import { exit } from 'node:process'; // Importamos la función exit de la librería nativa de Node.js process para salir del proceso de Node.js con process.exit() si hay un error.
import db from '../config/db';

// Función para limpiar la base de datos
const clearDB = async () => {
  try {
    // Sincronizamos la base de datos con la opción force: true para eliminar todas las tablas y crearlas de nuevo.
    await db.sync({ force: true });
    console.log('Base de datos limpiada');
    exit(0); // Salimos del proceso de Node.js con el código 0 si todo sale bien.
  } catch (error) {
    console.error('Error al limpiar la base de datos:', error);
    exit(1); // Salimos del proceso de Node.js con el código 1 si hay un error.
  }
};

// Comprobamos si el segundo argumento de la línea de comandos es --clear.
if (process.argv[2] === '--clear') {
  clearDB(); // Llamamos a la función clearDB si el segundo argumento de la línea de comandos es --clear.
}
