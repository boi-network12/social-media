import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import config from "../config";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch posts for the authenticated user
    const fetchPosts = useCallback(async () => {
        if (!user) return;

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token available.");
                throw new Error("Authentication token missing.");
            }

            const response = await fetch(`${config.SERVER_URI}/image-post`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Response Status:", response.status);

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Error details:", errorDetails);
                throw new Error("Failed to fetch posts");
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Create a new post
    const createPost = async (formData) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            console.log("Token:", token);

            const response = await fetch(`${config.SERVER_URI}/image-post`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            console.log("Server response:", response);
            if (!response.ok) {
                const error = await response.json();
                console.error("Server error:", error);
                throw new Error("Failed to create post");
            }

            const { post } = await response.json();

            setPosts((prevPosts) => [post, ...prevPosts]);
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    };

    // Delete a post
    const deletePost = async (postId) => {
        setLoading(true);
        try {
            const response = await fetch(`${config.SERVER_URI}/image-post/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [user, fetchPosts]);

    return (
        <PostContext.Provider
            value={{
                posts,
                loading,
                createPost,
                deletePost,
                fetchPosts,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostContext);

    if (!context) {
        throw new Error("usePosts must be used within a PostProvider");
    }

    return context;
};
