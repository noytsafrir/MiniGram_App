import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import styles from "../styles/CreatePostPage.module.css";
import axios from "../api/axios";

const CreatePostPage: React.FC = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    return () => {
      photos.forEach((photo) =>
        URL.revokeObjectURL(URL.createObjectURL(photo))
      );
    };
  }, [photos]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const totalPhotos = photos.length + selectedFiles.length;
      if (totalPhotos > 5) {
        setError("You can upload up to 5 photos only.");
        return;
      }
      setPhotos((prevphotos) => [...prevphotos, ...selectedFiles]);
      setError(""); // Clear error if everything is fine
    }
  };

  const handleDeleteImage = (indexToRemove: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (photos.length === 0) {
      setError("Please upload at least one photo.");
      //set buttom to disabled
      
      return;
    }

    const formData = new FormData();
    photos.forEach((photo) => formData.append("images", photo));
    formData.append("caption", caption);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      alert("Post created successfully!");
      setPhotos([]);
      setCaption("");
      navigate("/home"); 
    } catch (err) {
      console.error("Post creation failed:", err);
      setError("Failed to create post. Please try again.");
    }
  };

  const handleCancel = () => {
    setPhotos([]);
    setCaption("");
    navigate("/home");
  };

  return (
    <AppLayout>
      <div className={styles.header}>
        <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
        <h2 className={styles.title}>Create Post</h2>
        <button className={styles.post} onClick={handleSubmit} disabled={photos.length === 0}>
          Post
        </button>
      </div>

      <div className={styles.uploadBox}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className={styles.fileInput}
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.previewContainer}>
          {photos.length === 0 && (
            <span className={styles.placeholder}>Upload Photos (max 5)</span>
          )}
          {photos.length > 0 && (
            <div className={styles.photoscroll}>
              {photos.map((photo, index) => (
                <div key={index} className={styles.imageBox}>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`preview-${index}`}
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDeleteImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <textarea
        className={styles.captionInput}
        placeholder="Write a caption..."
        value={caption}
        maxLength={100}
        onChange={(e) => setCaption(e.target.value)}
      />
    </AppLayout>
  );
};

export default CreatePostPage;
