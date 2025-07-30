import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import PostCard from "../components/PostCard";
import { RawPostFromQuery } from "../interfaces/interfaces";
import AppLayout from "../components/AppLayout";
import styles from "../styles/PostDetailsPage.module.css";

const PostDetailsPage: React.FC = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<RawPostFromQuery | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`/posts/post/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPost(res.data);
            } catch (err) {
                console.error("Failed to load post", err);
            }
        };

        fetchPost();
    }, [postId]);

    const handleLike = async (id: string) => {
        if (!post) return;
        const token = localStorage.getItem("token");
        const newLikedState = !post.isLiked;

        try {
            await axios.put(`/posts/post/${id}/like`, { isLiked: newLikedState }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("****40- Likes before update:", post.likes, "Is liked:", post.isLiked);
            setPost({
                ...post,
                isLiked: newLikedState,
                likes: newLikedState
                    ? (post.likes ?? 0) + 1
                    : Math.max((post.likes ?? 1) - 1, 0),
            });
        } catch (err) {
            console.error("Error toggling like in PostDetailsPage:", err);
        }
    };

    const handleSave = async (id: string) => {
        if (!post) return;
        const token = localStorage.getItem("token");
        const newSaveState = !post.isSaved;

        try {
            await axios.put(`/posts/post/${id}/save`, { isSaved: newSaveState }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setPost({
                ...post,
                isSaved: newSaveState,
            });
        } catch (err) {
            console.error("Error toggling save in PostDetailsPage:", err);
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <AppLayout>
            <div className={styles.fullScreenWrapper}>
                <PostCard post={post} onLike={handleLike} onSave={handleSave} />
            </div>
        </AppLayout>
    )
};

export default PostDetailsPage;
