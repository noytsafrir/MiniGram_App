import React from "react";
import styles from "./PostCard.module.css";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaPaperPlane,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { RawPostFromQuery } from "../pages/HomePage";

interface PostCardProps {
  // username: string;
  // profileImage: string;
  // timestamp: string;
  // images: string[];
  // caption: string;
  // liked: boolean;
  // saved: boolean;
  // likes: number;
  // comments: number;
  // shares: number;
  post: RawPostFromQuery;
  onLike: () => void;
  onSave: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onSave }) => {
  const { user, photos, caption } = post;
  console.log("PostCard props:", post);
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={user.profileImg} alt="profile" className={styles.avatar} />
        <div>
          <div className={styles.username}>{user.username}</div>
          <div className={styles.timestamp}>{post.createdAt}</div>
        </div>
      </div>

      {/* Image carousel */}
      <div className={styles.imageWrapper}>
        <img src={photos[0].imageUrl} alt="Post" className={styles.image} />
        {/* left/right arrows */}
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
