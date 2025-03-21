import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageSquare, Share2, Send, MessageCircle, HelpCircle, Image, Megaphone } from 'lucide-react';
import { toggleLike, isPostLiked, addComment, getComments } from '../utils/storage';

export default function Post1({ post, onUpdate }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likesCount, setLikesCount] = useState(post.likes);
  const [commentsCount, setCommentsCount] = useState(post.comments);

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
    setLikesCount((prev) => (newIsLiked ? prev + 1 : Math.max(0, prev - 1)));
    onUpdate();
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
              <h3 className="font-semibold text-gray-900">{post.author}</h3>
              <span className="text-gray-500 text-sm">
                {formatDistanceToNow(post.timestamp, { addSuffix: true })}
              </span>
            </div>

            <p className="mt-2 text-gray-700">{post.content}</p>

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
