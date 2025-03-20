import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";

function OnboardingModal({ onClose }) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    {
      title: "Welcome to NicheCommunity!",
      description: "Join our platform to connect with like-minded individuals and explore your interests.",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=welcome",
    },
    {
      title: "Discover Communities",
      description: "Find and join communities that match your interests. Engage in discussions, share knowledge, and make connections.",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=discover",
    },
    {
      title: "Start Your Journey",
      description: "Create your first post, join discussions, and become part of our growing community!",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=journey",
    },
  ];

  return (
    <AnimatePresence>
      <Dialog
        as={motion.div}
        open={true}
        onClose={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />

        <Dialog.Panel className="relative w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <img
              src={steps[step - 1].image}
              alt={steps[step - 1].title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />

            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">
              {steps[step - 1].title}
            </Dialog.Title>

            <Dialog.Description className="text-gray-600 mb-6">
              {steps[step - 1].description}
            </Dialog.Description>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mb-6">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index + 1 === step ? "bg-purple-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                {step === 1 ? "Skip" : "Back"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (step < totalSteps ? setStep(step + 1) : onClose())}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                {step === totalSteps ? "Get Started" : "Next"}
              </motion.button>
            </div>
          </motion.div>
        </Dialog.Panel>
      </Dialog>
    </AnimatePresence>
  );
}

export default OnboardingModal;
