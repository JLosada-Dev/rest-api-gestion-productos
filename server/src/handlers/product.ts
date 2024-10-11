import { Request, Response } from 'express'; // interfaces de express para tipa req y res

// import { check, validationResult } from 'express-validator';
// Importamos check y validationResult de express-validator, check valida los campos y validationResult obtiene los errores de la validación

import Product from '../models/Product.model'; // Importamos el modelo Product

//GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
    // Buscar todos los productos, se usa el await al interactuar con el modelo, con el findAll() traemos todos los productos de la base de datos y los podemos ordenar por id de forma descendente o por cualquier otro campo. el ORM simplifica la interacción con la base de datos.
    const products = await Product.findAll({
      order: [['id', 'DESC']], // Ordenamos los productos por id de forma descendente, ORDER BY id DESC
      //limit: 2, // Limitamos la cantidad de productos a 2 LIMIT 2
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluimos los campos createdAt y updatedAt de la respuesta
    });
    res.json({ data: products }); // Respondemos con los productos encontrados
  } catch (error) {
    console.log(error);
  }
};

//GET /api/products
export const getProductsById = async (req: Request, res: Response) => {
  try {
    // Para recuperar el parámetro de la URL se usa "req.params.id" el id es el nombre del parámetro que se definió en la ruta puede ser cualquier nombre.
    const { id } = req.params; // Extraemos el id de la petición
    const product = await Product.findByPk(id); // Buscamos un producto por su id

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' }); // Si no se encuentra el producto respondemos con un status 404 Not Found
    }

    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};

// POST /api/products
export const createProduct = async (req: Request, res: Response) => {
  /* Alternativa 1 con new Product
  const product = new Product(req.body); // Creamos una instancia de Product
  const savedProduct = await product.save(); // Guardamos el producto en la base de datos, await espera a que se guarde el producto en la base de datos. */

  //Validamos los datos de entrada en el handler
  // await check('name')
  //   .notEmpty()
  //   .withMessage('El nombre del producto no puede ir vacío')
  //   .run(req); // Validamos que el campo name no esté vacío en la petición POST de la API REST. run() ejecuta la validación.
  // await check('price')
  //   .isNumeric()
  //   .withMessage('El precio del producto debe ser un número')
  //   .notEmpty()
  //   .withMessage('El precio del producto no puede ir vacío')
  //   .custom((value) => value > 0)
  //   .withMessage('El precio del producto debe ser mayor a 0')
  //   .run(req);

  // Validamos los errores de la validación

  // let errors = validationResult(req); // validationResult() obtiene los errores de la validación
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() }); // Respondemos con los errores de la validación, status 400 Bad Request si hay errores en la validación
  // }

  try {
    // Alternativa 2 con Product.create
    // Crear un producto
    const product = await Product.create(req.body); // Creamos y guardamos el producto en la base de datos en una sola línea
    res.status(201).json({ data: product });
    // Respondemos con el producto creado, y se envía un status 201 Created para indicar que se creó un nuevo recurso
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  // Primero validar si el productos existe
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' }); // Si no se encuentra el producto respondemos con un status 404 Not Found
  }

  // Actualizar un producto
  await product.update(req.body); // Actualizamos el producto con los datos de la petición, solo realiza modificaciones parciales de los campos que se envíen en la petición.

  await product.save(); // Guardamos el producto actualizado en la base de datos

  res.json({ data: product });
};

export const updateAvailable = async (req: Request, res: Response) => {
  // Primero validar si el productos existe
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  // Actualizar un producto
  product.available = !product.dataValues.available; // Invertimos el valor de available, si estaba en true lo ponemos en false y viceversa
  // No es necesario especificar el valor de available en req.body, ya que solo se necesita invertir el valor de available
  await product.save();

  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  await product.destroy(); // Eliminamos el producto de la base de datos

  res.json({ data: 'Producto eliminado' });
};
