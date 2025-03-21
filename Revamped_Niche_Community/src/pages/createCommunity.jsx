import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'lucide-react';
import { createCommunity } from '../utils/storage';
import Header from '../components/header';
import Footer from '../components/footer';

export default function CreateCommunity() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const defaultCoverImage = 'https://source.unsplash.com/random/1200x400/?community';
    createCommunity(name, description, coverImage || defaultCoverImage)
      .then((community) => {
        console.log('Navigating to community:', community);
        navigate(`/community/${community.id}`);
      })
      .catch((error) => {
        console.error('Error creating community:', error);
      });
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center"
        style={{ backgroundImage: "url('https://imgcdn.stablediffusionweb.com/2024/11/16/89d10776-b4d8-4133-a654-e3bdd0492630.jpg')" }}
      >
        <div className="max-w-2xl w-full bg-gray-900 text-white shadow-2xl rounded-xl p-8 bg-opacity-90 backdrop-blur-md">
          <h1 className="text-3xl font-extrabold text-gray-100 text-center mb-6">
            Create a New Community
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-300">
                Community Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-gray-300"
                placeholder="Enter community name"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-medium text-gray-300">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-gray-300"
                placeholder="Describe your community..."
                required
              />
            </div>
            <div>
              <label htmlFor="coverImage" className="block text-lg font-medium text-gray-300">
                Cover Image URL (optional)
              </label>
              <div className="mt-2 flex rounded-lg shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500">
                <span className="inline-flex items-center px-3 bg-gray-100 rounded-l-lg text-gray-500">
                  <Image className="h-5 w-5" />
                </span>
                <input
                  type="url"
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="block w-full flex-1 p-3 rounded-r-lg focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">Leave empty to use a random community image.</p>
            </div>
            <div className="flex justify-end items-center space-x-4">
              <button
                type="button"
                onClick={() => navigate('/communities')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
              >
                Create Community
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
