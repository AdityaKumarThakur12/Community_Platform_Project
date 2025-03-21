import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import { BellIcon, ChatBubbleLeftIcon, FireIcon, ArrowTrendingUpIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import FeedPost from '../components/feedPost';
import TrendingTopics from '../components/trendingTopic';
import OnboardingModal from '../components/onBoardingModal';
import Footer from '../components/footer';
import Carousel from '../components/carousel';
import Testimonials from '../components/testimonials';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('trending');
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://finanace-5dc1c-default-rtdb.asia-southeast1.firebasedatabase.app/communities.json")
      .then((response) => {
        if (response.data) {
          const fetchedCommunities = Object.keys(response.data).map((key) => ({
            id: key, // Ensure ID is correctly assigned
            ...response.data[key],
          }));
          setCommunities(fetchedCommunities);
        }
      })
      .catch((error) => console.error("Error fetching communities:", error));
  }, []);

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

            <main className="flex-1 space-y-8 overflow-hidden">
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
                <h1 className="text-3xl font-bold mb-4">Welcome to Threadify</h1>
                <p className="text-lg opacity-90">Discover and join communities that match your interests.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/createCommunity')}
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
                <FeedPost />
              </div>

              <Testimonials />
            </main>

            {/* Right Sidebar */}
            <aside className="hidden xl:block w-80 space-y-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-xl text-white font-bold text-center mb-6 pb-6 relative">
                  Recommended Communities
                </h2>
                <div className="space-y-4">
                  {communities.slice(0, 2).map((community) => ( // Show only 2 communities
                    <div
                      key={community.id}
                      className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => navigate(`/community/${community.id}`)}
                    >
                      <img
                        src={community.coverImage || 'https://via.placeholder.com/150'} // Fallback to placeholder image
                        alt={community.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold text-white">{community.name}</h3>
                      <p className="text-sm text-gray-400">{community.description}</p>
                      <div className='flex items-center'>
                        <Users className="w-5 h-5 mr-2 mt-1 text-white" />
                        <p className="text-xs text-gray-500 mt-2">
                          {community.members?.length || 0} members
                        </p>
                      </div>

                    </div>
                  ))}
                  {communities.length === 0 && (
                    <p className="text-gray-400 text-center">No communities available</p>
                  )}
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