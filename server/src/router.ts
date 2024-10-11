import { Router } from 'express';
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

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The Product name
 *           example: Monitor Curvo de 49 Pulgadas
 *         price:
 *           type: number
 *           description: The Product price
 *           example: 300
 *         available:
 *           type: boolean
 *           description: The Product available
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $
 */

// Routing
router.get('/', getProducts);

router.get(
  '/:id',
  param('id').isInt().withMessage('Id no válido'),
  handleInputErrors,
  getProductsById
);

router.post(
  '/',
  body('name').notEmpty().withMessage('El nombre del producto no puede ir vacío'),
  body('price')
    .isNumeric().withMessage('El precio del producto debe ser un número')
    .notEmpty().withMessage('El precio del producto no puede ir vacío')
    .custom((value) => value > 0).withMessage('El precio del producto debe ser mayor a 0'),
  handleInputErrors,
  createProduct
);

router.put(
  '/:id',
  param('id').isInt().withMessage('Id no válido'),
  body('name').notEmpty().withMessage('El nombre del producto no puede ir vacío'),
  body('price')
    .isNumeric().withMessage('El precio del producto debe ser un número')
    .notEmpty().withMessage('El precio del producto no puede ir vacío')
    .custom((value) => value > 0).withMessage('El precio del producto debe ser mayor a 0'),
  body('available').isBoolean().withMessage('El campo available debe ser un booleano').optional(),
  handleInputErrors,
  updateProduct
);

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

export default router;
