import React, { useRef, useState } from 'react'
import "./PostContentModal.css"
import { FaPlus, FaTrash } from "react-icons/fa"
import { usePosts } from '../../context/imagePostContext';
import Loading from '../../Loading/Loading';

const PostContentModal = ({ onClose, user, humanAvatar }) => {
  const { createPost } = usePosts();
  const [selectedImages, setSelectedImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [audience, setAudience] = useState("public")
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert('You can select a maximum of 4 images.');
      return;
    }
    setSelectedImages(files);
  }

  const handleClick = () => {
    fileInputRef.current.click();
  }

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // Check if both caption and images are empty
    if (!caption.trim() && selectedImages.length === 0) {
      alert("Caption and at least one image are required.");
      return;
    }

    const formData = new FormData();

    // Append images if any are selected
    selectedImages.forEach((image) => formData.append("images", image));

    // Append caption only if provided
    if (caption.trim()) {
      formData.append("caption", caption);
    }

    // Append audience (assuming it has a default value)
    formData.append("audience", audience);

    console.log("FormData: ", formData);

    await createPost(formData);

    // Reset form fields
    setSelectedImages([]);
    setCaption('');
    setAudience('private');
    onClose();
    setLoading(false);
  };



  return (
    <div className='PostContentModalOverlay' onClick={onClose}>
      <div className='PostContentModalWrapper' onClick={(e) => e.stopPropagation()}>
        <div className='CurrentUserInfoCOntainer'>
          <img src={user?.profilePicture || humanAvatar} alt="" />
          <aside>
            <p>{`${user?.firstName} ${user?.lastName}`}</p>
            <select value={audience} onChange={(e) => setAudience(e.target.value)}>
              <option value='private'>Private</option>
              <option value='friend'>Friend</option>
              <option value='public'>Public</option>
            </select>
          </aside>
        </div>

        {/* for the post content */}
        <form onSubmit={handleSubmit}>

          <textarea
            placeholder={`what's on your mind ${user?.firstName}`}
            cols="30"
            rows="10"
            maxLength={500}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>

          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className="FileSelector" onClick={handleClick}>
            <FaPlus />
            <p>Add Images</p>
          </div>
          <div className="ImagePreviewContainer">
            {selectedImages.map((image, index) => (
              <div className="ImagePreviewWrapper" key={index}>
                <img src={image} alt={`Selected ${index + 1}`} />
                <div
                  className="DeleteIconOverlay"
                  onClick={() => handleRemoveImage(index)}
                >
                  <FaTrash />
                </div>
              </div>
            ))}
          </div>

          <button>Submit</button>

        </form>

        {/* this is a place it will display the selected image */}
      </div>
      {loading && <Loading />}
    </div>
  )
}

export default PostContentModal