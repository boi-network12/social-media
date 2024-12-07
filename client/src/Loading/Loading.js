// Loading.jsx
import React from 'react';
import './Loading.css'; // Import CSS for the spinner

const Loading = () => {
    return (
        <div className="loading-container-hdg">
            <div className="spinner-p-hs"></div>
            <p className='loading-p-tag'>Loading...</p>
        </div>
    );
};

export default Loading;
