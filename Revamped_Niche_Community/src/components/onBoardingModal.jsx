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
      image: "https://images.unsplash.com/photo-1531844251246-9a1bfaae09fc?q=80&w=2116&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Discover Communities",
      description: "Find and join communities that match your interests. Engage in discussions, share knowledge, and make connections.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Start Your Journey",
      description: "Create your first post, join discussions, and become part of our growing community!",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />

        <Dialog.Panel className="relative w-full max-w-sm sm:max-w-md p-4 sm:p-6 bg-white shadow-xl rounded-2xl">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <img
              src={steps[step - 1].image}
              alt={steps[step - 1].title}
              className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4 sm:mb-6"
            />

            <Dialog.Title className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
              {steps[step - 1].title}
            </Dialog.Title>

            <Dialog.Description className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 text-center">
              {steps[step - 1].description}
            </Dialog.Description>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-2 mb-4 sm:mb-6">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
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
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900"
              >
                {step === 1 ? "Skip" : "Back"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (step < totalSteps ? setStep(step + 1) : onClose())}
                className="px-3 sm:px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs sm:text-sm"
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