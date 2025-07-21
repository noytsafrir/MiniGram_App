import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import styles from "../styles/CreatePostPage.module.css";

const CreatePostPage: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  useEffect(() => {
    return() => {
      images.forEach((image) => URL.revokeObjectURL(URL.createObjectURL(image)));
    };
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 5);
      setImages(selectedFiles);
    }
  };

  return (
    <AppLayout>
      <div className={styles.header}>
        <button className={styles.cancel}>Cancel</button>
        <h2 className={styles.title}>Create Post</h2>
        <button className={styles.post}>Post</button>
      </div>

      <div className={styles.uploadBox}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        <div className={styles.previewContainer}>
          {images.length === 0 && (
            <span className={styles.placeholder}>Upload Images (max 5)</span>
          )}
          {images.length > 0 && (
            <div className={styles.imageScroll}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className={styles.previewImage}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <textarea
        className={styles.captionInput}
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
    </AppLayout>
  );
};

export default CreatePostPage;
