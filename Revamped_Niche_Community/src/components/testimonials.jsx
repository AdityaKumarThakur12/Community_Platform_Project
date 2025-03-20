import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'John Doe',
    text: 'This community has been a game-changer for me! I’ve met so many amazing people.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
  },
  {
    name: 'Jane Smith',
    text: 'I love the discussions here. Always insightful and engaging!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JaneSmith',
  },
  {
    name: 'Michael Brown',
    text: 'A fantastic platform for networking and learning from like-minded individuals.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelBrown',
  },
];

function Testimonials() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Users Say</h2>
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
