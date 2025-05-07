const { validationResult } = require('express-validator');

/**
 * Middleware para manejar los resultados de validación
 * Si hay errores en la validación, responde con un error 400
 * Si no hay errores, pasa al siguiente middleware
 */
const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateResult,
};
