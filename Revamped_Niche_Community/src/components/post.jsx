import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";

const DATABASE_URL = "https://finanace-5dc1c-default-rtdb.asia-southeast1.firebasedatabase.app/postss.json";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", author: "", community: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setPost({ ...post, [key]: value });
  };

  const handleSubmit = async () => {
    if (!post.title || !post.author || !post.community || !post.content) return;
    setLoading(true);

    const postData = {
      ...post,
      votes: 0,
      comments: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(DATABASE_URL, postData);
      navigate("/");
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen border-t-2 border-amber-50 flex flex-col lg:flex-row items-center justify-center bg-gray-900 text-white p-6">
        {/* Left Side: Post Creation Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg lg:w-1/2"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Let's Create Something Awesome</h2>

          <div className="space-y-6">
            <motion.div className="bg-gray-700 p-4 rounded-lg shadow-md" animate={{ scale: 1.02 }}>
              <h3 className="text-xl font-bold text-purple-400">{post.title || "Your Title Here"}</h3>
              <p className="text-gray-300 text-sm">By {post.author || "Your Name"} in {post.community || "Community"}</p>
              <p className="mt-2 text-gray-200">{post.content || "Start writing your thoughts..."}</p>
            </motion.div>

            <input type="text" className="p-2 rounded bg-gray-700 text-white w-full" placeholder="Title" onChange={(e) => handleChange("title", e.target.value)} />
            <input type="text" className="p-2 rounded bg-gray-700 text-white w-full" placeholder="Your Name" onChange={(e) => handleChange("author", e.target.value)} />
            <input type="text" className="p-2 rounded bg-gray-700 text-white w-full" placeholder="Community (e.g., Tech, Gaming)" onChange={(e) => handleChange("community", e.target.value)} />
            <textarea className="p-2 rounded bg-gray-700 text-white w-full" placeholder="Share your thoughts..." onChange={(e) => handleChange("content", e.target.value)} />
          </div>

          <motion.button
            className="w-full bg-purple-600 text-white py-2 rounded mt-4 hover:bg-purple-700 transition-all"
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Now"}
          </motion.button>

          <button onClick={() => navigate("/")} className="mt-4 text-gray-400 hover:text-gray-200 text-center block w-full">
            Cancel
          </button>
        </motion.div>

        {/* Right Side: Image and Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col items-center justify-center w-1/2 p-6"
        >
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Create Post" className="rounded-lg shadow-lg max-w-full" />
          <p className="text-gray-300 text-lg text-center mt-4">Share your thoughts in the {post.community || "community"} and be part of the conversation.</p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default CreatePost;
