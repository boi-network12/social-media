import React, { useEffect, useState } from 'react';
import "../bottomSheet.css";
import "./CommentBottomSheet.css";
import { useAuth } from '../../context/authContext';
import { BiSend } from "react-icons/bi";
import { useComments } from '../../context/CommentContext';

const CommentBottomSheet = ({ onClose, postId }) => {
    const { user } = useAuth();
    const [comment, setComment] = useState("");
    const [inputHeight, setInputHeight] = useState("40px");
    const { comments, loading, fetchComments, addComment } = useComments();

    useEffect(() => {
        fetchComments(postId);
    }, [postId, fetchComments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim()) {
            await addComment(postId, comment);
            setComment("");
        }
    };

    const handleChange = (e) => {
        setComment(e.target.value);
        setInputHeight(`${Math.max(40, e.target.scrollHeight)}px`);
    };

    const formatTime = (timestamp) => {
        const time = new Date(timestamp);
        return time.toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    return (
        <div className="BottomSheetOverlay" onClick={onClose}>
            <div className="BottomSheetWrapper" onClick={(e) => e.stopPropagation()}>
                <div className="BottomSheetHeader">
                    <button onClick={onClose}></button>
                </div>
                <div className="CommentWrapperBottomSheet">
                    <h3>Comments</h3>

                    <div className='CommentPreview'>
                        {loading ? (
                            <div>Loading comments...</div>
                        ) : (
                            comments.map((comment) => (
                                <div className='CommentItem' key={comment._id}>
                                    <img
                                        src={comment.userId.profilePicture || "default-avatar.jpg"}
                                        alt={comment.userId.firstName}
                                        className="CommentProfilePicture"
                                    />
                                    <div className="CommentDetails">
                                        <div className="CommentHeader">
                                            <span className="CommentUsername">
                                                {comment.userId.firstName} {comment.userId.lastName}
                                            </span>
                                            <span className="CommentTime">
                                                {formatTime(comment.createdAt)}
                                            </span>
                                        </div>
                                        <p className="CommentText">{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder={`Comment as ${user?.firstName}`}
                            value={comment}
                            onChange={handleChange}
                            style={{ height: inputHeight, resize: "none", overflow: "hidden" }}
                            rows={1}
                        />
                        <button type="submit">
                            <BiSend size={24} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentBottomSheet;
