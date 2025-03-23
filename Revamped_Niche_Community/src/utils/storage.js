import { ref, set, get, push, update, remove } from "firebase/database";
import { db } from "../firebaseConfig/firebase";
import { auth } from "../firebaseConfig/firebase";

// Get the current authenticated user
export const getCurrentUser = () => {
    return auth.currentUser ? auth.currentUser.uid : null; // Return user ID
};

export const getCurrentUserEmail = () => {
    return auth.currentUser ? auth.currentUser.email : null; // Return user email
};

// Community Management
export const getCommunities = async () => {
    const communitiesRef = ref(db, "communities");
    const snapshot = await get(communitiesRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export const createCommunity = async (name, description, coverImage) => {
    const userId = getCurrentUser();
    if (!userId) throw new Error("User not authenticated");

    const communitiesRef = ref(db, "communities");
    const newCommunityRef = push(communitiesRef);
    const newCommunity = {
        id: newCommunityRef.key,
        name,
        description,
        createdAt: Date.now(),
        createdBy: userId,
        members: [userId],
        coverImage,
    };

    await set(newCommunityRef, newCommunity);
    return newCommunity;
};

export const joinCommunity = async (communityId) => {
    const userId = getCurrentUser();
    if (!userId) throw new Error("User not authenticated");

    const communityRef = ref(db, `communities/${communityId}/members`);
    const snapshot = await get(communityRef);
    const currentMembers = snapshot.exists() ? snapshot.val() : [];

    if (!Array.isArray(currentMembers)) throw new Error("Members field is not an array");
    if (!currentMembers.includes(userId)) {
        await set(communityRef, [...currentMembers, userId]);
    }
};

export const leaveCommunity = async (communityId) => {
    const userId = getCurrentUser();
    if (!userId) throw new Error("User not authenticated");

    const communityRef = ref(db, `communities/${communityId}/members`);
    const snapshot = await get(communityRef);
    const currentMembers = snapshot.exists() ? snapshot.val() : [];

    if (!Array.isArray(currentMembers)) throw new Error("Members field is not an array");
    await set(communityRef, currentMembers.filter((m) => m !== userId));
};

export const isMember = async (communityId) => {
    const userId = getCurrentUser();
    if (!userId) return false;

    const communityRef = ref(db, `communities/${communityId}/members`);
    const snapshot = await get(communityRef);
    const currentMembers = snapshot.exists() ? snapshot.val() : [];
    return Array.isArray(currentMembers) && currentMembers.includes(userId);
};

// Post Management
export const getPosts = async (communityId) => {
    const postsRef = ref(db, `posts/${communityId}`);
    const snapshot = await get(postsRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export const addPost = async (communityId, content, mediaUrls = [], type = "discussion", authorEmail) => {
    const userId = getCurrentUser();
    if (!userId) throw new Error("User not authenticated");

    const postsRef = ref(db, `posts/${communityId}`);
    const newPostRef = push(postsRef);
    const newPost = {
        id: newPostRef.key,
        communityId,
        content,
        authorId: userId, // Store user ID
        author: authorEmail, // Store user email
        timestamp: Date.now(),
        likes: 0,
        comments: 0,
        mediaUrls,
        type,
    };

    await set(newPostRef, newPost);
    return newPost;
};


export const deletePost = async (communityId, postId) => {
    const postRef = ref(db, `posts/${communityId}/${postId}`);
    await remove(postRef);
};

export const updatePost = async (communityId, postId, newContent) => {
    const postRef = ref(db, `posts/${communityId}/${postId}`);
    await update(postRef, { content: newContent }); // ✅ Update only the content field
};


// Comment Management
export const getComments = async (postId) => {
    const commentsRef = ref(db, `comments/${postId}`);
    const snapshot = await get(commentsRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export const addComment = async (postId, content) => {
    const userId = getCurrentUser();
    const userEmail = getCurrentUserEmail();
    if (!userId) throw new Error("User not authenticated");

    const commentsRef = ref(db, `comments/${postId}`);
    const newCommentRef = push(commentsRef);
    const newComment = {
        id: newCommentRef.key,
        postId,
        content,
        authorId: userId,
        author: userEmail, // Store user email
        timestamp: Date.now(),
        likes: 0,
    };

    await set(newCommentRef, newComment);

    // Update post comment count
    const postRef = ref(db, `posts/${postId.split("_")[0]}/${postId}`);
    const postSnapshot = await get(postRef);
    if (postSnapshot.exists()) {
        const post = postSnapshot.val();
        await update(postRef, { comments: (post.comments || 0) + 1 });
    }
    return newComment;
};

// Like Management
export const toggleLike = async (postId) => {
    const userId = getCurrentUser();
    if (!userId) throw new Error("User not authenticated");

    console.log("Toggling like for:", postId, "by user:", userId);

    const likesRef = ref(db, `likes/${userId}/${postId}`);
    const snapshot = await get(likesRef);
    const isLiked = snapshot.exists() ? snapshot.val() : false;

    console.log("Current like status in DB:", isLiked);

    const postRef = ref(db, `posts/${postId}`);
    const postSnapshot = await get(postRef);

    if (!postSnapshot.exists()) {
        console.error("❌ Post not found in DB!");
        return false;
    }

    const post = postSnapshot.val();
    const newLikeCount = post.likes + (isLiked ? -1 : 1);

    console.log("✅ Updating like count in DB to:", newLikeCount);

    await update(postRef, { likes: newLikeCount });

    if (isLiked) {
        console.log("Removing like from DB");
        await remove(likesRef);
    } else {
        console.log("Adding like to DB");
        await set(likesRef, true);
    }

    return !isLiked;
};
export const isPostLiked = async (postId) => {
    const userId = getCurrentUser();
    if (!userId) {
        console.log("🚫 User not authenticated, returning false.");
        return false;
    }

    const likeRef = ref(db, `likes/${userId}/${postId}`);
    const snapshot = await get(likeRef);

    return snapshot.exists();
};