import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Clock, Trophy, Users, Sparkles, ArrowRight, Flame, Star, Target, BarChart, Users2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -100]);

  const features = [
    {
      icon: <Clock size={24} className="text-purple-500" />,
      title: 'Track Your Habits',
      description: 'Create and monitor daily habits with ease. Mark tasks complete to build unstoppable streaks.',
    },
    {
      icon: <Users size={24} className="text-pink-500" />,
      title: 'Join Habit Circles',
      description: 'Stay accountable with friends or communities in public or private groups.',
    },
    {
      icon: <Trophy size={24} className="text-yellow-400" />,
      title: 'Earn Rewards',
      description: 'Unlock badges, level up, and celebrate milestones as you grow.',
    },
  ];

  const testimonials = [
    { name: 'Alex J.', quote: 'StreakMates transformed my routine!', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Samantha L.', quote: 'Badges make habit-building fun!', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Michael C.', quote: 'Circles keep me accountable.', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center relative overflow-hidden">
      <div className="inset-0 bg-black/20"></div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 flex-1 flex items-center z-10">
        {/* <motion.div className="absolute w-96 h-96 bg-purple-400/30 rounded-full blur-2xl top-10 left-10 z-0" style={{ y: parallaxY }} />
        <motion.div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl bottom-0 right-0 z-0" style={{ y: parallaxY }} /> */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <motion.div
              className="max-w-2xl text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 mb-6">
                Build Habits, <span className="text-black">Together</span>
              </h1>
              <p className="text-base sm:text-lg text-black-100 mb-8 max-w-xl mx-auto lg:mx-0 drop-shadow">
                StreakMates empowers you to track habits, build streaks, and grow with accountability circles. Start your transformation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to={isAuthenticated ? '/dashboard' : '/signup'}
                  className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-6 py-3 rounded-xl font-bold text-base hover:scale-105 transition-transform shadow-xl"
                  aria-label={isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
                </Link>
                <Link
                  to={isAuthenticated ? '/circles' : '/login'}
                  className="border border-white/50 text-gray px-6 py-3 rounded-xl font-bold text-base hover:bg-white/20 transition-colors shadow-xl"
                  aria-label={isAuthenticated ? 'Join a Circle' : 'Login'}
                >
                  {isAuthenticated ? 'Join a Circle' : 'Login'}
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="max-w-md relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ rotateX: 5, rotateY: 5, scale: 1.05 }}
            >
              <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-white/30 transform-gpu">
                <img
                  src="image.jpg"
                  alt="Habit tracking dashboard"
                  className="w-auto h-auto object-cover rounded-lg shadow-inner"
                  loading="lazy"
                />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-100">Your habit dashboard</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Flame size={16} className="text-yellow-400" />
                    <span className="text-sm font-bold text-white">10-day streak</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About StreakMates Section */}
      <section className="py-16 bg-white/90 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900">
              About StreakMates
            </h2>
            <p className="text-base text-neutral-600 mt-2 max-w-2xl mx-auto">
              Learn how StreakMates helps you build lasting habits with community and gamification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Our Mission</h3>
              <p className="text-sm text-neutral-600 mb-4">
                StreakMates is dedicated to making habit-building fun, social, and rewarding. We combine tracking, accountability, and gamification to help you achieve your goals.
              </p>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">What We Offer</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <Target size={16} className="text-primary-600" />
                  Track habits and visualize streaks.
                </li>
                <li className="flex items-center gap-2">
                  <Users2 size={16} className="text-primary-600" />
                  Join accountability circles.
                </li>
                <li className="flex items-center gap-2">
                  <BarChart size={16} className="text-primary-600" />
                  Monitor progress with dashboards.
                </li>
                <li className="flex items-center gap-2">
                  <Trophy size={16} className="text-primary-600" />
                  Earn badges and level up.
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ rotateX: 5, rotateY: 5 }}
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-1 shadow-2xl transform-gpu">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Habit circle community"
                  className="w-full h-64 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-neutral-50 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900">
              Why StreakMates?
            </h2>
            <p className="text-base text-neutral-600 mt-2 max-w-2xl mx-auto">
              Powerful features to keep you motivated and consistent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/30 transform-gpu"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ rotateX: 5, rotateY: 5, scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                </div>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white/90 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900">
              Hear from Our Community
            </h2>
            <p className="text-base text-neutral-600 mt-2 max-w-2xl mx-auto">
              Thousands are transforming their lives with StreakMates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-2xl border border-neutral-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name}'s avatar`}
                    className="w-12 h-12 rounded-full border border-neutral-200"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 italic">“{testimonial.quote}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Ignite Your Journey Today
            </h2>
            <p className="text-base text-white/90 mb-6 max-w-xl mx-auto">
              Join StreakMates and start building habits that last.
            </p>
            <Link
              to={isAuthenticated ? '/dashboard' : '/signup'}
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold text-base hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center gap-2"
              aria-label={isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
            >
              <Sparkles size={18} />
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;