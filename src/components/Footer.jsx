import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src="/logo.jpg" alt="StreakMates" className="h-8 w-8 mr-2 rounded" />
              <span className="font-bold text-lg flex items-center">StreakMates <span className="ml-1 text-xl">🔥</span></span>
            </Link>
            <p className="text-gray-600 mb-4">
              Build better habits together. Track your progress, join accountability circles, and achieve your goals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-violet-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-600 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Testimonials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-violet-600">FAQ</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-violet-600">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Press</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-violet-600">Data Processing</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} StreakMates. All rights reserved.
          </p>
          <p className="text-gray-600 flex items-center mt-4 md:mt-0">
            Made with <Heart size={16} className="text-red-500 mx-1" /> for better habits
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;