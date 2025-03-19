import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav 
      className="bg-white shadow-lg text-gray-800 py-4 px-6 flex justify-between items-center fixed w-full top-0 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Link to="/" className="text-2xl font-bold text-blue-600">NicheConnect</Link>
      <div className="flex space-x-6">
        <Link to="/explore" className="hover:text-blue-500">Explore</Link>
        <Link to="/about" className="hover:text-blue-500">About</Link>
        <Link to="/contact" className="hover:text-blue-500">Contact</Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
