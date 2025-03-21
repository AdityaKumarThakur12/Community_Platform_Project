import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, ShieldQuestion } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    UserGroupIcon,
    BookmarkIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    MagnifyingGlassIcon,
    MoonIcon,
    ArrowRightOnRectangleIcon,
    UserIcon,
    LightBulbIcon,
    LinkIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';

function Sidebar() {
    const [darkMode, setDarkMode] = useState(false);
    const [communities, setCommunities] = useState([]); // State to store community list
    const navigate = useNavigate();

    const menuItems = [
        { icon: HomeIcon, label: 'Home', active: true, onClick: () => navigate('/') },
        { icon: UserGroupIcon, label: 'My Communities', onClick: () => navigate('/communities') },
        { icon: ShieldQuestion, label: 'FAQ', onClick: ()=> navigate('/faq') },
        { icon: CalendarIcon, label: 'Events' },
        { icon: ChatBubbleLeftRightIcon, label: 'Messages' },
    ];

    // Fetch communities from the backend
    useEffect(() => {
        axios
            .get('https://finanace-5dc1c-default-rtdb.asia-southeast1.firebasedatabase.app/communities.json')
            .then((response) => {
                if (response.data) {
                    const fetchedCommunities = Object.keys(response.data).map((key) => ({
                        id: key,
                        ...response.data[key],
                    }));
                    setCommunities(fetchedCommunities);
                }
            })
            .catch((error) => console.error('Error fetching communities:', error));
    }, []);

    return (
        <aside className={`w-64 hidden md:block ${darkMode ? 'bg-gray-800' : 'bg-gray-900'} rounded-2xl p-5 transition-colors`}>
            <nav className="space-y-2">
                {menuItems.map((item, index) => (
                    <motion.a
                        key={item.label}
                        onClick={item.onClick}
                        whileHover={{ x: 5 }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            item.active
                                ? 'bg-purple-100 text-purple-600'
                                : 'text-gray-300 hover:bg-gray-100 hover:text-gray-900'
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
                onClick={() => navigate('/createPost')}
                className="w-full mt-6 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium shadow-lg hover:bg-purple-700 transition-colors"
            >
                Create Post
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/createCommunity')}
                className="w-full flex gap-1 mt-6 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium shadow-lg hover:bg-purple-700 transition-colors"
            >
                Create Community <PlusCircle/>
            </motion.button>

            {/* My Communities Section */}
            <div className="mt-8">
                <h3 className="px-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    My Communities
                </h3>
                <div className="mt-4 space-y-2">
                    {communities.map((community) => (
                        <motion.a
                            key={community.id}
                            onClick={() => navigate(`/community/${community.id}`)} // Navigate to the community page
                            whileHover={{ x: 5 }}
                            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-200 hover:text-gray-900 cursor-pointer"
                        >
                            <span>
                                <img
                                    className="rounded-full h-10 w-10 object-cover"
                                    src={community.coverImage || 'https://via.placeholder.com/150'} // Fallback image
                                    alt={community.name}
                                />
                            </span>
                            <span>{community.name}</span>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Trending Topics Section */}
            <div className="mt-8">
                <h3 className="px-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Trending Topics
                </h3>
                <ul className="mt-4 space-y-2 text-gray-400">
                    {['React.js', 'Machine Learning', 'UI/UX Design', 'Blockchain'].map((topic) => (
                        <li key={topic} className="px-4 py-2 hover:text-white cursor-pointer">
                            #{topic}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Quick Links Section */}
            <div className="mt-8">
                <h3 className="px-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                    {['FAQ', 'Support', 'Privacy Policy'].map((link) => (
                        <li key={link} className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white cursor-pointer">
                            <LinkIcon className="h-5 w-5" />
                            <span>{link}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Daily Tip Section */}
            <div className="mt-8 p-4 bg-gray-700 rounded-lg">
                <LightBulbIcon className="h-6 w-6 text-yellow-400 mb-2" />
                <p className="text-gray-300 text-sm">
                    "Consistency beats intensity. Small daily progress leads to big results!"
                </p>
            </div>

            {/* Dark Mode Toggle */}
            <div className="mt-6 flex items-center justify-between px-4">
                <span className="text-gray-300">Dark Mode</span>
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600">
                    <MoonIcon className="h-6 w-6 text-gray-200" />
                </button>
            </div>

            {/* Logout Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 px-4 py-3 bg-red-600 text-white rounded-lg font-medium shadow-lg hover:bg-red-700 transition-colors"
            >
                <ArrowRightOnRectangleIcon className="inline-block w-5 h-5 mr-2" /> Logout
            </motion.button>
        </aside>
    );
}

export default Sidebar;