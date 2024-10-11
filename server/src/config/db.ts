import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno del archivo .env

//console.log(process.env.DATABASE_URL);

const db = new Sequelize(process.env.DATABASE_URL!, {
  // Creación del modelo Especifica la carpeta donde se encuentran los modelos, es un array de strings con la ruta de la carpeta donde se encuentran los modelos.
  models: [__dirname + '/../models/**/*.ts'], // __dirname es una variable global de Node.js que contiene la ruta del archivo actual, en este caso la carpeta config.
  logging: false,// Deshabilita los logs de las consultas a la base de datos

});
// Creamos una instancia de Sequelize con la URL de la base de datos que está en la variable de entorno DATABASE_URL que se carga con dotenv y el método config de Sequelize que recibe un objeto con la URL de la base de datos.
//Con ! le decimos que no es null o undefined y que confíe en nosotros que siempre va a haber una variable de entorno llamada DATABASE_URL

// con ?ssl=true le decimos que la conexión es segura forzando a que se conecte a través de SSL
// Otra forma después de la url , {dialectOptions: {ssl: {require: false}}}

export default db;
