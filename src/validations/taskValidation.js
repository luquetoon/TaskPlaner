const { body, param } = require('express-validator');
const { validateResult } = require('../utils/validateResult');

// Validaciones para crear y actualizar tareas
const createTaskValidations = [
  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isString()
    .withMessage('El título debe ser una cadena de texto'),
  body('dueDate')
    .notEmpty()
    .withMessage('La fecha de vencimiento es obligatoria')
    .isDate()
    .withMessage('Debe ser una fecha válida'),
  body('status')
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('El estado debe ser uno de: "pending", "in_progress", "completed"'),
  body('assignedTo')
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido para el usuario asignado'),
  body('relatedEvent')
    .optional()
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido para el evento relacionado'),
  validateResult,
];

// Validaciones para obtener una tarea por ID
const getTaskValidations = [
  param('id')
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido'),
  validateResult,
];

// Validaciones para actualizar una tarea
const updateTaskValidations = [
  param('id')
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido'),
  body('title')
    .optional()
    .isString()
    .withMessage('El título debe ser una cadena de texto'),
  body('dueDate')
    .optional()
    .isDate()
    .withMessage('Debe ser una fecha válida'),
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('El estado debe ser uno de: "pending", "in_progress", "completed"'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido para el usuario asignado'),
  body('relatedEvent')
    .optional()
    .isMongoId()
    .withMessage('Debe ser un ID de MongoDB válido para el evento relacionado'),
  validateResult,
];

module.exports = {
  createTaskValidations,
  getTaskValidations,
  updateTaskValidations,
};
