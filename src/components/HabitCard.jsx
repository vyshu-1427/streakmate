import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isSameDay } from 'date-fns';
import { Flame, MoreVertical, Edit, Trash2, Check, AlertTriangle } from 'lucide-react';
import { useHabits } from '../hooks/useHabits.jsx';

function HabitCard({ habit, selectedDate }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { completeHabit, deleteHabit } = useHabits();
  
  const isToday = isSameDay(selectedDate, new Date());
  const isCompleted = habit.completedDates.some(date => 
    isSameDay(new Date(date), selectedDate)
  );
  
  // Progress calculation for weekly habits
  const weeklyProgress = habit.frequency === 'weekly' 
    ? Math.min((habit.completedDates.length / habit.target) * 100, 100) 
    : 0;
  
  // Function to handle completion
  const handleCompletion = () => {
    if (!isToday) return; // Only allow completion for today
    completeHabit(habit.id, selectedDate);
  };
  
  // Card variants for different states
  const cardVariants = {
    completed: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg",
    normal: "bg-white border-gray-100 shadow hover:shadow-lg transition-shadow duration-200"
  };
  
  return (
    <motion.div
      className={`habit-card border rounded-2xl p-6 ${isCompleted ? cardVariants.completed : cardVariants.normal}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 text-2xl ${
              isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-violet-100 text-violet-600'
            }`}
          >
            {habit.icon || <Flame size={24} />}
          </div>
          <div>
            <h3 className="font-bold text-xl leading-tight mb-1">{habit.name}</h3>
            <p className="text-sm text-gray-500 mb-1">
              {habit.frequency === 'daily' ? 'Daily' : `${habit.target}x per week`}
            </p>
            {habit.description && (
              <p className="text-xs text-gray-400 italic max-w-xs truncate">{habit.description}</p>
            )}
          </div>
        </div>
        
        {/* Menu */}
        <div className="relative">
          <button 
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={20} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg py-2 w-36 z-10">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <Edit size={16} className="mr-2" />
                <span>Edit</span>
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                onClick={() => { setShowConfirm(true); setShowMenu(false); }}
              >
                <Trash2 size={16} className="mr-2" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs flex flex-col items-center">
            <p className="mb-4 text-center text-gray-700">Are you sure you want to delete <span className="font-bold">{habit.name}</span>?</p>
            <div className="flex gap-2">
              <button className="btn bg-gray-100 text-gray-700" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn bg-red-500 text-white" onClick={() => { deleteHabit(habit.id); setShowConfirm(false); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Streak & Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
            <Flame size={16} />
            <span>{habit.streak} day streak</span>
          </div>
          {habit.frequency === 'weekly' && (
            <span className="text-xs text-gray-600">
              {habit.completedDates.length}/{habit.target} this week
            </span>
          )}
        </div>
        
        {habit.frequency === 'weekly' && (
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-2 bg-violet-400 rounded-full transition-all duration-300"
              style={{ width: `${weeklyProgress}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {/* Completion Button */}
      <button
        onClick={handleCompletion}
        disabled={!isToday || isCompleted}
        className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 mt-2 transition-all duration-200 ${
          isCompleted
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-default'
            : isToday
            ? 'bg-violet-600 text-white hover:bg-violet-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isCompleted ? (
          <>
            <Check size={18} />
            <span>Completed</span>
          </>
        ) : isToday ? (
          'Mark as Completed'
        ) : (
          <>
            <AlertTriangle size={18} />
            <span>Only for Today</span>
          </>
        )}
      </button>
    </motion.div>
  );
}

export default HabitCard;