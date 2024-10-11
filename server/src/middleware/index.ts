import { Request, Response, NextFunction } from 'express'; // Importamos las interfaces Request, Response y NextFunction de express
import { validationResult } from 'express-validator'; // Importamos validationResult de express-validator

// Siempre los Middlewares se trabajan con req, res
export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req); // validationResult() obtiene los errores de la validación
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Respondemos con los errores de la validación, status 400 Bad Request si hay errores en la validación
  }
  next(); // Llama al siguiente middleware
};
