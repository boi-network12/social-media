import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BiCommentEdit, BiCross, BiDotsHorizontal, BiLike, BiRepost, BiShareAlt } from 'react-icons/bi';
import avatarImage from "../../assets/avatar.jpg"; // Fallback avatar image
import "./PostDisplayComponents.css";
import { usePosts } from '../../context/imagePostContext';
import CommentBottomSheet from '../../bottomSheet/CommentBottomSheet/CommentBottomSheet';
import LikeBottomSheet from '../../bottomSheet/LikeBottomSheet/LikeBottomSheet';
import ShareBottomSheet from '../../bottomSheet/ShareBottomSheet/ShareBottomSheet ';
import PostMoreBottomSheet from '../../bottomSheet/PostMoreBottomSheet/PostMoreBottomSheet';


const reactionDisplay = [
    {
        id: 1,
        name: "like",
        icon: BiLike
    },
    {
        id: 2,
        name: "comment",
        icon: BiCommentEdit,
        type: "comments"
    },
    {
        id: 3,
        name: "repost",
        icon: BiRepost
    },
    {
        id: 4,
        name: "share",
        icon: BiShareAlt,
        type: "share"
    },
];


// New state for managing which bottom sheet to show


const PostDisplayComponents = () => {
    const { posts, fetchPosts, loading } = usePosts();
    const [expandedPosts, setExpandedPosts] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImagePreviewVisible, setImagePreviewVisible] = useState(false);


    // New state for managing which bottom sheet to show
    const [bottomSheetType, setBottomSheetType] = useState(null);


    useEffect(() => {
        fetchPosts(); // Fetch posts on component mount
    }, [fetchPosts]);

    const toggleReadMore = (id) => {
        setExpandedPosts(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (loading) {
        return <p>Loading posts...</p>;
    }


    const openBottomSheet = (type) => {
        setBottomSheetType(type);
    }

    const closeBottomSheet = () => {
        setBottomSheetType(null);
    }

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setImagePreviewVisible(true);
    };

    const ImagePreviewModal = ({ imageUrl, onClose }) => (
        <div className="image-preview-modal" onClick={onClose}>
            <div className="image-preview-modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt="Preview" />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );



    return (
        <>
            {posts.map((post) => (
                <div key={post._id} className="PostDisplayComponentsWrapper">
                    <div className="postDisplayTopHeader">
                        <div className="postDisplayTopHeaderUserInfo">
                            <img src={post.userId?.profilePicture || avatarImage} alt={post.userId?.username || 'User'} />
                            <aside>
                                <Link to="/">
                                    {post.userId?.firstName || 'Unknown'} {post.userId?.lastName || 'User'}
                                </Link>
                                <span>{new Date(post.createdAt).toLocaleString()}</span>
                                <span>{post.audience === 'public' ? 'Public' : 'Private'}</span>
                            </aside>
                        </div>

                        <div className="postDisplayBtnFunction">
                            <span onClick={() => openBottomSheet('post-more')}>
                                <BiDotsHorizontal />
                            </span>
                            <span>
                                <BiCross />
                            </span>
                        </div>
                    </div>

                    <div style={{ width: "100%", padding: "5px" }}>
                        <p className={expandedPosts[post._id] ? '' : 'truncated'}>
                            {post.caption || ''}
                        </p>
                        {post.caption && post.caption.length > 100 && (
                            <Link onClick={() => toggleReadMore(post._id)}>
                                {expandedPosts[post._id] ? 'Read Less' : 'Read More'}
                            </Link>
                        )}
                    </div>

                    <div className={`content ${Array.isArray(post.images) ? (
                        post.images.length === 1 ? 'single-image' :
                            post.images.length === 2 ? 'two-images' :
                                post.images.length === 3 ? 'three-images' :
                                    post.images.length === 4 ? 'four-images' : ''
                    ) : ''}`}>
                        {Array.isArray(post.images) && post.images.length > 0 && post.images.map((imageObj, index) => (
                            <img
                                key={imageObj._id || index}
                                src={imageObj.url}
                                alt={`content-${index}`}
                                onClick={() => handleImageClick(imageObj.url)}
                            />
                        ))}
                    </div>


                    <p onClick={() => openBottomSheet('likes')}>
                        {post.likes?.length || 0}
                        <BiLike />
                    </p>


                    <div className="forLikeCommentSendShare">
                        {reactionDisplay.map((reaction) => (
                            <p key={reaction.id} onClick={() => openBottomSheet(reaction.type)}>
                                {React.createElement(reaction.icon)}
                                <span>{reaction.name}</span>
                            </p>
                        ))}
                    </div>
                    {bottomSheetType === 'comments' && (
                        <CommentBottomSheet
                            onClose={closeBottomSheet}
                            postId={post._id}
                        />
                    )}
                    {bottomSheetType === 'likes' && <LikeBottomSheet onClose={closeBottomSheet} />}
                    {bottomSheetType === 'share' && <ShareBottomSheet onClose={closeBottomSheet} />}
                    {bottomSheetType === "post-more" && <PostMoreBottomSheet onClose={closeBottomSheet} />}
                </div>
            ))}

            {/* Conditional rendering for bottom sheets */}


            {/* Conditional rendering for image preview modal */}
            {isImagePreviewVisible && selectedImage && (
                <ImagePreviewModal
                    imageUrl={selectedImage}
                    onClose={() => setImagePreviewVisible(false)}
                />
            )}
        </>
    );
};

export default PostDisplayComponents;
