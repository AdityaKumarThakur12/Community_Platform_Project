import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signUp';
import Home from './pages/home';
import Loading from './components/loading';
import Feed from './components/feedPost';
import CreatePost from './components/post';
import PostDetail from './pages/postDetail';
import CreateCommunity from './pages/createCommunity';
import CommunityList from './pages/communityList';
import CommunityView from './pages/communityView';
import CommunityLearnMore from './pages/learnMore';
import CommunityFAQ from './pages/faq';
import CommunityContact from './pages/contact';
import PrivacyPolicy from './pages/privacyPolicy';
import Community from './pages/community';
import ProtectedRoute from './utils/protectedRoute';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<ProtectedRoute> <Community/> </ProtectedRoute> }/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<ProtectedRoute> <Feed /> </ProtectedRoute>} />
          <Route path="/createPost" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path='/createCommunity' element={<ProtectedRoute> <CreateCommunity/> </ProtectedRoute>}/>
          <Route path='/communities' element={<ProtectedRoute> <CommunityList/> </ProtectedRoute>}/>
          <Route path="/community/:id" element={<CommunityView />} />
          <Route path='/learnmore' element={<CommunityLearnMore/>}/>
          <Route path='/faq' element={<CommunityFAQ/>}/>
          <Route path='/contact' element={<CommunityContact/>}/>
          <Route path='/privacyPolicy' element={<PrivacyPolicy/>}/>

        </Routes>
      )}
    </>
  );
};

export default App;