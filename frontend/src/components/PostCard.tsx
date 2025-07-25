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
import { useDispatch } from "react-redux";
import { setLikeStatusForPost, setSaveStatusForPost } from "../redux/postSlice";
import moment from "moment";
import axios from "../api/axios";

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onSave }) => {
  const { user, photos, caption } = post;
  const [currentIndex, setCurrentIndex] = useState(0);
  const likes = post.likes;
  const isLiked = post.isLiked;
  const isSaved = post.isSaved;
  const totalImages = photos.length;
  const timeAgo = moment(post.createdAt).fromNow();
  const dispatch = useDispatch();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const handleLikeClick = async () => {
    const token = localStorage.getItem("token");
    const newLikedState = !isLiked;
    dispatch(setLikeStatusForPost({ postId: post.id, isLiked: newLikedState }));

    try {
      await axios.put(`/posts/post/${post.id}/like`,
        { isLiked: newLikedState },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to toggle like:", err);
      dispatch(setLikeStatusForPost({ postId: post.id, isLiked: newLikedState }));
    }
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");
    const newSaveState = !isSaved;
    dispatch(setSaveStatusForPost({ postId: post.id, isSaved: newSaveState }));

    try {
      await axios.put(`/posts/post/${post.id}/save`,
        { isSaved: newSaveState }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave();
    } catch (err) {
      console.error("Failed to save post:", err);
    }
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
        {totalImages > 1 && (
          <div className={styles.carouselControls}>
            <div className={styles.arrowLeft}>
              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                // className={`${styles.arrowLeft} ${currentIndex === 0 ? styles.disabledArrow : ""}`}
                >‹
                </button>
              )}
            </div>
            <div className={styles.arrowRight}>
              {currentIndex < totalImages - 1 && (
                <button
                  onClick={handleNext}
                // className={`${styles.arrowRight} ${currentIndex === totalImages - 1 ? styles.disabledArrow : ""}`}
                >›
                </button>
              )}
            </div>
          </div>
        )}
        {totalImages > 1 && (
          <div className={styles.positionIndicator}>
            {currentIndex + 1} / {totalImages}
          </div>
        )}

      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <div className={styles.actionItem} onClick={handleLikeClick}>
          <span>{likes}</span>
          {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
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

        <span onClick={handleSaveClick} style={{ marginLeft: "auto" }}>
          {isSaved ? <FaBookmark color="dodgerblue" /> : <FaRegBookmark />}
        </span>
      </div>

      {/* Caption */}
      <div className={styles.caption}>{caption}</div>
    </div>
  );
};

export default PostCard;
