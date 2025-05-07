const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  location: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Lista de usuarios que asisten
  }]
}, {
  timestamps: true // Crea automáticamente createdAt y updatedAt
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
