import React from 'react';
import { motion } from 'framer-motion';
import { FireIcon } from '@heroicons/react/24/outline';

function TrendingTopics() {
  const topics = [
    { name: 'Web3 Development', posts: 234, trending: true },
    { name: 'AI Ethics', posts: 189 },
    { name: 'Remote Work', posts: 156 },
    { name: 'Sustainable Tech', posts: 134 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full ${
                topic.trending
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                {topic.trending && <FireIcon className="h-4 w-4 text-purple-600" />}
                <span>{topic.name}</span>
                <span className="text-sm opacity-75">({topic.posts})</span>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TrendingTopics;