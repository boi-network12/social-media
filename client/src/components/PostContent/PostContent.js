import React, { useState } from 'react'
import humanAvatar from "../../assets/avatar.jpg"
import { BiHappyAlt, BiImageAlt, BiPhotoAlbum, BiVideo } from "react-icons/bi"
import "./PostContent.css"
import { useAuth } from '../../context/authContext'
import PostContentModal from '../../Modal/PostContentModal/PostContentModal'

const PostContent = () => {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false)


    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };


    return (
        <div className='PostContentWrapper'>
            <div className='PostContentTopDiv'>
                <img src={user?.profilePicture || humanAvatar} alt="" />
                <input
                    type="text"
                    placeholder={`what's on your mind, ${user?.firstName || 'user'}`}
                    onClick={handleModalOpen}
                />
                <BiImageAlt size={30} color='#333' className='PostImageIcon' onClick={handleModalOpen} />
            </div>
            <div className='PostContentBottomDiv'>
                <p>
                    <BiVideo size={22} />
                    <span>live video</span>
                </p>
                <p onClick={handleModalOpen}>
                    <BiPhotoAlbum size={22} />
                    <span>Photo/video</span>
                </p>
                <p>
                    <BiHappyAlt size={22} />
                    <span>live video</span>
                </p>
            </div>
            {isModalOpen && <PostContentModal onClose={handleModalClose} user={user} humanAvatar={humanAvatar} />}
        </div>
    )
}

export default PostContent