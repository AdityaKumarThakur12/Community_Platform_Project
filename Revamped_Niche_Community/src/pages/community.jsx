import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, PlusCircle } from 'lucide-react';
import { getCommunities } from '../utils/storage';
import Header from '../components/header';
import Footer from '../components/footer';
import { motion } from 'framer-motion';

export default function Community() {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommunities = async () => {
            setLoading(true);
            setError(null);

            try {
                const fetchedCommunities = await getCommunities();
                setCommunities(fetchedCommunities);
            } catch (err) {
                console.error('Error fetching communities:', err);
                setError('Failed to load community stats. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCommunities();
    }, []);

    const totalCommunities = communities.length;
    const totalMembers = communities.reduce((acc, community) => acc + (community.members?.length || 0), 0);
    const activeDiscussions = communities.reduce((acc, community) => acc + (community.discussions?.length || 0), 0);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <motion.div 
                    className="relative w-24 h-24 border-t-4 border-blue-500 border-solid rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className='bg-black'>
            <Header />
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-opacity-80 rounded-lg bg-cover bg-center bg-no-repeat backdrop-blur-md shadow-2xl border border-white/10"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                }}
            >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl drop-shadow-xl">
                        Welcome to <span className="text-indigo-300">Threadify</span> Community Hub
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Join communities, share your thoughts, and connect with others who share your interests.
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Link to="/createCommunity" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg md:py-4 md:text-lg md:px-10">
                                <PlusCircle className="w-9 h-9 mr-2" />
                                Create Community
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="mt-3 sm:mt-0 sm:ml-3">
                            <Link to="/communities" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 shadow-lg md:py-4 md:text-lg md:px-10">
                                <Users className="w-9 h-9 mr-2" />
                                Browse Communities
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Community Stats</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {[
                            { label: 'Total Communities', value: totalCommunities, color: 'bg-indigo-500', Icon: Users },
                            { label: 'Active Discussions', value: activeDiscussions, color: 'bg-green-500', Icon: MessageSquare },
                            { label: 'Total Members', value: totalMembers, color: 'bg-purple-500', Icon: Users }
                        ].map((stat, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-white/10 backdrop-blur-lg overflow-hidden shadow-xl rounded-lg border border-white/20 p-6"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center">
                                    <div className={`${stat.color} rounded-md p-3 shadow-lg`}>
                                        <stat.Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="ml-5">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-300 truncate">
                                                {stat.label}
                                            </dt>
                                            <dd className="mt-1 text-3xl font-semibold text-white drop-shadow-lg">
                                                {stat.value}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
            <Footer />
        </div>
    );
}
