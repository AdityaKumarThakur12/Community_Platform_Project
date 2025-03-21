import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, ShieldQuestion, Contact, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import { useAuth } from '../contexts/authContext'; // Import authentication context

function Sidebar() {
    const [darkMode, setDarkMode] = useState(false);
    const [communities, setCommunities] = useState([]); // State to store community list
    const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Get the current user from the auth context

    const menuItems = [
        { icon: HomeIcon, label: 'Home', active: true, onClick: () => navigate('/') },
        { icon: UserGroupIcon, label: 'My Communities', onClick: () => handleProtectedAction(() => navigate('/communities')) },
        { icon: ShieldQuestion, label: 'FAQ', onClick: () => navigate('/faq') },
        { icon: Contact, label: 'Contact', onClick: () => navigate('/contact') },
        { icon: GraduationCap, label: 'Learn More', onClick: () => navigate('/learnMore') },
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

    // Function to handle protected actions
    const handleProtectedAction = (action) => {
        if (currentUser) {
            action(); // Execute the action if the user is logged in
        } else {
            setShowLoginModal(true); // Show the login modal if the user is not logged in
        }
    };

    return (
        <>
            <aside className={`w-64 hidden md:block ${darkMode ? 'bg-gray-800' : 'bg-gray-900'} rounded-2xl p-5 transition-colors`}>
                <nav className="space-y-2">
                    {menuItems.map((item, index) => (
                        <motion.a
                            key={item.label}
                            onClick={item.onClick}
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
                    onClick={() => handleProtectedAction(() => navigate('/createPost'))}
                    className="w-full mt-6 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium shadow-lg hover:bg-purple-700 transition-colors"
                >
                    Create Post
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProtectedAction(() => navigate('/createCommunity'))}
                    className="w-full flex gap-1 mt-6 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium shadow-lg hover:bg-purple-700 transition-colors"
                >
                    Create Community <PlusCircle />
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
                                onClick={() => handleProtectedAction(() => navigate(`/community/${community.id}`))} // Navigate to the community page
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
                    <h3 className="px-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Quick Links
                    </h3>
                    <ul className="mt-4 space-y-2">
                        {[
                            { name: "FAQ", path: "/faq" },
                            { name: "Support", path: "/contact" },
                            { name: "Privacy Policy", path: "/privacyPolicy" },
                        ].map((link) => (
                            <li key={link.name} className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white cursor-pointer">
                                <Link to={link.path} className="flex items-center space-x-2">
                                    <LinkIcon className="h-5 w-5" />
                                    <span>{link.name}</span>
                                </Link>
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

                
                
            </aside>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Login Required</h2>
                        <p className="text-gray-600 mb-6">
                            You need to log in to access this feature. Please log in or sign up to continue.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;