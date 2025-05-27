import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, LayoutDashboard, Activity, Settings } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle closing the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('#main-menu') && !e.target.closest('#menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center">
          {/* Logo */}
            <Link to="/" className="flex items-center mb-4">
              {/* <img src="/logo.jpg" alt="StreakMates" className="h-8 w-8 mr-2 rounded" /> */}
              <span className="font-bold text-lg flex items-center">StreakMates <span className="ml-1 text-xl">🔥</span></span>
            </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-violet-600 font-medium ${
                location.pathname === '/' && 'text-violet-600'
              }`}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-gray-700 hover:text-violet-600 font-medium ${
                    location.pathname === '/dashboard' && 'text-violet-600'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/circles"
                  className={`text-gray-700 hover:text-violet-600 font-medium ${
                    location.pathname === '/circles' && 'text-violet-600'
                  }`}
                >
                  Circles
                </Link>
                
                {/* User menu */}
                <div className="relative">
                  <button
                    id="menu-button"
                    className="flex items-center gap-2 text-gray-700 hover:text-violet-600 font-medium"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {/* <img 
                      src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full border-2 border-violet-200"
                    /> */}
                    <span className="hidden lg:block">{user?.name || 'User'}</span>
                  </button>
                  
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        id="main-menu"
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                        >
                          <User size={18} />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600"
                        >
                          <LayoutDashboard size={18} />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={logout}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 w-full text-left"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            id="menu-button"
            className="md:hidden text-gray-700 hover:text-violet-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="main-menu"
            className="md:hidden bg-white border-t fixed inset-x-0 top-[57px] z-30 overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded"
                >
                  Home
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <div className="border-t border-gray-100 pt-4 mb-2 px-4">
                      <div className="flex items-center">
                        {/* <img 
                          src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                          alt="Profile" 
                          className="h-10 w-10 rounded-full border-2 border-violet-200 mr-3"
                        /> */}
                        <div>
                          <p className="font-medium">{user?.name || 'User'}</p>
                          <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded"
                    >
                      <LayoutDashboard size={18} />
                      <span>Dashboard</span>
                    </Link>
                    
                    <Link
                      to="/circles"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded"
                    >
                      <Activity size={18} />
                      <span>Habit Circles</span>
                    </Link>
                    
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded"
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </Link>
                    
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded text-left"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary flex justify-center mx-4"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
