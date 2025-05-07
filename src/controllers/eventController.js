const eventService = require('../services/eventService');
const { validationResult } = require('express-validator');

const getEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los eventos', error });
  }
};

const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el evento', error });
  }
};

const updateEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
    if (!updatedEvent) return res.status(404).json({ message: 'Evento no encontrado' });

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el evento', error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deleted = await eventService.deleteEvent(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Evento no encontrado' });

    res.status(200).json({ message: 'Evento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el evento', error });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
