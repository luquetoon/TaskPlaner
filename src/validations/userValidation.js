const { body, param } = require('express-validator');
const { validateResult } = require('../utils/validateResult');  

// Validaciones para crear y actualizar usuarios
const createUserValidations = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto'),
  body('email')
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('role')
    .isIn(['user', 'admin'])
    .withMessage('El rol debe ser "user" o "admin"'),
  validateResult, 
];

// Validaciones para obtener un usuario por ID
const getUserValidations = [
  param('id')
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido'),
  validateResult,  
];

// Validaciones para actualizar un usuario
const updateUserValidations = [
  param('id')
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido'),
  body('name')
    .optional()
    .isString()
    .withMessage('El nombre debe ser una cadena de texto'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('El rol debe ser "user" o "admin"'),
  validateResult,  // Se asegura de llamar a validateResult
];

module.exports = {
  createUserValidations,
  getUserValidations,
  updateUserValidations,
};
