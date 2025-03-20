import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="relative min-h-screen flex flex-col">


      {/* Overlay for Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />

        <div className="flex-grow w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <Sidebar />

            <main className="flex-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl p-8 text-white"
              >
                {/* Background Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                >
                  <source src="/videos/cp-2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Darker Overlay */}
                <div className="absolute inset-0  bg-opacity-70 -z-10"></div>

                {/* Content */}
                <h1 className="text-3xl font-bold mb-4">Welcome to NicheCommunity</h1>
                <p className="text-lg opacity-90">Discover and join communities that match your interests.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-4 py-2 bg-gray-100 text-purple-900 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Explore Communities
                </motion.button>
              </motion.div>

              <Carousel />
              <TrendingTopics />

              {/* Filter Buttons */}
              <div className="bg-gray-900 text-white rounded-xl p-4 shadow-sm">
                <div className="flex space-x-4">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${selectedFilter === filter.id
                        ? 'bg-purple-100 text-purple-600'
                        : 'hover:bg-gray-100 hover:text-black'
                        }`}
                    >
                      <filter.icon className="h-5 w-5" />
                      <span>{filter.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed Posts */}
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

              <Testimonials />
            </main>

            {/* Right Sidebar */}
            <aside className="hidden xl:block w-80 space-y-6">
              <div className="bg-gray-900 rounded-xl p-6 ">
                <div className="relative w-fit mx-auto">
                  <h2 className="text-xl text-white font-bold text-center mb-6 pb-6 relative">
                    Recomended Communities
                  </h2>
                  <svg
                    className="absolute left-0 bottom-0 w-full h-6"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                  >
                    <path fill="#5A4FCF" fillOpacity="1" d="M0,256L48,234.7C96,213,192,171,288,154.7C384,139,480,149,576,170.7C672,192,768,224,864,240C960,256,1056,256,1152,250.7C1248,245,1344,235,1392,229.3L1440,224V320H0Z"></path>
                  </svg>
                </div>
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

              <div className="bg-white rounded-xl p-6 shadow-xl">
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
    </div>
  );
}

export default Home;
