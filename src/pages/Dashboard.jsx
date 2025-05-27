import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, ListChecks, Flame, Calendar, Trophy, EyeOff, Clock } from 'lucide-react';
import HabitCard from "../components/HabitCard";
import AddHabitModal from '../components/AddHabitModal';
import { format } from 'date-fns';
import { useHabits } from '../hooks/useHabits.jsx';

function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { habits, completedToday, streakCount, longestStreak, loading } = useHabits();
  
  // Generate dates for the calendar strip
  const getDates = () => {
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-2 md:px-8 bg-gradient-to-br from-violet-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Dashboard Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-2 text-4xl md:text-5xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-lg">
            {format(new Date(), "EEEE, MMMM d, yyyy")} · Track your habits and build consistency
          </p>
        </motion.div>
        
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            {
              title: "Today's Progress",
              value: habits.length > 0 ? `${completedToday}/${habits.length}` : "0/0",
              icon: <ListChecks size={28} className="text-violet-500" />,
              color: "bg-violet-50 text-violet-700 border-violet-100",
            },
            {
              title: "Current Streak",
              value: `${streakCount} days`,
              icon: <Flame size={28} className="text-amber-500" />,
              color: "bg-amber-50 text-amber-700 border-amber-100",
            },
            {
              title: "Longest Streak",
              value: `${longestStreak} days`,
              icon: <Trophy size={28} className="text-cyan-500" />,
              color: "bg-cyan-50 text-cyan-700 border-cyan-100",
            },
            {
              title: "Active Habits",
              value: habits.length,
              icon: <Clock size={28} className="text-emerald-500" />,
              color: "bg-emerald-50 text-emerald-700 border-emerald-100",
            }
          ].map((stat, index) => (
            <div key={index} className={`rounded-2xl p-6 border shadow-sm flex flex-col gap-2 ${stat.color}`}>
              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <div className="rounded-full p-2 bg-white/70">
                  {stat.icon}
                </div>
              </div>
              <p className="text-3xl font-extrabold">{stat.value}</p>
            </div>
          ))}
        </motion.div>
        
        {/* Date Selector */}
        <motion.div
          className="mb-10 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex gap-2">
            {getDates().map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-16 transition-all font-semibold border-2 ${
                    isSelected
                      ? 'bg-violet-600 text-white border-violet-600 shadow-lg'
                      : isToday
                      ? 'bg-violet-100 text-violet-700 border-violet-200'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  <span className="text-xs uppercase tracking-wide">{format(date, 'EEE')}</span>
                  <span className="text-xl font-bold">{format(date, 'd')}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
        
        {/* Habits Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Habits</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <PlusCircle size={22} />
            <span>Add Habit</span>
          </button>
        </div>
        
        {habits.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <EyeOff size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
            <p className="text-gray-600 mb-4">Start tracking your first habit by clicking the button above</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <PlusCircle size={20} />
              <span>Add Your First Habit</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {habits.map((habit, index) => (
              <HabitCard key={habit.id} habit={habit} selectedDate={selectedDate} />
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Add Habit Modal */}
      <AddHabitModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}

export default Dashboard;