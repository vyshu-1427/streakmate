import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import './App.css';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import HabitCircles from './pages/HabitCircles';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import AppProvider from './components/AppProvider';

function App() {
  const { loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AppProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/circles" element={<HabitCircles />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
