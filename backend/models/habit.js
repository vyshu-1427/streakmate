import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  // original single time kept for backwards compatibility
  time: { type: String }, // store time as 'HH:mm' string
  // new start/end time range (optional)
  timeFrom: { type: String }, // 'HH:mm'
  timeTo: { type: String }, // 'HH:mm'
  frequency: { type: String, enum: ['daily', 'weekly'], required: true },
  target: { type: Number, default: 1 }, // for weekly habits
  streak: { type: Number, default: 0 },
  completedDates: [{ type: String }], // store as 'YYYY-MM-DD'
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Habit', HabitSchema); 