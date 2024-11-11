import React, { useRef, useState, useEffect, useCallback } from 'react';
import { BiPlus, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import AvatarImage from "../../assets/avatar.jpg";
import StoriesImage from "../../assets/storiesImage.jpg";
import "./StoriesComponent.css";

const stories = [
    { id: 1, username: "kamdi hope", profileImage: AvatarImage, storiesContent: StoriesImage },
    { id: 2, username: "mark hope", profileImage: AvatarImage, storiesContent: StoriesImage },
    { id: 3, username: "king hope", profileImage: AvatarImage, storiesContent: StoriesImage },
    { id: 4, username: "honor hope", profileImage: AvatarImage, storiesContent: StoriesImage },
    { id: 5, username: "samuel hope", profileImage: AvatarImage, storiesContent: StoriesImage },
];

const StoriesComponent = () => {
    const wrapperRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Scroll function for desktop navigation
    const scroll = (direction) => {
        if (wrapperRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            wrapperRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Open modal and set story index
    const openModal = (index) => {
        setSelectedStoryIndex(index);
        setIsModalOpen(true);
        setIsPaused(false); // Resume story timer when modal opens
    };

    // Close modal
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setIsPaused(true); // Pause timer when modal is closed
    }, []); // Empty dependency array as it does not depend on any variables

    // Navigate stories by index
    const goToNextStory = useCallback(() => {
        if (selectedStoryIndex < stories.length - 1) {
            setSelectedStoryIndex(selectedStoryIndex + 1);
        } else {
            closeModal(); // Close modal if it's the last story
        }
    }, [selectedStoryIndex, closeModal]);

    const goToPreviousStory = () => {
        if (selectedStoryIndex > 0) {
            setSelectedStoryIndex(selectedStoryIndex - 1);
        }
    };

    // Timer for auto-progress stories
    useEffect(() => {
        if (!isPaused && isModalOpen) {
            const timer = setTimeout(() => {
                goToNextStory();
            }, 5000); // 5 seconds per story

            return () => clearTimeout(timer);
        }
    }, [selectedStoryIndex, isPaused, isModalOpen, goToNextStory]);


    // Hold to pause/resume functionality
    const handleHoldStart = () => setIsPaused(true);
    const handleHoldEnd = () => setIsPaused(false);

    return (
        <div className='StoriesComponentContainer'>
            <div
                className='StoriesComponentWrapper'
                ref={wrapperRef}
            >
                {/* Left Arrow */}
                <div className="navigation-arrow left" onClick={() => scroll('left')}>
                    <BiChevronLeft />
                </div>

                <div className='currentUserDiv'>
                    <img src={StoriesImage} alt="" />
                    <p>create story <span><BiPlus size={30} color='#fff' /></span></p>
                </div>

                {stories.map((story, index) => (
                    <div key={story.id} className='otherUserDiv' onClick={() => openModal(index)}>
                        <img className="storiesContent" src={story.storiesContent} alt="" />
                        <div className='otherUserDivAbsolute'>
                            <img src={story.profileImage} alt="" />
                            <p>{story.username}</p>
                        </div>
                    </div>
                ))}

                {/* Right Arrow */}
                <div className="navigation-arrow right" onClick={() => scroll('right')}>
                    <BiChevronRight />
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modalOverlay" onClick={closeModal}>
                    <div
                        className="modalContent"
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={handleHoldStart}
                        onTouchEnd={handleHoldEnd}
                    >
                        <span className="modalCloseButton" onClick={closeModal}>&times;</span>

                        <img src={stories[selectedStoryIndex].storiesContent} alt="Story Content" />
                        <p>{stories[selectedStoryIndex].username}</p>

                        {/* Click areas for next and previous story */}
                        <div className="modalNavigation left" onClick={goToPreviousStory}></div>
                        <div className="modalNavigation right" onClick={goToNextStory}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoriesComponent;
