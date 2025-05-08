const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { createTaskValidations, getTaskValidations, updateTaskValidations } = require('../validations/taskValidation');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

// ** Rutas protegidas y con validación **

// GET público (pero protegido con login)
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', authMiddleware, taskController.getTasks);


// POST solo para usuarios autenticados
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post('/', authMiddleware, createTaskValidations, taskController.createTask);

// PUT solo para usuarios autenticados
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.put('/:id', authMiddleware, getTaskValidations, updateTaskValidations, taskController.updateTask);

// DELETE solo para usuarios autenticados
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 */
router.delete('/:id', authMiddleware, getTaskValidations, taskController.deleteTask);

module.exports = router;
