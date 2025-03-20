import React from "react";
import { motion } from "framer-motion";
import { FallingLines } from "react-loader-spinner";

const pathVariants = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 1.5, // Faster movement
            delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
        },
    },
});

const Loading = () => {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900 overflow-hidden">
            {/* Background Image with Zoom Out Animation */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center brightness-50"
                style={{
                    backgroundImage: "url('https://cdn.prod.website-files.com/60ffdd9e3c66d71b667eba0b/65981b329fe2f9ce2adf70cb_Niche%20Community_Hero-p-2000.png')",
                    filter: "brightness(0.4)",
                }}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }} // Faster load-in
            />

            {/* Floating Text Content Overlay */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: [0, -5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} // Quicker bounce
                className="relative text-center text-white z-10"
            >
                <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-pulse">
                    Welcome to <span className="text-purple-400">Threadify</span>
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                    Discover and join communities that match your interests.
                </p>

                {/* Unique Loading Message */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="mt-4 text-sm md:text-lg text-gray-300 italic"
                >
                    ⏳ Hold tight! Something **mind-blowing** is coming your way... 🚀
                </motion.p>
            </motion.div>

            {/* Falling Spinner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative mt-6 z-10"
            >
                <FallingLines color="#FFD700" width="120" visible={true} ariaLabel="falling-lines-loading" />
            </motion.div>

            {/* Super-Fast Cursive Moving Lines */}
            <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
                {/* Gold Line */}
                <motion.path
                    d="M 50 150 C 200 50, 400 250, 600 100 S 750 400, 800 200"
                    stroke="rgba(255, 223, 0, 0.8)"
                    strokeWidth="3"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants(0)}
                    initial="initial"
                    animate="animate"
                />
                {/* Blue Line */}
                <motion.path
                    d="M 20 300 C 180 100, 450 400, 700 250 S 750 500, 780 380"
                    stroke="rgba(0, 174, 255, 0.8)"
                    strokeWidth="3"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants(0.5)} // Slightly delayed
                    initial="initial"
                    animate="animate"
                />
                {/* Purple Line */}
                <motion.path
                    d="M 30 500 C 150 400, 300 600, 500 450 S 680 600, 800 550"
                    stroke="rgba(157, 78, 221, 0.8)"
                    strokeWidth="3"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants(1)} // Different timing
                    initial="initial"
                    animate="animate"
                />
            </motion.svg>
        </div>
    );
};

export default Loading;
