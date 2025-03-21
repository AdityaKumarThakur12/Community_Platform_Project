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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path='/createCommunity' element={<CreateCommunity/>}/>
          <Route path='/communities' element={<CommunityList/>}/>
          <Route path="/community/:id" element={<CommunityView />} />
          <Route path='/learnmore' element={<CommunityLearnMore/>}/>
          <Route path='/faq' element={<CommunityFAQ/>}/>
          <Route path='contact' element={<CommunityContact/>}/>

        </Routes>
      )}
    </>
  );
};

export default App;