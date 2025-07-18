import express from 'express';
import { format, isSameDay, subDays, differenceInDays } from 'date-fns';
import Habit from '../models/habit.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Custom error class for API errors
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Input validation function
const validateInput = (data, requiredFields) => {
  const missingFields = requiredFields.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missingFields.join(', ')}`);
  }
  if (data.name && data.name.length > 100) {
    throw new ApiError(400, 'Habit name must be 100 characters or less');
  }
  if (data.frequency && !['daily', 'weekly'].includes(data.frequency)) {
    throw new ApiError(400, 'Frequency must be "daily" or "weekly"');
  }
  if (data.target && (isNaN(data.target) || data.target < 1)) {
    throw new ApiError(400, 'Target must be a positive number');
  }
};

// Calculate streak based on completedDates
const calculateStreak = (completedDates, frequency, target) => {
  if (!completedDates || completedDates.length === 0) return 0;

  const sortedDates = [...completedDates].sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  const today = new Date();

  if (frequency === 'daily') {
    let currentDate = today;
    for (const date of sortedDates) {
      if (isSameDay(new Date(date), currentDate)) {
        streak++;
        currentDate = subDays(currentDate, 1);
      } else if (differenceInDays(currentDate, new Date(date)) > 1) {
        break;
      }
    }
  } else if (frequency === 'weekly') {
    // Count weeks with target completions
    const weeks = {};
    sortedDates.forEach((date) => {
      const weekStart = format(new Date(date), 'yyyy-WW');
      weeks[weekStart] = (weeks[weekStart] || 0) + 1;
    });

    let currentWeek = format(today, 'yyyy-WW');
    let weekCount = 0;
    while (weeks[currentWeek] && weeks[currentWeek] >= target) {
      streak++;
      weekCount++;
      currentWeek = format(subDays(new Date(currentWeek), 7), 'yyyy-WW');
    }
  }

  return streak;
};

// Controller functions
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    // Update streaks for all habits
    for (const habit of habits) {
      habit.streak = calculateStreak(habit.completedDates, habit.frequency, habit.target);
      await habit.save();
    }
    res.json({
      success: true,
      habits,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Failed to fetch habits',
    });
  }
};

const createHabit = async (req, res) => {
  const { name, description, frequency, target } = req.body;
  try {
    validateInput(req.body, ['name', 'frequency']);
    const habitData = {
      user: req.user.id,
      name,
      description: description || '',
      frequency,
      target: frequency === 'weekly' ? target || 1 : 1,
      completedDates: [],
      streak: 0,
    };

    const newHabit = new Habit(habitData);
    await newHabit.save();

    res.status(201).json({
      success: true,
      habit: newHabit,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Failed to create habit',
    });
  }
};

const updateHabitCompletion = async (req, res) => {
  const { id } = req.params;
  const { date, completed } = req.body;
  try {
    validateInput(req.body, ['date', 'completed']);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ApiError(400, 'Date must be in YYYY-MM-DD format');
    }

    const habit = await Habit.findOne({ _id: id, user: req.user.id });
    if (!habit) {
      throw new ApiError(404, 'Habit not found');
    }

    if (completed) {
      habit.completedDates = [...new Set([...habit.completedDates, date])];
    } else {
      habit.completedDates = habit.completedDates.filter((d) => d !== date);
    }

    habit.streak = calculateStreak(habit.completedDates, habit.frequency, habit.target);
    await habit.save();

    res.json({
      success: true,
      habit,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Failed to update habit',
    });
  }
};

const deleteHabit = async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await Habit.findOneAndDelete({ _id: id, user: req.user.id });
    if (!habit) {
      throw new ApiError(404, 'Habit not found');
    }

    res.json({
      success: true,
      message: 'Habit deleted successfully',
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Failed to delete habit',
    });
  }
};

// Initialize router
const router = express.Router();

// Routes
router.get('/', authMiddleware, getHabits);
router.post('/', authMiddleware, createHabit);
router.put('/:id/complete', authMiddleware, updateHabitCompletion);
router.delete('/:id', authMiddleware, deleteHabit);

export default router;