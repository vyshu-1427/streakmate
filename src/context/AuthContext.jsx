import { createContext, useState, useContext, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Mock user data - would come from API in a real app
const DEMO_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=1',
    level: 12,
    xp: 750,
    totalXp: 1000,
    joinedDate: '2023-10-15',
    badges: ['Early Bird', '7-Day Champ', 'Consistency Master'],
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load user from localStorage
  const loadUser = useCallback(() => {
    setLoading(true);
    const storedUser = localStorage.getItem('streakmates-user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);
  
  // Login
  const login = useCallback((email, password) => {
    if (!email || !password) {
      toast.error('Please provide email and password');
      return false;
    }
    
    // Find user
    const foundUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      toast.error('Invalid credentials');
      return false;
    }
    
    // Create user object (without password)
    const { password: _, ...userWithoutPassword } = foundUser;
    
    // Store in localStorage
    localStorage.setItem('streakmates-user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    
    toast.success('Login successful!');
    return true;
  }, []);
  
  // Register
  const register = useCallback((name, email, password) => {
    if (!name || !email || !password) {
      toast.error('Please fill all fields');
      return false;
    }
    
    // Check if user already exists
    if (DEMO_USERS.some((u) => u.email === email)) {
      toast.error('User already exists');
      return false;
    }
    
    // In a real app, this would be an API call
    // For demo, we'll just pretend to create a user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      // Don't store the password in state, just for demo
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      level: 1,
      xp: 0,
      totalXp: 100,
      joinedDate: new Date().toISOString().split('T')[0],
      badges: ['Newcomer'],
    };
    
    // Store in localStorage 
    localStorage.setItem('streakmates-user', JSON.stringify(newUser));
    setUser(newUser);
    
    toast.success('Registration successful!');
    return true;
  }, []);
  
  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('streakmates-user');
    setUser(null);
    toast.success('Logged out successfully');
  }, []);
  
  // Update user
  const updateUser = useCallback((updatedData) => {
    if (!user) return false;
    
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('streakmates-user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast.success('Profile updated successfully');
    return true;
  }, [user]);
  
  // Check if user is authenticated
  const isAuthenticated = useMemo(() => !!user, [user]);
  
  // Context value
  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated,
      loadUser,
    }),
    [user, loading, login, register, logout, updateUser, isAuthenticated, loadUser]
  );
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};