import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";

const faqData = [
    {
        question: "What is this community about?",
        answer: "Our community is a space for awareness, discussions, and actions on various social and environmental issues.",
    },
    {
        question: "How can I contribute?",
        answer: "You can contribute by participating in discussions, sharing awareness posts, volunteering, and supporting campaigns.",
    },
    {
        question: "Is there a membership fee?",
        answer: "No, joining our community is completely free. We believe in making knowledge and action accessible to all.",
    },
    {
        question: "How do I stay updated?",
        answer: "Follow our social media channels, subscribe to our newsletter, and engage in our community platform for updates.",
    },
    {
        question: "Can I start my own initiative?",
        answer: "Absolutely! We encourage members to take action and initiate their own projects with community support.",
    }
];

function CommunityFAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
                <motion.h1
                    className="text-4xl font-bold text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Community FAQs
                </motion.h1>
                <p className="text-gray-400 text-center mt-2">
                    Have questions? We've got answers.
                </p>

                <div className="max-w-3xl mx-auto mt-8">
                    {faqData.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-800 rounded-lg shadow-md mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <button
                                className="w-full text-left px-6 py-4 flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-lg font-semibold">{faq.question}</span>
                                <motion.span
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {openIndex === index ? "▲" : "▼"}
                                </motion.span>
                            </button>

                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: openIndex === index ? "auto" : 0,
                                    opacity: openIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden px-6 pb-4 text-gray-300"
                            >
                                {faq.answer}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CommunityFAQ;
