import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { Camera, Edit, Save, Award, BarChart2 } from 'lucide-react';
import { useHabits } from '../hooks/useHabits.jsx';

function Profile() {
  const { user, updateUser } = useAuth();
  const { habits, streakCount, longestStreak } = useHabits();
  
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || 'No bio yet',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(profileData);
    setEditing(false);
  };
  
  // Calculate level progress
  const levelProgress = user ? (user.xp / user.totalXp) * 100 : 0;
  
  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and view your progress</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            className="col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="card">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-t-xl -mt-6 mx-[-24px]" style={{ height: '120px' }} />
                <div className="relative text-center">
                  <div className="relative inline-block">
                    {/* <img 
                      src={user?.avatar || 'https://i.pravatar.cc/150?img=1'} 
                      alt={user?.name} 
                      className="w-24 h-24 rounded-full border-4 border-white mx-auto"
                    /> */}
                    <button className="absolute bottom-0 right-0 bg-violet-600 text-white p-1.5 rounded-full hover:bg-violet-700 transition-colors">
                      <Camera size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {editing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      className="input resize-none h-24"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      onClick={() => setEditing(false)}
                      className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 mr-2"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary flex items-center gap-1"
                    >
                      <Save size={18} />
                      <span>Save</span>
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold mb-1">{user?.name || 'User'}</h2>
                    <p className="text-gray-600 mb-2">{profileData.bio}</p>
                    <div className="inline-flex items-center text-sm text-gray-500">
                      <span>Joined {user?.joinedDate ? format(new Date(user.joinedDate), 'MMM yyyy') : 'Recently'}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Level {user?.level || 1}</span>
                      <span className="text-sm text-gray-600">{user?.xp || 0}/{user?.totalXp || 100} XP</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${levelProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setEditing(true)}
                    className="btn-outline w-full flex items-center justify-center gap-1"
                  >
                    <Edit size={18} />
                    <span>Edit Profile</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
          
          {/* Stats and Badges */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card mb-6">
              <div className="flex items-center mb-4">
                <BarChart2 size={24} className="text-violet-600 mr-2" />
                <h2 className="text-xl font-bold">Stats Overview</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Active Habits', value: habits.length },
                  { title: 'Current Streak', value: `${streakCount} days` },
                  { title: 'Longest Streak', value: `${longestStreak} days` },
                  { title: 'Habits Completed', value: '53' },
                  { title: 'Completion Rate', value: '87%' },
                  { title: 'Weekly Goal', value: '5/7 days' },
                ].map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <Award size={24} className="text-amber-500 mr-2" />
                <h2 className="text-xl font-bold">Your Badges</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(user?.badges || ['Newcomer']).map((badge, index) => (
                  <div key={index} className="flex flex-col items-center bg-gray-50 rounded-lg p-4">
                    <div className="bg-amber-100 p-3 rounded-full mb-2">
                      <Award size={24} className="text-amber-500" />
                    </div>
                    <p className="font-medium text-center">{badge}</p>
                  </div>
                ))}
                
                {/* Locked badges */}
                {['30-Day Master', 'Night Owl', 'Weekend Warrior'].map((badge, index) => (
                  <div key={`locked-${index}`} className="flex flex-col items-center bg-gray-50 rounded-lg p-4 opacity-50">
                    <div className="bg-gray-200 p-3 rounded-full mb-2">
                      <Award size={24} className="text-gray-400" />
                    </div>
                    <p className="font-medium text-center">{badge}</p>
                    <span className="text-xs text-gray-500">Locked</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;