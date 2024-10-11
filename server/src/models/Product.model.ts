import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'; // Importar los decoradores de sequelize

// Decorador para definir una tabla
@Table({
  tableName: 'products', // Nombre de la tabla en la base de datos
})

//  Con Modelo de sequelize se crea una clase que extiende (Hereda) de Model, que es una clase de sequelize-typescript que nos permite definir los atributos de la tabla y los tipos de datos de cada atributo.
// En  el modelo hay que definir los atributos de la tabla, en este caso la tabla products tiene los siguientes atributos: id, name, description, price, stock y image.
class Product extends Model {
  // Decorador para definir una columna
  @Column({
    type: DataType.STRING(100), // Tipo de dato de la columna, seria como en la base de datos VARCHAR o TEXT dependiendo del tamaño del string que se quiera guardar en la columna name de la tabla products, sequelize se encarga de hacer la conversión de los tipos de datos de javascript a los tipos de datos de la base de datos, es una abstracción de la base de datos.
    // Configuración de la columna el tipo de dato y si es requerido o no, maxLength: 100 caracteres
  })
  // Atributo name de tipo string, ! indica que es requerido
  declare name: string; 
  // declare es una característica de TypeScript que permite definir una variable sin inicializara, es decir, se puede declarar una variable y asignarle un valor más adelante.
  @Column({
    type: DataType.FLOAT, // (5,2)5 dígitos en total y 2 decimales para el precio.
  })
  declare price: number;

  @Default(true) // Valor por defecto si no se envía un valor en la petición POST de la API REST. Colocar antes del decorador @Column.
  @Column({
    type: DataType.BOOLEAN,
  })
  declare available: boolean;
  //declare available: boolean = true; 
  // Atributo available de tipo boolean, ! indica que es requerido
}

export default Product; // Exportar el modelo Product
