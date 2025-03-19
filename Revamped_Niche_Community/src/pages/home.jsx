import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaComments, FaPoll, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <Navbar />
      <motion.header
        className="text-center py-16 mt-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold">Discover & Engage with Like-Minded Communities</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Join niche communities, participate in discussions, and connect with others who share your interests.
        </p>
      </motion.header>
      
      <motion.div
        className="flex flex-wrap justify-center gap-8 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <FeatureCard icon={<FaUsers size={40} className="text-white" />} title="Join Communities" desc="Find and join communities tailored to your interests." />
        <FeatureCard icon={<FaComments size={40} className="text-white" />} title="Real-Time Discussions" desc="Engage in threaded discussions with real-time updates." />
        <FeatureCard icon={<FaPoll size={40} className="text-white" />} title="Live Polls & Q&A" desc="Participate in interactive polls and live Q&A sessions." />
        <FeatureCard icon={<FaTrophy size={40} className="text-white" />} title="Achievements & Leaderboards" desc="Earn badges and climb the leaderboard by contributing." />
      </motion.div>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <motion.div 
      className="w-72 p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-2xl flex flex-col items-center text-center transform transition hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2">{desc}</p>
    </motion.div>
  );
};

export default Home;