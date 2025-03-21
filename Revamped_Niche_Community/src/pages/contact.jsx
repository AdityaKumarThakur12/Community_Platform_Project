import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Header from "../components/header";
import Footer from "../components/footer";

function CommunityContact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Validate Form Fields
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            {/* Banner Image */}
            <div className="relative">
                <img
                    src="https://png.pngtree.com/thumb_back/fw800/background/20241001/pngtree-innovative-communication-tech-concept-of-a-globally-connected-world-cloud-computing-image_16282681.jpg"
                    alt="Community"
                    className="w-full h-60 object-cover"
                />
                <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
                    <motion.h1
                        className="text-4xl font-bold text-white"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Contact Our Community
                    </motion.h1>
                    <motion.p
                        className="text-lg text-gray-200 mt-2 max-w-2xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Together, we grow. Together, we innovate. Whether you have questions, ideas, or just want to connect—reach out!
                        Every great journey starts with a conversation. 🚀
                    </motion.p>
                </div>
            </div>

            <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
                <p className="text-gray-400 text-center mt-2">
                    We're here to help! Reach out for any support or inquiries.
                </p>

                {/* Contact Details */}
                <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: <FaPhoneAlt />, title: "Phone", info: "086788778767" },
                        { icon: <FaEnvelope />, title: "Email", info: "support@Threadify.com" },
                        { icon: <FaMapMarkerAlt />, title: "Location", info: "New Delhi, India" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 p-6 rounded-lg flex flex-col items-center text-center shadow-lg"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-blue-500 text-3xl">{item.icon}</div>
                            <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
                            <p className="text-gray-400 mt-1">{item.info}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Unique Glassmorphism Contact Form */}
                <div className="max-w-3xl mx-auto mt-12 bg-opacity-50 bg-gray-800 p-8 rounded-xl shadow-lg backdrop-blur-lg border border-gray-700">
                    <motion.h2
                        className="text-2xl font-semibold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Get In Touch
                    </motion.h2>

                    {success && (
                        <motion.p
                            className="text-green-500 text-center mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            ✅ Your message has been sent successfully!
                        </motion.p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        {/* Name Field */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-5 py-3 bg-transparent text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </motion.div>

                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-5 py-3 bg-transparent text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </motion.div>

                        {/* Message Field */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows="4"
                                className="w-full px-5 py-3 bg-transparent text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </motion.button>
                    </form>
                </div>

                {/* Social Media Links */}
                <div className="mt-12 flex justify-center space-x-6">
                    {[FaFacebook, FaTwitter, FaInstagram].map((Icon, index) => (
                        <motion.a
                            key={index}
                            href="#"
                            className="text-gray-400 text-2xl hover:text-white"
                            whileHover={{ scale: 1.2 }}
                        >
                            <Icon />
                        </motion.a>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CommunityContact;
