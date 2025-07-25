import React, { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import styles from "../styles/HomePage.module.css";
import { showConfetti } from "../utils/showConfetti";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { RawPostFromQuery } from "../interfaces/interfaces";
import { getPosts, setPosts } from "../redux/postSlice";
import axios from "axios";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setPosts(res.data));
        console.log("Posts fetched successfully:", res.data);
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
  const posts = useSelector(getPosts);
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  // const handleLike = (postId: string, shouldLike: boolean) => {
  //   setPosts((prevPosts) =>
  //     prevPosts.map((post) =>
  //       post.id === postId
  //         ? { ...post, likes: post.likes + (shouldLike ? 1 : -1)} 
  //         : post
  //     )
  //   );
  //   console.log(`Liked post with ID: ${postId}`);
  // };

  const handleSave = (postId: string) => {
    // Dispatch save action or handle save logic here
    console.log(`Saved post with ID: ${postId}`);
  };

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
                // onLike={(postId, shouldLike) => handleLike(postId, shouldLike)}
                onLike={(postId, shouldLike) => console.log(`Liked post with ID: ${postId}`)}
                onSave={() => handleSave(post.id)}
              />
            ))
          ) : (
            <p className={styles.noPostsMessage}>There are no posts yet.<br /> Be the first to share something!</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
