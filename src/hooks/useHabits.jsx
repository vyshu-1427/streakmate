import { useState, useEffect, createContext, useContext } from 'react';
import { isSameDay, startOfToday, subDays } from 'date-fns';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; 
// Sample data for demonstration
const DEMO_HABITS = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: 'Meditate for 10 minutes after waking up',
    frequency: 'daily',
    streak: 7,
    completedDates: [
      '2023-12-09',
      '2023-12-10',
      '2023-12-11',
      '2023-12-12',
      '2023-12-13',
      '2023-12-14',
      new Date().toISOString().split('T')[0],
    ],
  },
  {
    id: '2',
    name: 'Read a book',
    description: 'Read at least 20 pages',
    frequency: 'daily',
    streak: 3,
    completedDates: [
      '2023-12-11',
      '2023-12-12',
      '2023-12-13',
      '2023-12-14',
      new Date().toISOString().split('T')[0],
    ],
  },
  {
    id: '3',
    name: 'Exercise',
    description: 'Workout for at least 30 minutes',
    frequency: 'weekly',
    target: 4,
    streak: 2,
    completedDates: [
      '2023-12-10',
      '2023-12-12',
      '2023-12-14',
    ],
  }
];

// Create context
const HabitsContext = createContext();

// Provider component
export function HabitsProvider({ children }) {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load habits from localStorage
  useEffect(() => {
    setLoading(true);
    
    if (user) {
      const storedHabits = localStorage.getItem(`streakmates-habits-${user.id}`);
      
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      } else {
        // Use demo habits for new users
        setHabits(DEMO_HABITS);
        localStorage.setItem(`streakmates-habits-${user.id}`, JSON.stringify(DEMO_HABITS));
      }
    } else {
      setHabits([]);
    }
    
    setLoading(false);
  }, [user]);
  
  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (user && !loading) {
      localStorage.setItem(`streakmates-habits-${user.id}`, JSON.stringify(habits));
    }
  }, [habits, user, loading]);
  
  // Add a new habit
  const addHabit = (habit) => {
    setHabits(prev => [...prev, habit]);
    toast.success('Habit added successfully!');
  };
  
  // Complete a habit for a specific date
  const completeHabit = (habitId, date) => {
    setHabits(prev => 
      prev.map(habit => {
        if (habit.id === habitId) {
          // Convert date to string format
          const dateStr = date.toISOString().split('T')[0];
          
          // Check if already completed
          if (habit.completedDates.includes(dateStr)) {
            return habit;
          }
          
          // Add completion and update streak
          const yesterday = subDays(date, 1).toISOString().split('T')[0];
          const hasYesterdayCompletion = habit.completedDates.includes(yesterday);
          
          return {
            ...habit,
            completedDates: [...habit.completedDates, dateStr],
            streak: hasYesterdayCompletion ? habit.streak + 1 : 1,
          };
        }
        return habit;
      })
    );
    
    toast.success('Habit marked as completed!');
  };
  
  // Delete a habit
  const deleteHabit = (habitId) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    toast.success('Habit deleted successfully!');
  };
  
  // Calculate stats
  const completedToday = habits.filter(habit => 
    habit.completedDates.some(date => 
      isSameDay(new Date(date), startOfToday())
    )
  ).length;
  
  const streakCount = habits.length > 0 
    ? Math.max(...habits.map(habit => habit.streak))
    : 0;
  
  const longestStreak = habits.length > 0
    ? Math.max(...habits.map(habit => habit.streak))
    : 0;
  
  return (
    <HabitsContext.Provider
      value={{
        habits,
        loading,
        addHabit,
        completeHabit,
        deleteHabit,
        completedToday,
        streakCount,
        longestStreak,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
}

// Custom hook to use the context
export function useHabits() {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
}