import React, { useState, useEffect, use } from "react";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import styles from "../styles/HomePage.module.css";
import { showConfetti } from "../utils/showConfetti";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";

export interface RawUser {
  id: string;
  username: string;
  profileImg: string;
}

export interface RawPhoto {
  id: string;
  imageUrl: string;
  postId: string;
}

export interface RawPostFromQuery {
  id: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
  userId: string;

  // From the SQL json_build_object
  user: RawUser;

  // From the SQL json_agg
  photos: RawPhoto[];
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<RawPostFromQuery[]>([]);

  const samplePosts = [
    {
      username: "NoyNoy",
      profileImage: "/stitch.png",
      timestamp: "2 hours ago",
      images: ["/beach.png"],
      caption: "Loving the summer!",
      liked: false,
      saved: false,
      likes: 123,
      comments: 45,
      shares: 10,
    },
    {
      username: "Danny Bannany",
      profileImage: "/logo512.png",
      timestamp: "just now",
      images: ["/beach2.png"],
      caption: "First post on Minigram!",
      liked: true,
      saved: false,
      likes: 75,
      comments: 20,
      shares: 3,
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const shouldCelebrate = localStorage.getItem("justLoggedIn") === "true";
    if (shouldCelebrate) {
      showConfetti();
      localStorage.removeItem("justLoggedIn");
    }
  }, []);

  const user = useSelector((state: RootState) => state.auth.user);
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  return (
    <AppLayout>
      <div className={styles.container}>
        <h1 className={styles.h1}>
          {" "}
          Welcome {firstName} {lastName}! 🎉
        </h1>
        <div className={styles.postsContainer}>
          {posts.map((post, index) => (
            <PostCard
              key={index}
              post={post}
              onLike={() => console.log("Like clicked")}
              onSave={() => console.log("Save clicked")}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
