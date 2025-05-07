const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { createEventValidations, getEventValidations, updateEventValidations } = require('../validations/eventValidation');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

// ** Rutas protegidas y con validación **

// GET público (pero protegido con login)
router.get('/', authMiddleware, eventController.getEvents);

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
router.get('/', eventController.getEventController);

// POST solo para admins
router.post('/', authMiddleware, requireRole('admin'), createEventValidations, eventController.createEvent);

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
router.post('/', createEventValidations, eventController.createEvent);

// PUT solo para admins
router.put('/:id', authMiddleware, requireRole('admin'), getEventValidations, updateEventValidations, eventController.updateEvent);

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
router.put('/:id', getEventValidations, updateEventValidations, eventController.updateEvent);

// DELETE solo para admins
router.delete('/:id', authMiddleware, requireRole('admin'), getEventValidations, eventController.deleteEvent);

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
router.delete('/:id', getEventValidations, eventController.deleteEvent);

module.exports = router;
