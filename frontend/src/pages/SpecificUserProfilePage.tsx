import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import styles from "../styles/UserProfilePage.module.css"; // reuse your own profile styles
import { UserProfile, RawPostFromQuery } from "../interfaces/interfaces";

const SpecificUserProfilePage: React.FC = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<RawPostFromQuery[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                const [profileRes, postsRes] = await Promise.all([
                    axios.get(`/users/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`/posts/user/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setUser(profileRes.data);
                setPosts(postsRes.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load user profile.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    return (
        <div className={styles.container}>
            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {user && (
                <div className={styles.profileInfo}>
                    {user.profileImg ? (
                        <img src={user.profileImg} alt="Profile" className={styles.profileImg} />
                    ) : (
                        <div className={styles.defaultProfileImg}>
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <h2 className={styles.username}>{user.username}</h2>
                    <p>{user.bio || "No bio available"}</p>
                </div>
            )}
            <hr />
            <h3>{user?.username}'s Posts</h3>

            {posts.length === 0 ? (
                <p className={styles.noPostsMessage}>No posts yet.</p>
            ) : (
                <div className={styles.grid}>
                    {posts.map((post) => (
                        <div key={post.id} className={styles.postCard}>
                            {post.photos[0] && (
                                <img
                                    src={post.photos[0].imageUrl}
                                    alt="Post Preview"
                                    className={styles.postImage}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SpecificUserProfilePage;
