import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "../components/header";
import Footer from "../components/footer";
import { ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/outline";

const DATABASE_URL = "https://finanace-5dc1c-default-rtdb.asia-southeast1.firebasedatabase.app/posts";
const COMMENTS_URL = "https://finanace-5dc1c-default-rtdb.asia-southeast1.firebasedatabase.app/comments";

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios
            .get(`${DATABASE_URL}/${id}.json`)
            .then((response) => setPost(response.data))
            .catch((error) => console.error("Error fetching post:", error));

        axios
            .get(`${COMMENTS_URL}/${id}.json`)
            .then((response) => {
                if (response.data) {
                    const loadedComments = Object.values(response.data);
                    setComments(loadedComments);
                }
            })
            .catch((error) => console.error("Error fetching comments:", error));
    }, [id]);

    const addComment = () => {
        if (!newComment.trim()) return;

        const commentData = {
            text: newComment,
            createdAt: new Date().toISOString(),
        };

        axios
            .post(`${COMMENTS_URL}/${id}.json`, commentData)
            .then(() => {
                setComments([...comments, commentData]);
                setNewComment("");
            })
            .catch((error) => console.error("Error adding comment:", error));
    };

    const sharePost = () => {
        const postUrl = window.location.href;
        navigator.clipboard.writeText(postUrl);
        alert("Post link copied to clipboard! Share it with others.");
    };

    if (!post) return <p className="text-gray-400 text-center">Loading...</p>;

    return (
        <>
            <Header />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full min-h-screen text-white flex flex-col items-center bg-cover bg-center"
                style={{ backgroundImage: "url('/bg-com.png')" }}
            >

                <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg mt-6">
                    {/* Author and Community */}
                    <div className="flex items-center space-x-3">
                        {post.avatar && <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full" />}
                        <div>
                            <p className="text-sm text-gray-300">
                                <strong>{post.author}</strong> in {post.community}
                            </p>
                            <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Post Title */}
                    <h1 className="text-3xl font-bold mt-4">{post.title}</h1>

                    {/* Post Content with Proper Paragraphs */}
                    <div className="mt-4 space-y-4 text-gray-300">
                        {post.content.split("\n").map((paragraph, index) => (
                            <p key={index} className="leading-relaxed">{paragraph}</p>
                        ))}
                    </div>

                    {/* Share Button */}
                    <div className="flex items-center space-x-4 mt-6">
                        <button
                            onClick={sharePost}
                            className="flex items-center space-x-2 text-gray-300 hover:text-purple-600"
                        >
                            <ShareIcon className="h-5 w-5" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="w-full max-w-4xl p-6 bg-gray-800 mt-6 rounded-lg">
                    <h2 className="text-xl font-semibold">Comments</h2>
                    <div className="mt-2 space-y-4">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="p-3 bg-gray-700 rounded-lg text-gray-300">
                                    <p>{comment.text}</p>
                                    <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                    {/* Add Comment */}
                    <div className="mt-4 flex space-x-2">
                        <input
                            type="text"
                            className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={addComment} className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-white">
                            Comment
                        </button>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </>
    );
}

export default PostDetail;
