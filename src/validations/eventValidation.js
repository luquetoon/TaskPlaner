const { body, param } = require('express-validator');
const { validateResult } = require('../utils/validateResult');

// Validaciones para crear y actualizar eventos
const createEventValidations = [
  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isString()
    .withMessage('El título debe ser una cadena de texto'),
  body('date')
    .notEmpty()
    .withMessage('La fecha es obligatoria')
    .isDate()
    .withMessage('Debe ser una fecha válida'),
  body('location')
    .optional()
    .isString()
    .withMessage('El lugar debe ser una cadena de texto'),
  body('attendees')
    .optional()
    .isArray()
    .withMessage('Los asistentes deben ser un array de IDs de usuarios'),
  validateResult,
];

// Validaciones para obtener un evento por ID
const getEventValidations = [
  param('id')
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido'),
  validateResult,
];

// Validaciones para actualizar un evento
const updateEventValidations = [
  param('id')
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido'),
  body('title')
    .optional()
    .isString()
    .withMessage('El título debe ser una cadena de texto'),
  body('date')
    .optional()
    .isDate()
    .withMessage('Debe ser una fecha válida'),
  body('location')
    .optional()
    .isString()
    .withMessage('El lugar debe ser una cadena de texto'),
  body('attendees')
    .optional()
    .isArray()
    .withMessage('Los asistentes deben ser un array de IDs de usuarios'),
  validateResult,
];

module.exports = {
  createEventValidations,
  getEventValidations,
  updateEventValidations,
};
