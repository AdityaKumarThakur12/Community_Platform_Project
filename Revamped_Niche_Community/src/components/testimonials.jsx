import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Aditya Kumar',
        text: 'This community has been a game-changer for me! I’ve met so many amazing people.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe',
    },
    {
        name: 'Shivam Nautiyal',
        text: 'I love the discussions here. Always insightful and engaging!',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JaneSmith',
    },
    {
        name: 'Amit Kumar',
        text: 'A fantastic platform for networking and learning from like-minded individuals.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelBrown',
    },
];

function Testimonials() {
    return (
        <div className="bg-gray-900 text-gray-300 p-6 rounded-xl shadow-md">
            <div className="relative w-fit mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6 pb-6 relative">
                    What Our Users Say
                </h2>
                <svg
                    className="absolute left-0 bottom-0 w-full h-6"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path fill="#6495ED" fillOpacity="1" d="M0,256L48,234.7C96,213,192,171,288,154.7C384,139,480,149,576,170.7C672,192,768,224,864,240C960,256,1056,256,1152,250.7C1248,245,1344,235,1392,229.3L1440,224V320H0Z"></path>
                </svg>
            </div>

            <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center space-x-4 p-4 border rounded-lg shadow-md shadow-cyan-200"
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
                            <p className="text-gray-400">{testimonial.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Testimonials;
