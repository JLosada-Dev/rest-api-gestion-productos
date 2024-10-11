import { Router } from 'express'; // Importamos una instancia Router desde express
import { body, param } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateAvailable,
  updateProduct,
} from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router(); // Creamos una instancia de Router

// Swagger esquema de la API

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  available:
 *                      type: boolean
 *                      description: The Product available
 *                      example: true
 */

/**
 *@swagger
 * /api/products:
 *  get:
 *    summary: Get all products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *         application/json:
 *          schema:
 *           $
 */

/* Routing
  La el método get de express recibe dos parámetros, el primero es la ruta y el segundo es una función que recibe dos parámetros, req y res, que representan la petición y la respuesta respectivamente.
  req es un objeto que contiene toda la información de la petición y res es un objeto que contiene métodos para responder a la petición.
  El Navegador solo soporta o puede hacer peticiones o verbos GET y POST 
*/

router.get('/', getProducts);

// Dynamic Routing -> habilita con /:<Variable> que se va traducir en un parámetro de la ruta
router.get(
  '/:id',
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  getProductsById
);

router.post(
  '/',
  // Validación en el router
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto no puede ir vacío'),

  body('price')
    .isNumeric()
    .withMessage('El precio del producto debe ser un número')
    .notEmpty()
    .withMessage('El precio del producto no puede ir vacío')
    .custom((value) => value > 0)
    .withMessage('El precio del producto debe ser mayor a 0'),
  handleInputErrors, // Middleware de validación de errores de entrada en el router.
  createProduct
);

// PUT /api/products/:id -> Siempre un PUT es hacia un recurso específico
router.put(
  '/:id', // Validación en el router
  param('id').isInt().withMessage('Id no válido'),

  body('name')
    .notEmpty()
    .withMessage('El nombre del producto no puede ir vacío'),

  body('price')
    .isNumeric()
    .withMessage('El precio del producto debe ser un número')
    .notEmpty()
    .withMessage('El precio del producto no puede ir vacío')
    .custom((value) => value > 0)
    .withMessage('El precio del producto debe ser mayor a 0'),

  body('available')
    .isBoolean()
    .withMessage('El campo available debe ser un booleano')
    .optional(), // El campo available es opcional en la petición PUT de la API REST.

  handleInputErrors,

  updateProduct
);

// PATCH /api/products/:id/available
router.patch(
  '/:id',
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  updateAvailable
);

router.delete(
  '/:id',
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  deleteProduct
);

export default router; // Exportamos el router
