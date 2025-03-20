import React from 'react';
import { motion } from 'framer-motion';
import { BellIcon, ChatBubbleLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function Header() {
  return (
    <header className="bg-gray-900  border-amber-100 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <div className=" flex items-center cursor-pointer" onClick={() => navigate('/')}>
                <img src='/CWP-3.png' alt='Logo' className='w-15 h-15 object-contain' />
                <span className='text-white text-2xl font-semibold ml-1'>𝓣𝖍𝖗𝖊𝖆𝖉𝖎𝖋y</span>
            </div>
            
          </motion.div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search communities, topics, or posts..."
                className="w-full bg-gray-300 px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center  space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-200 hover:text-purple-600 relative"
            >
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-200 hover:text-purple-600"
            >
              <ChatBubbleLeftIcon className="h-6 w-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 p-2 text-gray-200 hover:text-purple-600"
            >
              <UserCircleIcon className="h-6 w-6" />
              <span>Profile</span>
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;