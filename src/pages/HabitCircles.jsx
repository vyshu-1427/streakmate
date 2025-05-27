import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Users, Search, Info, UserPlus, Lock, Globe, User } from 'lucide-react';

function HabitCircles() {
  const [activeTab, setActiveTab] = useState('myCircles');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Mock data for circles
  const myCircles = [
    {
      id: 1,
      name: 'Morning Routine Masters',
      members: 8,
      habits: ['Morning Meditation', 'Workout', 'Journaling'],
      privacy: 'private',
      // image: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      name: 'Fitness Buddies',
      members: 12,
      habits: ['Daily Exercise', 'Protein Intake', 'Step Count'],
      privacy: 'public',
      // image: 'https://images.pexels.com/photos/6550873/pexels-photo-6550873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];
  
  const discoverCircles = [
    {
      id: 3,
      name: 'Coding Daily',
      members: 24,
      habits: ['Code for 1 hour', 'Read tech article', 'Solve algorithm'],
      privacy: 'public',
      // image: 'https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      name: 'Mindfulness Group',
      members: 18,
      habits: ['Meditation', 'Gratitude Journal', 'Digital Detox'],
      privacy: 'public',
      // image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 5,
      name: 'Book Worms',
      members: 32,
      habits: ['Read 30 min', 'Book Summary', 'New Vocabulary'],
      privacy: 'public',
      // image: 'https://images.pexels.com/photos/3765035/pexels-photo-3765035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];
  
  const CircleCard = ({ circle }) => {
    return (
      <div className="card overflow-hidden hover:shadow-xl transition-all">
        <div className="h-40 overflow-hidden">
          <img 
            src={circle.image} 
            alt={circle.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">{circle.name}</h3>
            <div className="flex items-center">
              {circle.privacy === 'private' ? (
                <Lock size={16} className="text-gray-600" />
              ) : (
                <Globe size={16} className="text-gray-600" />
              )}
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-4">
            <Users size={16} className="mr-1" />
            <span className="text-sm">{circle.members} members</span>
          </div>
          
          <p className="text-sm mb-4">
            Focused on: {circle.habits.join(', ')}
          </p>
          
          <button className={`btn w-full ${activeTab === 'myCircles' ? 'btn-secondary' : 'btn-primary'}`}>
            {activeTab === 'myCircles' ? 'View Circle' : 'Join Circle'}
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="mb-2">Habit Circles</h1>
              <p className="text-gray-600">Join accountability groups and build habits together</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <PlusCircle size={20} />
              <span>Create Circle</span>
            </button>
          </div>
        </motion.div>
        
        {/* Search and Filter */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search circles..."
                className="input pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select className="input max-w-xs">
                <option>All Categories</option>
                <option>Fitness</option>
                <option>Mindfulness</option>
                <option>Learning</option>
                <option>Productivity</option>
              </select>
            </div>
          </div>
        </motion.div>
        
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              className={`pb-4 px-1 font-medium ${
                activeTab === 'myCircles'
                  ? 'text-violet-600 border-b-2 border-violet-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('myCircles')}
            >
              My Circles
            </button>
            <button
              className={`pb-4 px-1 font-medium ${
                activeTab === 'discover'
                  ? 'text-violet-600 border-b-2 border-violet-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('discover')}
            >
              Discover
            </button>
          </div>
        </div>
        
        {/* Circles Grid */}
        {activeTab === 'myCircles' && myCircles.length === 0 ? (
          <motion.div
            className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No circles yet</h3>
            <p className="text-gray-600 mb-4">Join or create your first habit circle</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <PlusCircle size={20} />
                <span>Create Circle</span>
              </button>
              <button
                onClick={() => setActiveTab('discover')}
                className="btn-outline inline-flex items-center gap-2"
              >
                <Search size={20} />
                <span>Discover Circles</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {(activeTab === 'myCircles' ? myCircles : discoverCircles).map((circle) => (
              <CircleCard key={circle.id} circle={circle} />
            ))}
          </motion.div>
        )}
        
        {/* Create Circle Modal (Simplified) */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div 
              className="bg-white rounded-xl max-w-md w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Create New Circle</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Circle Name</label>
                    <input type="text" className="input" placeholder="e.g., Morning Routine Masters" />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="input resize-none h-24" placeholder="What is this circle about?"></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Privacy</label>
                    <select className="input">
                      <option value="public">Public - Anyone can join</option>
                      <option value="private">Private - Invitation only</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Create Circle
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HabitCircles;