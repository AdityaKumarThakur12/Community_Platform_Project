import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gray-900 text-white text-center py-6 mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <p>&copy; 2025 NicheConnect. All Rights Reserved.</p>
    </motion.footer>
  );
};

export default Footer;
