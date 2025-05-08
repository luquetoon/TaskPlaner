const Event = require('../models/Events');

class EventService {
  async createEvent(data) {
    return await Event.create(data);
  }

  async getAllEvents(filter = {}) {
    return await Event.find(filter).populate('createdBy').populate('attendees');
  }

  async getEventById(id) {
    return await Event.findById(id).populate('createdBy').populate('attendees');
  }

  async updateEvent(id, updateData) {
    return await Event.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteEvent(id) {
    return await Event.findByIdAndDelete(id);
  }

  async getEventsByUser(userId) {
    return await Event.find({ attendees: userId });
  }

  async getEventsByDateRange(startDate, endDate) {
    return await Event.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('createdBy');
  }
}

module.exports = new EventService();
