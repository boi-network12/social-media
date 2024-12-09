import React, { createContext, useCallback, useContext, useState } from "react";
import config from "../config";
//import { useAuth } from "./authContext";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    //const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch comment for a post 
    const fetchComments = useCallback(async (postId) => {
        console.log("Fetching comments for postId:", postId);
        setLoading(true);
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                console.error("No token available");
                throw new Error("Authentication token missing.");
            }

            const response = await fetch(`${config.SERVER_URI}/image-post/${postId}/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Error details: ", errorDetails);
                throw new Error("Failed to fetch comments")
            }

            const data = await response.json();
            setComments(data);

        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false)
        }
    }, []);

    // create comment
    const addComment = async (postId, commentText, userId) => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem("token");

            const response = await fetch(`${config.SERVER_URI}/image-post/${postId}/comment`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: commentText, userId: userId })
            });


            if (!response.ok) {
                const error = await response.json();
                console.error("Server error:", error);
                throw new Error("Failed to add comment");
            }

            const { comment } = await response.json();
            setComments((prevComments) => [comment, ...prevComments]);

        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommentContext.Provider
            value={{
                comments,
                loading,
                fetchComments,
                addComment
            }}
        >
            {children}
        </CommentContext.Provider>
    )
};

export const useComments = () => {
    const context = useContext(CommentContext);

    if (!context) {
        throw new Error("useComments must be used within a CommentProvider");
    }

    return context;
}