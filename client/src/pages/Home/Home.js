import React from 'react'
import "./Home.css"
import PostContent from '../../components/PostContent/PostContent'
import StoriesComponent from '../../components/Stories/StoriesComponent'
import PostDisplayComponents from '../../components/PostDisplayCompoenets/PostDisplayComponents'
import FriendShow from '../../components/FriendsShow/FriendShow'

const Home = () => {
    return (
        <div className='MainHomeWrapper'>
            <div className='MainHomeLeftContainer'>L</div>
            <div className='MainHomeCenterContainer'>
                <PostContent />
                <StoriesComponent />
                <PostDisplayComponents />
            </div>
            <div className='MainHomeRightContainer'>
                <FriendShow />
            </div>
        </div>
    )
}

export default Home