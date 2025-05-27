import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Book, Dumbbell, Coffee, FileText, Brain, Plus } from 'lucide-react';
import { useHabits } from '../hooks/useHabits.jsx';

function AddHabitModal({ isOpen, onClose }) {
  const [habitData, setHabitData] = useState({
    name: '',
    description: '',
    frequency: 'daily',
    target: 1,
    icon: <Flame />,
  });
  
  const { addHabit } = useHabits();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    addHabit({
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
  
  // Icon options
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            className="w-full max-w-lg bg-white rounded-xl shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold">Add New Habit</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Habit Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={habitData.name}
                  onChange={handleChange}
                  placeholder="e.g., Morning Meditation"
                  className="input"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={habitData.description}
                  onChange={handleChange}
                  placeholder="Why do you want to build this habit?"
                  className="input resize-none h-24"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`flex items-center justify-center p-3 rounded-lg border ${
                        habitData.icon.type === option.icon.type
                          ? 'bg-violet-100 border-violet-300'
                          : 'border-gray-200 hover:border-violet-300'
                      }`}
                      onClick={() => setHabitData(prev => ({ ...prev, icon: option.icon }))}
                    >
                      {option.icon}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Frequency
                </label>
                <select
                  name="frequency"
                  value={habitData.frequency}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              
              {habitData.frequency === 'weekly' && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Target (days per week)
                  </label>
                  <select
                    name="target"
                    value={habitData.target}
                    onChange={handleChange}
                    className="input"
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
                  className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus size={20} />
                  <span>Add Habit</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default AddHabitModal;