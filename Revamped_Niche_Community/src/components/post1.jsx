import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageSquare, Share2, Send, MessageCircle, HelpCircle, Image, Megaphone, Trash, Edit } from 'lucide-react';
import { toggleLike, isPostLiked, addComment, getComments, deletePost, updatePost } from '../utils/storage';
import { useAuth } from '../contexts/authContext';

export default function Post1({ post, onUpdate }) {
    const {currentUser} = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [likesCount, setLikesCount] = useState(post.likes);
    const [commentsCount, setCommentsCount] = useState(post.comments);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);

    useEffect(() => {
        const checkLikeStatus = async () => {
            const liked = await isPostLiked(post.id);
            setIsLiked(liked);
        };
        checkLikeStatus();
    }, [post.id]);

    useEffect(() => {
        const fetchComments = async () => {
            const fetchedComments = await getComments(post.id);
            setComments(fetchedComments);
            setCommentsCount(fetchedComments.length);
        };
        fetchComments();
    }, [post.id]);

    const handleLike = async () => {
        const newIsLiked = await toggleLike(post.id);

        setIsLiked(newIsLiked);

        setLikesCount((prevLikes) => {
            const newCount = newIsLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1);
            console.log("✅ Updating state - New Likes Count:", newCount);
            return newCount;
        });

        onUpdate();
    };

    const handleDelete = async () => {
        if (!currentUser) return;
        try {
            await deletePost(post.communityId, post.id); // ✅ Pass communityId
            console.log(`✅ Post ${post.id} deleted`);
            onUpdate(); // Ensure this actually refreshes the posts
        } catch (error) {
            console.error("❌ Error deleting post:", error);
        }
    };

    const handleEdit = async () => {
        if (!currentUser) return;
        if (isEditing) {
            try {
                await updatePost(post.communityId, post.id, editedContent); // ✅ Pass communityId
                console.log(`✅ Post ${post.id} updated with new content: ${editedContent}`);
                onUpdate();
            } catch (error) {
                console.error("❌ Error updating post:", error);
            }
        }
        setIsEditing(!isEditing);
    };

    const handleToggleComments = async () => {
        setShowComments(!showComments);
        if (!showComments) {
            const fetchedComments = await getComments(post.id);
            setComments(fetchedComments);
            setCommentsCount(fetchedComments.length);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        await addComment(post.id, newComment);
        setNewComment('');
        const updatedComments = await getComments(post.id);
        setComments(updatedComments);
        setCommentsCount(updatedComments.length);
        onUpdate();
    };

    const handleShare = async () => {
        const postUrl = `${window.location.origin}/post/${post.id}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.content,
                    text: post.content,
                    url: postUrl,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(postUrl);
            alert('Post link copied to clipboard!');
        }
    };

    const getPostTypeStyles = () => {
        switch (post.type) {
            case 'question':
                return {
                    containerClass: 'border-l-4 border-yellow-500',
                    icon: <HelpCircle className="w-6 h-6 text-yellow-500" />,
                    bgClass: 'bg-yellow-50',
                };
            case 'announcement':
                return {
                    containerClass: 'border-l-4 border-red-500',
                    icon: <Megaphone className="w-6 h-6 text-red-500" />,
                    bgClass: 'bg-red-50',
                };
            case 'media':
                return {
                    containerClass: 'border-l-4 border-purple-500',
                    icon: <Image className="w-6 h-6 text-purple-500" />,
                    bgClass: 'bg-purple-50',
                };
            default:
                return {
                    containerClass: 'border-l-4 border-indigo-500',
                    icon: <MessageCircle className="w-6 h-6 text-indigo-500" />,
                    bgClass: 'bg-white',
                };
        }
    };

    const { containerClass, icon, bgClass } = getPostTypeStyles();

    return (
        <div className={`rounded-lg shadow-md ${containerClass} ${bgClass}`}>
            <div className="p-6">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{icon}</div>
                    <div className="flex-1">
                        <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{post.author}</h3>
                            <span className="text-gray-700 text-md sm:text-md">
                                {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                            </span>
                        </div>

                        {isEditing ? (
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            />
                        ) : (
                            <p className="mt-2 text-gray-700">{post.content}</p>
                        )}

                        <div className="mt-2 flex space-x-2">
                            <button
                                onClick={handleEdit}
                                className={`px-4 py-2 text-white rounded ${isEditing && 'bg-green-500 hover:bg-green-600'}`}
                            >
                                {isEditing && "Save"}
                            </button>
                            {isEditing && (
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>


                        {post.mediaUrls && post.mediaUrls.length > 0 && (
                            <div className="mt-3 grid gap-2 grid-cols-2">
                                {post.mediaUrls.map((url, index) => (
                                    <img key={index} src={url} alt="Post media" className="rounded-lg w-full h-48 object-cover" />
                                ))}
                            </div>
                        )}

                        <div className="mt-4 flex items-center space-x-6">
                            <button onClick={handleLike} className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}>
                                <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                                <span>{likesCount}</span>
                            </button>

                            <button onClick={handleToggleComments} className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors">
                                <MessageSquare className="w-5 h-5" />
                                <span>{commentsCount}</span>
                            </button>

                            <button onClick={handleShare} className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors">
                                <Share2 className="w-5 h-5" />
                                <span>Share</span>
                            </button>

                            <button onClick={handleDelete} className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors">
                                <Trash className="w-5 h-5" />
                                <span>Delete</span>
                            </button>

                            <button onClick={handleEdit} className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors">
                                <Edit className="w-5 h-5" />
                                <span>Edit</span>
                            </button>

                        </div>

                        {showComments && (
                            <div className="mt-4 space-y-4">
                                <form onSubmit={handleAddComment} className="flex space-x-2">
                                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>

                                <div className="space-y-3">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="bg-white p-3 rounded-lg shadow-sm">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-semibold text-sm">{comment.author}</span>
                                                <span className="text-gray-500 text-xs">
                                                    {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-gray-700">{comment.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
