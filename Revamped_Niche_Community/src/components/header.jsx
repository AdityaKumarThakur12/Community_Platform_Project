import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { PlusCircle, ShieldQuestion, Contact, GraduationCap, HomeIcon, NotepadText, LogOut, LogInIcon } from 'lucide-react';
import {
    BellIcon,
    UserCircleIcon,
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { getDatabase, ref, onValue } from 'firebase/database';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    useEffect(() => {
        if (currentUser) {
            const db = getDatabase();
            const postsRef = ref(db, 'postss');

            // Listen for new posts
            onValue(postsRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = Object.entries(snapshot.val())
                        .map(([id, post]) => ({
                            id,
                            ...post,
                        }))
                        .sort((a, b) => b.timestamp - a.timestamp);
                    setNotifications(data);
                } else {
                    setNotifications([]);
                }
            });
        }
    }, [currentUser]);

    const handleNotificationClick = (postId) => {
        navigate(`/post/${postId}`);
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== postId)
        );
    };

    return (
        <header className="bg-gray-900 shadow-sm relative">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section (Logo) */}
                    <div className="flex items-center space-x-3">
                        <motion.div whileHover={{ scale: 1.05 }} onClick={() => navigate('/')} className="flex items-center cursor-pointer">
                            <img src="/CWP-3.png" alt="Logo" className="w-10 h-10 object-contain" />
                            <span className="text-white text-xl font-semibold ml-1">𝓣𝖍𝖗𝖊𝖆𝖉𝖎𝖋y</span>
                        </motion.div>
                    </div>

                    {/* Search Bar (Desktop Only) */}
                    <div className="hidden md:block flex-1 max-w-lg">
                        <input
                            type="text"
                            placeholder="Search communities, topics, or posts..."
                            className="w-full bg-gray-300 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Mobile Search Icon + Menu Button */}
                    <div className="flex items-center md:hidden space-x-4">
                        {!searchOpen && (
                            <button onClick={() => setSearchOpen(true)} className="text-gray-200">
                                <MagnifyingGlassIcon className="h-6 w-6" />
                            </button>
                        )}

                        <div className="relative">
                            <button
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                                className="flex items-center space-x-2 text-gray-200"
                            >
                                <BellIcon className="h-6 w-6" />
                                {/* <span></span> */}
                            </button>
                            {notificationsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 z-10 w-64 bg-gray-700 text-white rounded-lg shadow-lg p-3"
                                >
                                    <h3 className="text-sm font-semibold mb-2">New Posts</h3>
                                    {notifications.length > 0 ? (
                                        notifications.map((post) => (
                                            <div
                                                key={post.id}
                                                className="p-2 border-b border-gray-600 cursor-pointer hover:bg-gray-700"
                                                onClick={() => handleNotificationClick(post.id)}
                                            >
                                                <p className="text-xs text-gray-300 line-clamp-2">
                                                    {post.content ? post.content.substring(0, 100) : "No content available"} {/* Fallback for undefined content */}
                                                </p>
                                                <span className="text-gray-400 text-xs">{post.author || "Unknown author"}</span> {/* Fallback for undefined author */}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-400">No new posts</p>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center space-x-2 text-gray-200"
                            >
                                <UserCircleIcon className="h-6 w-6" />
                                {/* <span>Profile</span> */}
                            </button>
                            {profileOpen && currentUser && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 z-20 w-64 bg-gray-700 text-white rounded-lg shadow-lg p-3"
                                >
                                    <h3 className="text-sm font-semibold">Profile</h3>
                                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                                    <button
                                        className="mt-2 w-full bg-red-500 text-white py-1 rounded-lg text-sm"
                                        onClick={async () => {
                                            await logout();
                                            navigate('/login');
                                        }}
                                    >
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-200 focus:outline-none">
                            {menuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="text-gray-200 relative">
                                <BellIcon className="h-6 w-6" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                                )}
                            </button>
                            {notificationsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 z-10 w-64 bg-gray-800 text-white rounded-lg shadow-lg p-3"
                                >
                                    <h3 className="text-sm font-semibold mb-2">New Posts</h3>
                                    {notifications.length > 0 ? (
                                        notifications.map((post) => (
                                            <div
                                                key={post.id}
                                                className="p-2 border-b border-gray-600 cursor-pointer hover:bg-gray-700"
                                                onClick={() => handleNotificationClick(post.id)}
                                            >
                                                <p className="text-xs text-gray-300 line-clamp-2">
                                                    {post.content ? post.content.substring(0, 100) : "No content available"} {/* Fallback for undefined content */}
                                                </p>
                                                <span className="text-gray-400 text-xs">{post.author || "Unknown author"}</span> {/* Fallback for undefined author */}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-400">No new posts</p>
                                    )}
                                </motion.div>
                            )}
                        </div>

                        {/* Profile */}
                        <div className="relative">
                            <button onClick={() => setProfileOpen(!profileOpen)} className="text-gray-200">
                                <UserCircleIcon className="h-8 w-8" />
                            </button>
                            {profileOpen && currentUser && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 z-20 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-3"
                                >
                                    <h3 className="text-sm font-semibold">Profile</h3>
                                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                                    <button
                                        className="mt-2 w-full bg-red-500 text-white py-1 rounded-lg text-sm"
                                        onClick={async () => {
                                            await logout();
                                            navigate('/login');
                                        }}
                                    >
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Login/Logout */}
                        {currentUser ? (
                            
                                <button
                                className="text-white flex gap-2 py-2 px-4 cursor-pointer border rounded-xl"
                                onClick={async () => {
                                    await logout();
                                    navigate('/login');
                                }}
                            >
                                Logout <LogOut/>
                            </button>
                            
                           
                            
                        ) : (
                            <button
                                className="text-white flex gap-2 py-2 px-4 cursor-pointer border rounded-xl"
                                onClick={() => navigate('/login')}
                            >
                                Login <LogInIcon/>
                            </button>
                        )}
                    </nav>
                </div>
            </div>

            {/* Mobile Search Input */}
            {searchOpen && (
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-4 right-4 top-16 bg-gray-800 p-2 rounded-md shadow-lg"
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-gray-300 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button onClick={() => setSearchOpen(false)} className="absolute right-2 top-2 text-gray-500">
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </motion.div>
            )}

            {/* Mobile Menu */}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: menuOpen ? 0 : '-100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg z-50 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >

                <div className="flex flex-col h-full p-5">
                    <button onClick={() => setMenuOpen(false)} className="self-end text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                    <div className="mt-6 space-y-4">
                        <div className='flex gap-2'>
                            <HomeIcon className='h-6 w-6 text-white' />
                            <button onClick={() => navigate('/')} className='text-white'>Home</button>
                        </div>

                        {/* my communitites icon */}
                        <div className='flex gap-2'>
                            <UserGroupIcon className='h-6 w-6 text-white' />
                            <button onClick={() => navigate('/communities')} className='text-white'>My communities</button>
                        </div>

                        <div className='flex gap-2'>
                            <ShieldQuestion className='h-6 w-6 text-white' />
                            <button onClick={() => navigate('/faq')} className='text-white'>FAQ</button>
                        </div>
                        <div className='flex gap-2'>
                            <Contact className='h-6 w-6 text-white' />
                            <button onClick={() => navigate('/contact')} className='text-white'>Contact</button>
                        </div>
                        <div className='flex gap-2'>
                            <GraduationCap className='h-6 w-6 text-white' />
                            <button onClick={() => navigate('/learnmore')} className='text-white'>Learn More</button>
                        </div>


                        {/* Notifications */}


                        {/* Profile */}
                        

                        <div className='flex gap-2 bg-purple-700 py-2 px-2 rounded-xl'>
                            <NotepadText className='h-6 w-6 text-white' />
                            <button onClick={() => navigate('/createPost')} className='text-white'>Create Post</button>
                        </div>
                        <div className='flex gap-2 bg-purple-700 py-2 px-2 rounded-xl'>
                            <UserGroupIcon className='h-6 w-6 text-white' />
                            <button onClick={() => navigate('/createCommunity')} className='text-white'>Create Community</button>
                        </div>

                        {currentUser ? (
                            <button
                                className="text-white flex gap-2 py-2 px-10 cursor-pointer border rounded-xl"
                                onClick={async () => {
                                    await logout();
                                    navigate('/login');
                                }}
                            >
                                Logout <LogOut/>
                            </button>
                        ) : (
                            <button
                                className="text-white flex gap-2 py-2 px-4 cursor-pointer border rounded-xl"
                                onClick={() => navigate('/login')}
                            >
                                Login <LogInIcon/>
                            </button>
                        )}


                    </div>
                </div>
            </motion.div>

            {/* Overlay for Mobile Menu */}
            {menuOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>}
        </header>
    );
}

export default Header;