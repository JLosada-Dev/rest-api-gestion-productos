import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

// Decorador para definir una tabla
@Table({
  tableName: 'products', // Nombre de la tabla en la base de datos
})
class Product extends Model {
  // Atributo name de tipo string, ! indica que es requerido
  @Column({
    type: DataType.STRING(100), // Tipo de dato de la columna
  })
  declare name: string;

  // Atributo price de tipo number
  @Column({
    type: DataType.FLOAT, // (5,2) 5 dígitos en total y 2 decimales para el precio
  })
  declare price: number;

  // Atributo available de tipo boolean, con valor por defecto true
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare available: boolean;
}

export default Product;
