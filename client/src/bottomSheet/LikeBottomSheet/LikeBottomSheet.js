import React from 'react';
import "../bottomSheet.css"

const LikeBottomSheet = ({ onClose }) => {
    return (
        <div className="BottomSheetOverlay" onClick={onClose}>
            <div className="BottomSheetWrapper" onClick={(e) => e.stopPropagation()}>
                <div className="BottomSheetHeader">
                    <button onClick={onClose}></button>
                </div>
                <div className="BottomSheetContent">
                    <h3>Likes</h3>
                    <p>See and add likes to this post.</p>
                    {/* Add your like-related functionality here */}
                </div>
            </div>
        </div>
    );
};

export default LikeBottomSheet;