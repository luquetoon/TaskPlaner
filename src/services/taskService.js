const Task = require('../models/Task');

class TaskService {
  async createTask(data) {
    return await Task.create(data);
  }

  async getAllTasks(filter = {}) {
    return await Task.find(filter).populate('assignedTo').populate('relatedEvent');
  }

  async getTaskById(id) {
    return await Task.findById(id).populate('assignedTo').populate('relatedEvent');
  }

  async updateTask(id, updateData) {
    return await Task.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  }

  async getTasksByUser(userId) {
    return await Task.find({ assignedTo: userId });
  }

  async getTasksByStatus(status) {
    let filter = {};
    if (status === 'completed') {
      filter.completed = true;
    } else if (status === 'pending') {
      filter.completed = false;
    }
    return await Task.find(filter).populate('assignedTo');
  }
}

module.exports = new TaskService();
