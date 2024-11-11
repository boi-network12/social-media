import React from 'react'
import "./FriendShow.css"
import { Link } from "react-router-dom"
import avatarImage from "../../assets/avatar.jpg"

const userRequest = [
    {
        id: 1,
        image: avatarImage,
        name: "chong wei",
        time: "1d",
    },
    {
        id: 2,
        image: avatarImage,
        name: "hong wei",
        time: "23d",
    },
]

const userYouMayKnow = [
    {
        id: 1,
        image: avatarImage,
        name: "chong wei",
        time: "1d",
    },
    {
        id: 2,
        image: avatarImage,
        name: "hong wei",
        time: "23d",
    },
]

const FriendShow = () => {
    return (
        <div className='FriendShowWrapper'>
            <div className='friendRequestReview'>
                <h1>
                    <p>friend requests</p>
                    <Link>see all</Link>
                </h1>
                {userRequest.length > 0 && userRequest.map((friendRequest) => (
                    <div key={friendRequest.id} className='friendRequestDisplay'>
                        <img src={friendRequest.image} alt="" />
                        <div className='writtenInfoFriendRequest'>
                            <h5>{friendRequest.name} <span>{friendRequest.time}</span></h5>

                            <p>
                                <button
                                    style={{ background: "#1877f2", color: "#fff" }}
                                >confirm</button>
                                <button
                                    style={{ background: "#f2f2f2", color: "#000" }}
                                >delete</button>
                            </p>
                        </div>
                    </div>
                ))}

            </div>

            {/* you may know */}
            <div className='friendRequestReview'>
                <h1>
                    <p>you may know</p>
                    <Link>see all</Link>
                </h1>
                {userYouMayKnow.length > 0 && userRequest.map((friendRequest) => (
                    <div key={friendRequest.id} className='friendRequestDisplay'>
                        <img src={friendRequest.image} alt="" />
                        <div className='writtenInfoFriendRequest'>
                            <h5>{friendRequest.name} <span>{friendRequest.time}</span></h5>

                            <p>
                                <button
                                    style={{ background: "#1877f2", color: "#fff" }}
                                >add friend</button>
                                <button
                                    style={{ background: "#f2f2f2", color: "#000" }}
                                >delete</button>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FriendShow