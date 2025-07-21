import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import styles from "../styles/HomePage.module.css";
import { showConfetti } from "../utils/showConfetti";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const HomePage: React.FC = () => {
  const samplePosts = [
  {
    username: 'NoyNoy',
    profileImage: '/stitch.png',
    timestamp: '2 hours ago',
    images: ['/beach.png'],
    caption: 'Loving the summer!',
    liked: false,
    saved: false,
    likes: 123,
    comments: 45,
    shares: 10,
  },
  {
    username: 'Danny Bannany',
    profileImage: '/logo512.png',
    timestamp: 'just now',
    images: ['/beach2.png'],
    caption: 'First post on Minigram!',
    liked: true,
    saved: false,
    likes: 75,
    comments: 20,
    shares: 3,
  },
];

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
      <div className = {styles.container}>
        <h1 className={styles.h1}>  Welcome {firstName} {lastName}! 🎉</h1>
        <div className = {styles.postsContainer}>
          {samplePosts.map((post, index) => (
            <PostCard
              key={index}
              {...post}
              onLike={() => console.log("Like clicked")}
              onSave={() => console.log("Save clicked")}/>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
