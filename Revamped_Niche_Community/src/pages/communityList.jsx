import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { isMember, joinCommunity } from '../utils/storage';
import Header from '../components/header';
import Footer from '../components/footer';

export default function CommunityList() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinedStatus, setJoinedStatus] = useState({});

  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      setError(null);

      try {
        const db = getDatabase();
        const communitiesRef = ref(db, 'communities');
        onValue(communitiesRef, async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const fetchedCommunities = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
              coverImage: data[key].coverImage || `https://source.unsplash.com/random/400x300/?community`,
            }));

            const joinedStatusPromises = fetchedCommunities.map(async (community) => {
              const isJoined = await isMember(community.id);
              return { [community.id]: isJoined };
            });

            const joinedStatusArray = await Promise.all(joinedStatusPromises);
            const joinedStatusObject = Object.assign({}, ...joinedStatusArray);

            setCommunities(fetchedCommunities);
            setJoinedStatus(joinedStatusObject);
          } else {
            setCommunities([]);
          }
          setLoading(false);
        });
      } catch (err) {
        console.error('Error fetching communities:', err);
        setError('Failed to load communities. Please try again later.');
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleJoin = async (communityId, e) => {
    e.preventDefault();
    await joinCommunity(communityId);
    setJoinedStatus((prevStatus) => ({
      ...prevStatus,
      [communityId]: true,
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading communities...</p>
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
    <>
    <Header/>
    <div className="bg-[url('https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <h1 className="text-3xl font-bold text-gray-50 mb-8">My Communities 🏠</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(communities) && communities.length > 0 ? (
          communities.map((community) => (
            <Link
              key={community.id}
              to={`/community/${community.id}`}
              className="block bg-gray-800 text-white rounded-xl border border-gray-600 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={community.coverImage}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {community.name}
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-2">
                  {community.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-300">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{community.members?.length || 0} members</span>
                  </div>

                  {!joinedStatus[community.id] ? (
                    <button
                      onClick={(e) => handleJoin(community.id, e)}
                      className="flex items-center text-indigo-600 hover:text-indigo-500"
                    >
                      Join <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <span className="text-green-600 font-medium">Joined</span>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No communities yet
            </h3>
            <p className="text-gray-500 mb-4">
              Be the first one to create a community!
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create Community
            </Link>
          </div>
        )}
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
}
