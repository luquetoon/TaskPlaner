const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserValidations, getUserValidations, updateUserValidations } = require('../validations/userValidation');
const { requireRole } = require('../middlewares/roleMiddleware.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');
const { validateResult } = require('../utils/validateResult.js'); // Aquí importamos validateResult

// ** Rutas protegidas y con validación **

// GET solo para usuarios autenticados (pero protegido)
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', authMiddleware, userController.getUsers);


// POST solo para admins
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', authMiddleware, requireRole('admin'), createUserValidations, validateResult, userController.createUser);

// PUT solo para admins
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put('/:id', authMiddleware, requireRole('admin'), getUserValidations, updateUserValidations, validateResult, userController.updateUser);

// DELETE solo para admins
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */
router.delete('/:id', authMiddleware, requireRole('admin'), getUserValidations, validateResult, userController.deleteUser);

module.exports = router;
