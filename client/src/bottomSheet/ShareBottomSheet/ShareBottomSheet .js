import React from 'react';
import "../bottomSheet.css"

const ShareBottomSheet = ({ onClose }) => {
    return (
        <div className="BottomSheetOverlay" onClick={onClose}>
            <div className="BottomSheetWrapper" onClick={(e) => e.stopPropagation()}>
                <div className="BottomSheetHeader">
                    <button onClick={onClose}></button>
                </div>
                <div className="BottomSheetContent">
                    <h3>Share</h3>
                    <p>Share this post with others.</p>
                    {/* Add your share-related functionality here */}
                </div>
            </div>
        </div>
    );
};

export default ShareBottomSheet;
