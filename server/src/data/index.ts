// Limpiar la base de datos

import { exit } from 'node:process'; // Importamos la función exit de la librería nativa de Node.js process para salir del proceso de Node.js con process.exit() si hay un error. 
import db from '../config/db';


const clearDB = async () => {
  try{
    await db.sync({force: true}); // Sincronizamos la base de datos con la opción force: true para eliminar todas las tablas y crearlas de nuevo.
    console.log('Base de datos limpiada');
    exit(0); // Salimos del proceso de Node.js con el código 0 si todo sale bien, se puede usar el 0 o no poner nada ya que por defecto es 0.
  } catch (error) {
    console.log(error);
    exit(1); // Salimos del proceso de Node.js con el código 1 si hay un error.
  }
}


if (process.argv[2] === '--clear') { // Comprobamos si el segundo argumento de la línea de comandos es --clear.
  clearDB(); // Llamamos a la función clearDB si el segundo argumento de la línea de comandos es --clear.
}