import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

// Carga las variables de entorno del archivo .env
dotenv.config();

// Creamos una instancia de Sequelize con la URL de la base de datos que está en la variable de entorno DATABASE_URL
const db = new Sequelize(process.env.DATABASE_URL!, {
  // Especifica la carpeta donde se encuentran los modelos
  models: [__dirname + '/../models/**/*.ts'], // __dirname es una variable global de Node.js que contiene la ruta del archivo actual
  logging: false, // Deshabilita los logs de las consultas a la base de datos
});

export default db;
