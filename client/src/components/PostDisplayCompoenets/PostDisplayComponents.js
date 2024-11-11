import React, { useState } from 'react'
import firstImage from "../../assets/storiesImage.jpg";
import secondImage from "../../assets/car1.jpg";
import thirdImage from "../../assets/car2.jpg";
import fortImage from "../../assets/car3.jpg";
import avatarImage from "../../assets/avatar.jpg"
import "./PostDisplayComponents.css"
import { Link } from "react-router-dom"
import { BiCommentEdit, BiCross, BiDotsHorizontal, BiLike, BiRepost, BiShareAlt } from 'react-icons/bi';

const postContentDisplay = [
    {
        id: 1,
        userName: "soft men",
        desc: "HAPPIEST BIRTHDAY 🎂 LOVE ❤ WISH U ALL UR HEART DESIRE MORE NOVEMBER 11 CELEBRATE UR NEW AGE IS BLESSED HAPPY BIRTHDAY ONCE AGAIN BIG INESS BEBIE SOFT MENDY CARES LOVE ",
        avatarImage: avatarImage,
        content: [firstImage, secondImage, thirdImage],
        getComputedStyle: {},
        time: "2h",
        likeCount: 103,
    },
    {
        id: 2,
        userName: "kam men",
        desc: "HAPPIEST BIRTHDAY 🎂 LOVE ❤ WISH U ALL UR HEART DESIRE MORE NOVEMBER 11 CELEBRATE UR NEW AGE IS BLESSED HAPPY BIRTHDAY ONCE AGAIN BIG INESS BEBIE SOFT MENDY CARES LOVE ",
        avatarImage: avatarImage,
        content: [firstImage, thirdImage],
        getComputedStyle: {},
        time: "1h",
        likeCount: 403,
    },
    {
        id: 3,
        userName: "soft john",
        desc: "HAPPIEST BIRTHDAY 🎂 LOVE ❤ WISH U ALL UR HEART DESIRE MORE NOVEMBER 11 CELEBRATE UR NEW AGE IS BLESSED HAPPY BIRTHDAY ONCE AGAIN BIG INESS BEBIE SOFT MENDY CARES LOVE ",
        avatarImage: avatarImage,
        content: [firstImage],
        getComputedStyle: {},
        time: "2",
        likeCount: 50,
    },
    {
        id: 4,
        userName: "soft john",
        desc: "HAPPIEST BIRTHDAY 🎂 LOVE ❤ WISH U ALL UR HEART DESIRE MORE NOVEMBER 11 CELEBRATE UR NEW AGE IS BLESSED HAPPY BIRTHDAY ONCE AGAIN BIG INESS BEBIE SOFT MENDY CARES LOVE ",
        avatarImage: avatarImage,
        content: [firstImage, fortImage, secondImage, thirdImage],
        getComputedStyle: {},
        time: "2",
        likeCount: 100,
    },
    {
        id: 5,
        userName: "soft hope",
        desc: "HAPPIEST BIRTHDAY 🎂 LOVE ❤ WISH U ALL UR HEART DESIRE MORE NOVEMBER 11 CELEBRATE UR NEW AGE IS BLESSED HAPPY BIRTHDAY ONCE AGAIN BIG INESS BEBIE SOFT MENDY CARES LOVE ",
        avatarImage: avatarImage,
        content: [""],
        getComputedStyle: {},
        time: "2",
        likeCount: 0,
    },
]

const reactionDisplay = [
    {
        id: 1,
        name: "like",
        icon: BiLike
    },
    {
        id: 2,
        name: "comment",
        icon: BiCommentEdit
    },
    {
        id: 3,
        name: "repost",
        icon: BiRepost
    },
    {
        id: 4,
        name: "share",
        icon: BiShareAlt
    },
]


const PostDisplayComponents = () => {
    const [expandedPosts, setExpandedPosts] = useState({});

    const toggleReadMore = (id) => {
        setExpandedPosts(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }
    return (
        <>
            {
                postContentDisplay.map((component) => (
                    <div
                        key={component.id} className='PostDisplayComponentsWrapper'>
                        <div
                            className='postDisplayTopHeader'
                        >
                            <p className='postDisplayTopHeaderUserInfo'>
                                <img src={component.avatarImage} alt={component.userName} />
                                <aside>
                                    <Link to="/">{component.userName}</Link>
                                    <span>{component.time}</span>
                                </aside>
                            </p>

                            <div
                                className='postDisplayBtnFunction'
                            >
                                <span>
                                    <BiDotsHorizontal />
                                </span>
                                <span>
                                    <BiCross />
                                </span>
                            </div>
                        </div>


                        <div style={{ width: "100%", padding: "5px" }}>
                            <p className={expandedPosts[component.id] ? '' : 'truncated'}>
                                {component.desc}
                            </p>
                            <Link onClick={() => toggleReadMore(component.id)}>
                                {expandedPosts[component.id] ? 'Read Less' : 'Read More'}
                            </Link>
                        </div>

                        <div className={`content ${component.content.length === 1 ? 'single-image' : component.content.length === 2 ? 'two-images' : 'three-images'}`}>
                            {component.content.map((image, index) => (
                                image && (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`content-${index}`}
                                    />
                                )
                            ))}
                        </div>
                        <p>{component.likeCount} <BiLike /> </p>

                        <div className='forLikeCommentSendShare'>
                            {reactionDisplay.map((reaction) => (
                                <p key={reaction.id}>
                                    {React.createElement(reaction.icon)}
                                    <span>{reaction.name}</span>
                                </p>
                            ))}
                        </div>

                    </div>
                ))
            }
        </>
    )
}

export default PostDisplayComponents