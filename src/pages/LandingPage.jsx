import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Clock, Trophy, Users, BrainCircuit, Sparkles, ArrowRight, Flame } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col landing-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40 flex-1 flex items-center justify-center">
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0 pointer-events-none"></div>
        {/* Background elements */}
        <div className="circle-bg w-96 h-96 bg-violet-400 left-[10%] top-[20%] opacity-30 blur-2xl absolute z-10"></div>
        <div className="circle-bg w-72 h-72 bg-cyan-400 right-[5%] bottom-[30%] opacity-30 blur-2xl absolute z-10"></div>
        
        <div className="container mx-auto px-6 relative z-20 animate-fadein">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 w-full">
            <motion.div 
              className="max-w-2xl w-full bg-black bg-opacity-40 rounded-xl p-8 shadow-lg mx-auto"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* <img src="/logo.jpg" alt="StreakMates Logo" className="h-16 w-16 mx-auto mb-4 rounded shadow-lg bg-white/80 p-1" /> */}
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 drop-shadow-lg">
                Build good habits, <span className="text-white bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">together</span>.
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8 drop-shadow">
                Track your habits, build streaks, and join accountability circles with friends. StreakMates helps you stay consistent with your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn-primary text-lg py-3 px-6 shadow-xl">
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
                </Link>
                <Link to={isAuthenticated ? "/circles" : "/login"} className="btn-outline text-lg py-3 px-6 shadow-xl">
                  {isAuthenticated ? 'Join a Circle' : 'Login'}
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {/* User avatars can be added here */}
                </div>
                {/* <p className="text-sm text-gray-200">
                  <span className="font-semibold text-yellow-300">5,000+</span> people building habits
                </p> */}
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative card-3d">
                {/* Image and streak information */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      {/* Add features section here */}
      
      {/* CTA Section */}
      {/* Add call-to-action section here */}
      
      <Footer />
    </div>
  );
}

export default LandingPage;
