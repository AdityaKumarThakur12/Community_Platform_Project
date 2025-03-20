import React from 'react';
import { motion } from 'framer-motion';
import {
  GlobeAltIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  RssIcon,
} from '@heroicons/react/24/outline';

function Footer() {
  const footerSections = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Blog', 'Contact']
    },
    {
      title: 'Communities',
      links: ['Browse All', 'Start a Community', 'Guidelines', 'Success Stories']
    },
    {
      title: 'Resources',
      links: ['Help Center', 'Safety Center', 'Community Standards', 'Developers']
    },
    {
      title: 'Legal',
      links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility']
    }
  ];

  const stats = [
    { icon: GlobeAltIcon, value: '190+', label: 'Countries' },
    { icon: UserGroupIcon, value: '2M+', label: 'Members' },
    { icon: ChatBubbleLeftRightIcon, value: '50K+', label: 'Communities' },
    { icon: RssIcon, value: '1M+', label: 'Daily Posts' }
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
     
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto border-b-2 border-gray-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl"
            >
              <stat.icon className="h-8 w-8 text-purple-400 mb-3" />
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-gray-400">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      whileHover={{ x: 3 }}
                      href="#"
                      className="text-base text-gray-400 hover:text-purple-400"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
