import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { BellIcon, ChatBubbleLeftIcon, FireIcon, ArrowTrendingUpIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import CommunityCard from '../components/communityCard';
import FeedPost from '../components/feedPost';
import TrendingTopics from '../components/trendingTopic';
import OnboardingModal from '../components/onBoardingModal';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import Testimonials from '../components/testimonials';

function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('trending');

  const filters = [
    { id: 'trending', name: 'Trending', icon: FireIcon },
    { id: 'latest', name: 'Latest', icon: ArrowTrendingUpIcon },
    { id: 'following', name: 'Following', icon: UserGroupIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <Sidebar />
          <main className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white"
            >
              <h1 className="text-3xl font-bold mb-4">Welcome to NicheCommunity</h1>
              <p className="text-lg opacity-90">Discover and join communities that match your interests.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Explore Communities
              </motion.button>
            </motion.div>

            <TrendingTopics />

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex space-x-4">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      selectedFilter === filter.id
                        ? 'bg-purple-100 text-purple-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <filter.icon className="h-5 w-5" />
                    <span>{filter.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <FeedPost
                title="Getting Started with Web Development in 2025"
                author={{
                  name: "Sarah Johnson",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                }}
                community="Web Development"
                content="Here's my comprehensive guide for beginners..."
                votes={234}
                comments={45}
              />
              <FeedPost
                title="The Future of AI in Healthcare"
                author={{
                  name: "Dr. Michael Chen",
                  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                }}
                community="AI & Technology"
                content="Recent breakthroughs in medical AI..."
                votes={567}
                comments={89}
              />
            </div>

            {/* New Additions */}
            <Carousel />
            <Testimonials />
          </main>

          <aside className="hidden xl:block w-80 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recommended Communities</h2>
              <div className="space-y-4">
                <CommunityCard
                  name="Tech Innovators"
                  members={12543}
                  description="A community for tech enthusiasts and innovators"
                  image="https://api.dicebear.com/7.x/identicon/svg?seed=tech"
                />
                <CommunityCard
                  name="Digital Artists"
                  members={8976}
                  description="Share and discuss digital art and techniques"
                  image="https://api.dicebear.com/7.x/identicon/svg?seed=art"
                />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Active Discussions</h2>
              <div className="space-y-4">
                {/* Add active discussions here */}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      <AnimatePresence>
        {showOnboarding && (
          <OnboardingModal onClose={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
