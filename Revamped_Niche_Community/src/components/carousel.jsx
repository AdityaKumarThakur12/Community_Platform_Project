import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://source.unsplash.com/800x400/?technology',
  'https://source.unsplash.com/800x400/?community',
  'https://source.unsplash.com/800x400/?innovation',
];

function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
      <motion.img
        key={index}
        src={images[index]}
        alt="Carousel Image"
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}

export default Carousel;
