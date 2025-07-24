import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import styles from "../styles/HomePage.module.css";
import { showConfetti } from "../utils/showConfetti";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RawPostFromQuery } from "../interfaces/interfaces";
import axios from "axios";

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<RawPostFromQuery[]>([]);

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
          {posts.length > 0 ? (
            posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => console.log("Like clicked")}
              onSave={() => console.log("Save clicked")}
            />
          ))
          ) : (
            <p className={styles.noPostsMessage}>There are no posts yet.<br/> Be the first to share something!</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
