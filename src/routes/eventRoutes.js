const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { createEventValidations, getEventValidations, updateEventValidations } = require('../validations/eventValidation');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

// ** Rutas protegidas y con validación **

// GET público (pero protegido con login)
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Obtiene todos los eventos
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/', authMiddleware, eventController.getEvents);

// POST solo para admins
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Crea un nuevo evento
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */
router.post('/', authMiddleware, requireRole('admin'), createEventValidations, eventController.createEvent);

// PUT solo para admin
/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Actualiza un evento existente
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Evento actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */
router.put('/:id', authMiddleware, requireRole('admin'), getEventValidations, updateEventValidations, eventController.updateEvent);

// DELETE solo para admins
/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Elimina un evento
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento eliminado exitosamente
 */
router.delete('/:id', authMiddleware, requireRole('admin'), getEventValidations, eventController.deleteEvent);

module.exports = router;
