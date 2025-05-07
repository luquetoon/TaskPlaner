const taskService = require('../services/taskService');
const { validationResult } = require('express-validator');

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas', error });
  }
};

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
};

const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    if (!updatedTask) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea', error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
