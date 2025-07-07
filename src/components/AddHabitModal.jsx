import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Book, Dumbbell, Coffee, FileText, Brain, Plus } from 'lucide-react';

function AddHabitModal({ isOpen, onClose, onAdd }) {
  const [habitData, setHabitData] = useState({
    name: '',
    description: '',
    frequency: 'daily',
    target: 1,
    icon: <Flame />,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...habitData,
      id: Date.now().toString(),
      streak: 0,
      completedDates: [],
    });
    setHabitData({
      name: '',
      description: '',
      frequency: 'daily',
      target: 1,
      icon: <Flame />,
    });
    onClose();
  };

  const iconOptions = [
    { icon: <Flame />, label: 'Flame' },
    { icon: <Book />, label: 'Book' },
    { icon: <Dumbbell />, label: 'Workout' },
    { icon: <Coffee />, label: 'Coffee' },
    { icon: <FileText />, label: 'Notes' },
    { icon: <Brain />, label: 'Mindfulness' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-white rounded-xl shadow-elevated"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center p-6 border-b border-neutral-100">
              <h2 className="text-xl font-display font-bold text-neutral-900">Add New Habit</h2>
              <button 
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-neutral-700 font-medium mb-2">Habit Name</label>
                <input
                  type="text"
                  name="name"
                  value={habitData.name}
                  onChange={handleChange}
                  placeholder="e.g., Morning Meditation"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-700 font-medium mb-2">Description (Optional)</label>
                <textarea
                  name="description"
                  value={habitData.description}
                  onChange={handleChange}
                  placeholder="Why do you want to build this habit?"
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none h-24"
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-700 font-medium mb-2">Icon</label>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      className={`flex items-center justify-center p-3 rounded-lg border ${
                        habitData.icon.type === option.icon.type
                          ? 'bg-primary-100 border-primary-300'
                          : 'border-neutral-200 hover:border-primary-300'
                      }`}
                      onClick={() => setHabitData(prev => ({ ...prev, icon: option.icon }))}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {option.icon}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-neutral-700 font-medium mb-2">Frequency</label>
                <select
                  name="frequency"
                  value={habitData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              {habitData.frequency === 'weekly' && (
                <div className="mb-4">
                  <label className="block text-neutral-700 font-medium mb-2">Target (days per week)</label>
                  <select
                    name="target"
                    value={habitData.target}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
                >
                  <Plus size={20} />
                  <span>Add Habit</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddHabitModal;