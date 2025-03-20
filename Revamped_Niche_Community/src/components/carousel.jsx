import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const slides = [
  {
    image: 'https://cdn.prod.website-files.com/636ebb4d131625f3efdea089/674f11f6d40cd4619b1e5382_colleagues-having-video-conference-coronavirus-pandemic_53876-145486-p-800.jpg',
    title: 'Innovate with Technology',
    description: 'Join the most advanced tech communities and stay ahead of the curve.',
  },
  {
    image: 'https://cdn.prod.website-files.com/60ffdd9e3c66d71b667eba0b/65981b329fe2f9ce2adf70cb_Niche%20Community_Hero-p-2000.png',
    title: 'Connect with Like-Minded People',
    description: 'Find and join communities that match your interests.',
  },
  {
    image: 'https://cdn.prod.website-files.com/60ffdd9e3c66d71b667eba0b/6583234841571954a1abfe26_c0f4aef4-8870-428e-9c60-3c672ec5c8a5.png',
    title: 'Shape the Future',
    description: 'Be a part of discussions that drive real-world impact.',
  },
];

function Carousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-72 overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 text-white p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={slides[index].image} alt="Slide" className="absolute inset-0 w-full h-full object-cover brightness-50" />
          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-4xl font-bold">{slides[index].title}</h2>
            <p className="mt-2 text-sm md:text-lg">{slides[index].description}</p>
            <button className="mt-4 px-5 py-2 bg-white text-black rounded-lg font-semibold shadow-lg hover:bg-gray-300 transition-all">
              Learn More
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md">
        <ArrowLeftIcon className="h-6 w-6 text-black" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md">
        <ArrowRightIcon className="h-6 w-6 text-black" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-gray-400'}`}></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
