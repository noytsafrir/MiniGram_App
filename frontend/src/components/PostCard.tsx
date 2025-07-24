import React, { useState } from "react";
import styles from "./PostCard.module.css";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaPaperPlane,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { PostCardProps } from "../interfaces/interfaces";
import moment from "moment";

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onSave }) => {
  const { user, photos, caption } = post;
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = photos.length;
  const timeAgo = moment(post.createdAt).fromNow();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {user.profileImg ? (
          <img src={user.profileImg} alt="profile" className={styles.avatar} />
        ) : (
          <div className={styles.defaultAvatar}>
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}        <div>
          <div className={styles.username}>{user.username}</div>
          <div className={styles.timestamp}>{timeAgo}</div>
        </div>
      </div>

      {/* Image carousel */}
      <div className={styles.imageWrapper}>
        <img
          src={photos[currentIndex].imageUrl}
          alt={`Post image ${currentIndex + 1}`}
          className={styles.image}
        />

        <div className={styles.carouselControls}>
          <button
            onClick={handlePrev}
            className={`${styles.arrowLeft} ${currentIndex === 0 ? styles.disabledArrow : ""}`}
            disabled={currentIndex === 0}>‹
          </button>

          <button
            onClick={handleNext}
            className={`${styles.arrowRight} ${currentIndex === totalImages - 1 ? styles.disabledArrow : ""}`}
            disabled={currentIndex === totalImages - 1}>›
          </button>
        </div>

        {totalImages > 1 && (
          <div className={styles.positionIndicator}>
            {currentIndex + 1} / {totalImages}
          </div>
        )}

      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <div className={styles.actionItem} onClick={onLike}>
          {/* <span>{likes}</span> */}
          {
            //TODO: Replace with actual like count
          }
          <span>0</span>
          {
            //TODO: Replace with actual like count
          }
          {true ? <FaHeart color="red" /> : <FaRegHeart />}
        </div>

        <div className={styles.actionItem}>
          {/* <span>{comments}</span> */}
          <span>0</span>
          <FaRegComment />
        </div>

        <div className={styles.actionItem}>
          {/* <span>{shares}</span> */}
          <span>0</span>
          <FaPaperPlane />
        </div>

        <span onClick={onSave} style={{ marginLeft: "auto" }}>
          {
            // TODO: Replace with actual save state
          }
          {true ? <FaBookmark /> : <FaRegBookmark />}
        </span>
      </div>

      {/* Caption */}
      <div className={styles.caption}>{caption}</div>
    </div>
  );
};

export default PostCard;
