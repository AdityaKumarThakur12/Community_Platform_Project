import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon 
} from '@heroicons/react/24/outline';

function FeedPost({ title, author, community, content, votes, comments }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Voting Section */}
      <div className="flex">
        <div className="flex flex-col items-center px-4 py-6 border-r border-gray-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-purple-600"
          >
            <ArrowUpIcon className="h-6 w-6" />
          </motion.button>
          <span className="my-2 font-medium text-gray-700">{votes}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-purple-600"
          >
            <ArrowDownIcon className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-600">Posted by {author.name}</span>
            <span className="text-sm text-gray-400">in</span>
            <span className="text-sm font-medium text-purple-600">{community}</span>
          </div>

          <h2 className="text-xl font-semibold mb-3">{title}</h2>
          <p className="text-gray-600">{content}</p>

          {/* Actions */}
          <div className="flex items-center space-x-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-500 hover:text-purple-600"
            >
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span>{comments} Comments</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-500 hover:text-purple-600"
            >
              <ShareIcon className="h-5 w-5" />
              <span>Share</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FeedPost;