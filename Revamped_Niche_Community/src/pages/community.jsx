import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, PlusCircle } from 'lucide-react';
import { getCommunities } from '../utils/storage';
import Header from '../components/header';
import Footer from '../components/footer';

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
      <div className="text-center py-12">
        <p className="text-gray-500">Loading community stats...</p>
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
    <div
      className="bg-contain"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12  bg-opacity-80 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Welcome to Threadify Community Hub
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join communities, share your thoughts, and connect with others who share your interests.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              to="/createCommunity"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              <PlusCircle className="w-9 h-9 mr-2" />
              Create Community
            </Link>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link
                to="/communities"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                <Users className="w-9 h-9 mr-2" />
                Browse Communities
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">Community Stats</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Communities
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {totalCommunities}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Discussions
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {activeDiscussions}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Members
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {totalMembers}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}