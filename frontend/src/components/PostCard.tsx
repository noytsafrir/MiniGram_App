import React from 'react';
import styles from './PostCard.module.css';
import { FaHeart, FaRegHeart, FaRegComment, FaPaperPlane, FaBookmark, FaRegBookmark } from 'react-icons/fa';

interface PostCardProps {
  username: string;
  profileImage: string;
  timestamp: string;
  images: string[];
  caption: string;
  liked: boolean;
  saved: boolean;
  likes: number;
  comments: number;
  shares: number;
  onLike: () => void;
  onSave: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  username,
  profileImage,
  timestamp,
  images,
  caption,
  liked,
  saved,
  likes,
  comments,
  shares,
  onLike,
  onSave,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={profileImage} alt="profile" className={styles.avatar} />
        <div>
          <div className={styles.username}>{username}</div>
          <div className={styles.timestamp}>{timestamp}</div>
        </div>
      </div>


      {/* Image carousel */}
      <div className={styles.imageWrapper}>
        <img src={images[0]} alt="Post" className={styles.image} />
        {/* left/right arrows */}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <div className={styles.actionItem} onClick={onLike}>
            <span>{likes}</span>
          {liked ? <FaHeart color="red" /> : <FaRegHeart />}
        </div>

         <div className={styles.actionItem}>
            <span>{comments}</span>
            <FaRegComment />
        </div>

        <div className={styles.actionItem}>
            <span>{shares}</span>
            <FaPaperPlane />
        </div>
          
        <span onClick={onSave} style={{ marginLeft: 'auto' }}>
          {saved ? <FaBookmark /> : <FaRegBookmark />}
        </span>
      </div>

      {/* Caption */}
      <div className={styles.caption}>{caption}</div>
    </div>
  );
};

export default PostCard;
