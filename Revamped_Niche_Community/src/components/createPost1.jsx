import React, { useState, useRef } from 'react';
import { Image, Send, MessageCircle, HelpCircle, Megaphone } from 'lucide-react';
import { addPost } from '../utils/storage';
import { useParams } from 'react-router-dom';

export default function CreatePost1({ onPostCreated, currentUserEmail }) {
    const { id: communityId } = useParams();
    const [content, setContent] = useState('');
    const [mediaUrls, setMediaUrls] = useState([]);
    const [postType, setPostType] = useState('discussion');
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim() && mediaUrls.length === 0) return;
        if (!communityId) return;

        // Include the current user's email when creating a post
        addPost(communityId, content, mediaUrls, postType, currentUserEmail);
        setContent('');
        setMediaUrls([]);
        setPostType('discussion');
        onPostCreated();
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const demoImageUrl = 'https://source.unsplash.com/random/800x600';
        setMediaUrls((prev) => [...prev, demoImageUrl]);
    };

    const postTypes = [
        { type: 'discussion', icon: <MessageCircle className="w-5 h-5" />, label: 'Discussion' },
        { type: 'question', icon: <HelpCircle className="w-5 h-5" />, label: 'Question' },
        { type: 'media', icon: <Image className="w-5 h-5" />, label: 'Media' },
        { type: 'announcement', icon: <Megaphone className="w-5 h-5" />, label: 'Announcement' },
    ];

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
            <div className="mb-4 flex flex-wrap justify-center sm:justify-start gap-2">
                {postTypes.map(({ type, icon, label }) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => setPostType(type)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${postType === type
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {icon}
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Share your ${postType}...`}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={3}
            />

            {mediaUrls.length > 0 && (
                <div className="mt-3 grid gap-2 grid-cols-2">
                    {mediaUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt="Upload preview"
                            className="rounded-lg w-full h-48 object-cover"
                        />
                    ))}
                </div>
            )}

            <div className="mt-3 flex justify-between items-center">
                <div className="flex space-x-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                    >
                        <Image className="w-5 h-5" />
                        <span>Add Media</span>
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
                >
                    <Send className="w-4 h-4" />
                    <span>Post</span>
                </button>
            </div>
        </form>
    );
}