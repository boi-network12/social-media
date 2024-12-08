import React from 'react'
import "./PostContentModal"

const PostContentModal = ({ onClose }) => {
  return (
    <div className='PostContentModalOverlay' onClick={onClose}>
      <div className='PostContentModalWrapper'>
        <h2>PostContentModal</h2>
      </div>
    </div>
  )
}

export default PostContentModal