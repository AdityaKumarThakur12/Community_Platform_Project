import React from 'react';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  UserGroupIcon, 
  BookmarkIcon, 
  CalendarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

function Sidebar() {
  const menuItems = [
    { icon: HomeIcon, label: 'Home', active: true },
    { icon: UserGroupIcon, label: 'My Communities' },
    { icon: BookmarkIcon, label: 'Saved' },
    { icon: CalendarIcon, label: 'Events' },
    { icon: ChatBubbleLeftRightIcon, label: 'Messages' },
  ];

  return (
    <aside className="w-64 hidden md:block">
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.a
            key={item.label}
            href="#"
            whileHover={{ x: 5 }}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              item.active 
                ? 'bg-purple-100 text-purple-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="font-medium">{item.label}</span>
          </motion.a>
        ))}
      </nav>

      {/* Create Post Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium shadow-lg hover:bg-purple-700 transition-colors"
      >
        Create Post
      </motion.button>

      {/* My Communities Section */}
      <div className="mt-8">
        <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
          My Communities
        </h3>
        <div className="mt-4 space-y-2">
          {['Web Development', 'AI & Technology', 'Digital Art'].map((community) => (
            <motion.a
              key={community}
              href="#"
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
              <span>{community}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;