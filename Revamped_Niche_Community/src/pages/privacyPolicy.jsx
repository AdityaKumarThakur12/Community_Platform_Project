import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
    const navigate = useNavigate();
    
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white px-6 md:px-12 lg:px-20 py-10">
                <motion.h1 
                    className="text-4xl font-bold text-center mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Privacy Policy
                </motion.h1>

                <motion.p 
                    className="text-gray-300 text-center max-w-3xl mx-auto mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Your privacy matters. We are committed to protecting your personal information and ensuring transparency in how we use your data.
                </motion.p>

                <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    {[
                        { title: "1. Information We Collect", content: "We collect personal details like name, email, and preferences when you sign up, engage in discussions, or contact us." },
                        { title: "2. How We Use Your Information", content: "We use your data to enhance user experience, personalize content, provide customer support, and improve our community platform." },
                        { title: "3. Data Security", content: "We prioritize security with encryption and restricted access to sensitive information." },
                        { title: "4. Sharing & Third Parties", content: "Your data is never sold. We may share it with trusted service providers to improve our services." },
                        { title: "5. Your Rights", content: "You have the right to access, edit, or delete your personal data at any time." },
                        { title: "6. Changes to Policy", content: "We may update this policy and will notify you of any significant changes." }
                    ].map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index }}
                        >
                            <h2 className="text-2xl font-semibold text-blue-400">{item.title}</h2>
                            <p className="text-gray-300 mt-2">{item.content}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-gray-400">Have questions? <span onClick={()=> navigate('/contact')} className="text-blue-400 cursor-pointer hover:underline">Contact us</span></p>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}

export default PrivacyPolicy;