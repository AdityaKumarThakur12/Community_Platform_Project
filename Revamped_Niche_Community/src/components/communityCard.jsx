import React from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon } from '@heroicons/react/24/outline';

function CommunityCard({ name, members, description, image }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 shadow-md shadow-blue-300 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="h-24 bg-gradient-to-r from-purple-400 to-pink-400" />
      <div className="p-4">
        <div className="flex items-start">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full border-4 border-white -mt-12"
          />
          <div className="ml-4 -mt-2">
            <h3 className="text-lg font-semibold text-gray-200">{name}</h3>
            <div className="flex items-center text-sm text-gray-400">
              <UserGroupIcon className="h-4 w-4 mr-1" />
              {members.toLocaleString()} members
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-400">{description}</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Join Community
        </motion.button>
      </div>
    </motion.div>
  );
}

export default CommunityCard;