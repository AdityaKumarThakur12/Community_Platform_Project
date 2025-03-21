import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";

function CommunityLearnMore() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white">
                {/* Hero Section */}
                <motion.div
                    className="relative w-full h-72 flex flex-col items-center justify-center text-center px-6 md:px-12"
                    style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-opacity-50"></div>

                    {/* Text Content */}
                    <motion.h1
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white relative z-10"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Awareness Starts With You
                    </motion.h1>

                    <motion.p
                        className="text-base md:text-lg lg:text-xl text-gray-100 mt-2 relative z-10 max-w-2xl"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Small actions today create a brighter future tomorrow.
                        Change begins with knowledge, spreads with action, and lives on through impact.
                    </motion.p>

                    <motion.p
                        className="text-sm md:text-md lg:text-lg text-gray-100 mt-2 relative z-10 max-w-xl italic"
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        “The power to change the world is in your hands. Speak up, take action, and inspire those around you.”
                    </motion.p>

                    <motion.button
                        className="mt-4 px-4 md:px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg relative z-10"
                        whileHover={{ scale: 1.1 }}
                    >
                        Join the Movement
                    </motion.button>
                </motion.div>

                {/* Why It Matters Section */}
                <div className="mt-16 px-6 md:px-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold">Why It Matters</h2>
                    <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-3">
                        Every decision we make impacts our world. From <strong>climate change</strong> to <strong>mental health awareness</strong>, understanding these issues helps us take action.
                    </p>
                </div>

                {/* Impact Section with Animations */}
                <div className="mt-10 px-6 md:px-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-center">The Impact of Awareness</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: "🌱", title: "Environmental Impact", desc: "Reduce waste, protect nature, and ensure a sustainable planet." },
                            { icon: "🧠", title: "Mental Health", desc: "Understanding emotions and supporting mental well-being." },
                            { icon: "💡", title: "Education", desc: "Knowledge empowers people to create change." },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-xl md:text-2xl">{item.icon} {item.title}</h3>
                                <p className="text-sm md:text-base text-gray-400 mt-2">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-16 px-6 md:px-12 flex flex-col items-center">
                    <motion.h2
                        className="text-2xl md:text-3xl font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Be The Change
                    </motion.h2>
                    <motion.p
                        className="text-sm md:text-base lg:text-lg text-gray-400 mt-2 text-center max-w-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Start today. Whether it's spreading awareness, making sustainable choices, or supporting causes, every action matters.
                    </motion.p>

                    <motion.button
                        className="mt-6 px-4 md:px-6 py-2 md:py-3 bg-blue-600 rounded-lg text-white text-sm md:text-lg font-semibold"
                        whileHover={{ scale: 1.1 }}
                    >
                        Take Action Now
                    </motion.button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CommunityLearnMore;