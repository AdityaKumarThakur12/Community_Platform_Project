import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    LinkIcon
} from '@heroicons/react/24/outline';

function Sidebar() {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { icon: HomeIcon, label: 'Home', active: true },
        { icon: UserGroupIcon, label: 'My Communities' },
        { icon: BookmarkIcon, label: 'Saved' },
        { icon: CalendarIcon, label: 'Events' },
        { icon: ChatBubbleLeftRightIcon, label: 'Messages' },
    ];

    return (
        <aside className={`w-64 hidden md:block ${darkMode ? 'bg-gray-800' : 'bg-gray-900'} rounded-2xl p-5 transition-colors`}>
            
            <nav className="space-y-2">
                {menuItems.map((item, index) => (
                    <motion.a
                        key={item.label}
                        href="#"
                        whileHover={{ x: 5 }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${item.active
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
                onClick={()=> navigate('/createPost')}
                className="w-full mt-6 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium shadow-lg hover:bg-purple-700 transition-colors"
            >
                Create Post
            </motion.button>

            {/* My Communities Section */}
            <div className="mt-8">
                <h3 className="px-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    My Communities
                </h3>
                <div className="mt-4 space-y-2">
                    {[
                        { name: 'Web Development', image: 'https://kartikmehtablog.com/wp-content/uploads/2022/12/AdobeStock_419269782-2048x853.jpeg' },
                        { name: 'AI & Technology', image: 'https://thefusioneer.com/wp-content/uploads/2023/11/5-AI-Advancements-to-Expect-in-the-Next-10-Years-scaled.jpeg' },
                        { name: 'Digital Art', image: 'https://www.elegantthemes.com/blog/wp-content/uploads/2023/07/history-of-AI-art-1536x764.jpg' }
                    ].map((community) => (
                        <motion.a
                            key={community.name}
                            href="#"
                            whileHover={{ x: 5 }}
                            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-200 hover:text-gray-900"
                        >
                            <span>
                                <img className="rounded-full h-10 w-10 object-cover" src={community.image} alt={community.name} />
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
                <p className="text-gray-300 text-sm">"Consistency beats intensity. Small daily progress leads to big results!"</p>
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
