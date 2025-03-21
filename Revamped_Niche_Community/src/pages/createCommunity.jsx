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
    <Header/>
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create a New Community</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Community Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter community name"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe your community..."
              required
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
              Cover Image URL (optional)
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                <Image className="h-5 w-5" />
              </span>
              <input
                type="url"
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Leave empty to use a random community image
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/communities')}
              className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Community
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}
