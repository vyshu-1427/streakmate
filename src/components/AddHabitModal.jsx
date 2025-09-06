import React, { useState } from 'react';
import { Flame, Book, Dumbbell, Coffee, FileText, Brain } from 'lucide-react';

const iconOptions = [
  { icon: <Flame />, label: 'Flame', value: 'Flame' },
  { icon: <Book />, label: 'Book', value: 'Book' },
  { icon: <Dumbbell />, label: 'Workout', value: 'Workout' },
  { icon: <Coffee />, label: 'Coffee', value: 'Coffee' },
  { icon: <FileText />, label: 'Notes', value: 'Notes' },
  { icon: <Brain />, label: 'Mindfulness', value: 'Mindfulness' },
];

const AddHabitModal = ({ open, onClose, onAdd }) => {
  const [habitData, setHabitData] = useState({
    name: '',
    description: '',
    frequency: 'daily',
    timeFrom: '',
    timeTo: '',
    icon: iconOptions[0],
  });
  const [timeError, setTimeError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData((prev) => ({ ...prev, [name]: value }));
    if (name === 'timeFrom' || name === 'timeTo') {
      // clear previous error when user updates times
      setTimeError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHabit = {
      name: habitData.name,
      description: habitData.description,
      frequency: habitData.frequency,
  timeFrom: habitData.timeFrom,
  timeTo: habitData.timeTo,
      icon: habitData.icon?.value || 'Flame',
      streak: 0,
      completedDates: [],
    };

    console.log('Submitting new habit:', newHabit); // Debugging line
    if (!newHabit.name || !newHabit.frequency) {
        throw new Error('Missing required fields: name, frequency');
    }

    // validate time range if both provided
    if (habitData.timeFrom && habitData.timeTo) {
      const [fh, fm] = habitData.timeFrom.split(':').map(Number);
      const [th, tm] = habitData.timeTo.split(':').map(Number);
      if (isNaN(fh) || isNaN(fm) || isNaN(th) || isNaN(tm)) {
        setTimeError('Invalid time format');
        return;
      }
      if (fh > th || (fh === th && fm > tm)) {
        setTimeError('Start time must be before or equal to end time');
        return;
      }
    }

    try {
      // Delegate the server POST to the parent handler (Dashboard.handleAddHabit)
      await onAdd(newHabit);
      setHabitData({
        name: '',
        description: '',
        frequency: 'daily',
        timeFrom: '',
        timeTo: '',
        icon: iconOptions[0],
      });
      setTimeError('');
      onClose();
    } catch (err) {
      console.error('Error adding habit (parent handler):', err);
      alert(err.message || 'Failed to add habit. Please try again.');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Habit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Habit name"
            value={habitData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={habitData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />

          <div className="flex gap-2 flex-wrap">
            {iconOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                className={`p-2 border rounded ${
                  habitData.icon.value === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-black border-gray-300'
                } hover:bg-blue-100`}
                onClick={() => setHabitData((prev) => ({ ...prev, icon: option }))}
              >
                {option.icon}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="time"
              name="timeFrom"
              placeholder="Start time"
              value={habitData.timeFrom}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="time"
              name="timeTo"
              placeholder="End time (optional)"
              value={habitData.timeTo}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {timeError && (
            <p className="text-sm text-red-500 mt-1">{timeError}</p>
          )}

          <div className="mt-2">
            <select
              name="frequency"
              value={habitData.frequency}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Habit
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddHabitModal;
