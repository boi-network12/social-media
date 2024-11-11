import React from 'react'
import humanAvatar from "../../assets/avatar.jpg"
import { BiHappyAlt, BiImageAlt, BiPhotoAlbum, BiVideo } from "react-icons/bi"
import "./PostContent.css"

const PostContent = () => {
    return (
        <div className='PostContentWrapper'>
            <div className='PostContentTopDiv'>
                <img src={humanAvatar} alt="" />
                <input
                    type="text"
                    placeholder="what's on your mind, kam"
                />
                <BiImageAlt size={30} color='#333' className='PostImageIcon' />
            </div>
            <div className='PostContentBottomDiv'>
                <p>
                    <BiVideo size={22} />
                    <span>live video</span>
                </p>
                <p>
                    <BiPhotoAlbum size={22} />
                    <span>Photo/video</span>
                </p>
                <p>
                    <BiHappyAlt size={22} />
                    <span>live video</span>
                </p>
            </div>
        </div>
    )
}

export default PostContent