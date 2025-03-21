import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/outline";

const DATABASE_URL = "https://finanace-5dc1c-default-rtdb.asia-southeast1.firebasedatabase.app/postss.json";
const COMMENTS_URL = "https://finanace-5dc1c-default-rtdb.asia-southeast1.firebasedatabase.app/comments";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(DATABASE_URL)
            .then((response) => {
                if (response.data) {
                    const loadedPosts = Object.entries(response.data).map(([id, post]) => ({ id, ...post }));
                    setPosts(loadedPosts.reverse());
                }
            })
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4 relative">
            <div className="mt-6 space-y-4">
                {posts.length > 0 ? (
                    posts.map((post) => <FeedPost key={post.id} {...post} />)
                ) : (
                    <p className="text-gray-400 text-center text-sm sm:text-base">No posts yet. Be the first to post!</p>
                )}
            </div>
        </div>
    );
}

function FeedPost({ id, title, author, avatar, community, content = "", votes }) {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        axios
            .get(`${COMMENTS_URL}/${id}.json`)
            .then((response) => {
                if (response.data) {
                    setComments(Object.values(response.data));
                }
            })
            .catch((error) => console.error("Error fetching comments:", error));
    }, [id]);

    const handlePostClick = () => {
        navigate(`/post/${id}`);
    };

    const handleShare = (e) => {
        e.stopPropagation();
        const url = `${window.location.origin}/post/${id}`;
        if (navigator.share) {
            navigator.share({ title, text: content, url }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 text-white rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-800"
            onClick={handlePostClick}
        >
            <div className="flex items-center space-x-3 mb-2">
                <img src={avatar} alt={author} className="h-8 w-8 rounded-full" />
                <span className="text-xs sm:text-sm text-gray-300">
                    <strong>Posted by {author}</strong> in <strong className="text-purple-500 text-sm sm:text-lg">{community}</strong>
                </span>
            </div>
            <h2 className="text-sm sm:text-lg font-semibold">{title}</h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">{content.substring(0, 100)}...</p>
            <div className="flex items-center space-x-4 text-xs sm:text-md">
                <button className="text-gray-300 hover:text-purple-600" onClick={(e) => e.stopPropagation()}>
                    <ArrowUpIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <span>{votes}</span>
                <button className="text-gray-400 hover:text-purple-600" onClick={(e) => e.stopPropagation()}>
                    <ArrowDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowComments(!showComments);
                    }}
                    className="text-gray-300 hover:text-purple-600 flex items-center space-x-2"
                >
                    <ChatBubbleLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>{comments.length} Comments</span>
                </button>
                <button
                    onClick={handleShare}
                    className="text-gray-300 hover:text-purple-600 flex items-center space-x-2"
                >
                    <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Share</span>
                </button>
            </div>
            {showComments && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-gray-300 text-sm sm:text-md">Comments</h3>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="p-2 bg-gray-700 rounded-lg text-gray-300 mt-2">
                                <p className="text-xs sm:text-sm">{comment.text}</p>
                                <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-xs sm:text-sm">No comments yet.</p>
                    )}
                </div>
            )}
        </motion.div>
    );
}
export default Feed;