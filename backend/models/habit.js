const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  frequency: { type: String, enum: ['daily', 'weekly'], required: true },
  target: { type: Number, default: 1 }, // for weekly habits
  streak: { type: Number, default: 0 },
  completedDates: [{ type: String }], // store as 'YYYY-MM-DD'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Habit', HabitSchema); 