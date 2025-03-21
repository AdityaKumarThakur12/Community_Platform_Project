import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, LogOut } from 'lucide-react';
import { getCommunities, getPosts, isMember, joinCommunity, leaveCommunity } from '../utils/storage';
import CreatePost1 from '../components/createPost1';
import Post1 from '../components/post1';
import { auth } from '../firebaseConfig/firebase';
import Header from '../components/header';

export default function CommunityView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isMemberState, setIsMemberState] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUserEmail(user.email);
    }

    const loadCommunity = async () => {
      if (!id) return;

      const communities = await getCommunities();
      const found = communities.find((c) => c.id === id);
      if (!found) {
        navigate('/communities');
        return;
      }

      setCommunity(found);
      const communityPosts = await getPosts(id);
      setPosts(communityPosts);
      const memberStatus = await isMember(id);
      setIsMemberState(memberStatus);
    };

    loadCommunity();
  }, [id, navigate]);

  const handleJoin = async () => {
    if (!auth.currentUser) {
      setShowLoginModal(true); // Show the login modal if the user is not logged in
      return;
    }

    if (!id) return;
    await joinCommunity(id);
    setIsMemberState(true);
  };

  const handleLeave = async () => {
    if (!id) return;
    await leaveCommunity(id);
    setIsMemberState(false);
  };

  const handlePostsUpdate = async () => {
    if (!id) return;
    const updatedPosts = await getPosts(id);
    setPosts(updatedPosts);
  };

  if (!community) return null;

  return (
    <>
      <Header />
      <div className="bg-gray-900">
        <div className="relative h-64">
          <img
            src={community.coverImage}
            alt={community.name}
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white w-fit">
              <h1 className="text-4xl font-bold mb-2">{community.name}</h1>
              <p className="text-lg text-gray-100">{community.description}</p>
              <div className="flex items-center mt-4 text-gray-200">
                <Users className="w-5 h-5 mr-2" />
                <span>{community.members?.length || 0} members</span> {/* Add fallback for members */}
              </div>
            </div>

            {isMemberState ? (
              <button
                onClick={handleLeave}
                className="flex items-center px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Leave Community
              </button>
            ) : (
              <button
                onClick={handleJoin}
                className="px-6 py-3 bg-teal-800 text-white border rounded-lg font-medium hover:bg-gray-100 hover:text-purple-700 transition-colors"
              >
                Join Community
              </button>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-900">
          {isMemberState && (
            <div className="mb-8">
              {/* Pass the current user's email to the CreatePost1 component */}
              <CreatePost1 onPostCreated={handlePostsUpdate} currentUserEmail={currentUserEmail} />
            </div>
          )}

          <div className="space-y-6">
            {posts.map((post) => (
              <Post1
                key={post.id}
                post={post}
                onUpdate={handlePostsUpdate}
              />
            ))}

            {posts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-500">
                  {isMemberState
                    ? "Be the first one to post in this community!"
                    : "Join this community to start posting!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              You need to log in to join this community. Please log in or sign up to continue.
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