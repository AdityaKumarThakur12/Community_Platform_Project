import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signUp';
import Home from './pages/home';
import Loading from './components/loading'; 
// import CommunityPage from './pages/community';
import Feed from './components/feedPost';
import CreatePost from './components/post';
import PostDetail from './pages/postDetail';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); 
  }, []);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path='/community' element={<CommunityPage/>}/> */}
          <Route path='/feed' element={<Feed/>}/>
          <Route path='/createPost' element={<CreatePost/>}/>
          <Route path="/post/:id" element={<PostDetail />} /> {/* ✅ New Route for Post Details */}
        </Routes>
      )}
    </>
  );
};

export default App;
