import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setUserProfile } from "../redux/profileSlice";
import { setUserPosts } from "../redux/postSlice";
import axios from "axios";
import AppLayout from "../components/AppLayout";
import styles from "../styles/UserProfilePage.module.css";
import { FaPen } from "react-icons/fa";


const UserProfilePage: React.FC = () => {
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profileImg, setProfileImg] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userProfile = useSelector((state: RootState) => state.profile.user);
    const loadingProfile = useSelector((state: RootState) => state.profile.loading);
    const errorProfile = useSelector((state: RootState) => state.profile.error);

    const userPosts = useSelector((state: RootState) => state.posts.userPosts);
    const loadingPosts = useSelector((state: RootState) => state.posts.loading);
    const errorPosts = useSelector((state: RootState) => state.posts.error);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const [profileRes, postsRes] = await Promise.all([
                    await axios.get("/users/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }),
                    await axios.get("/posts/user", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                ]);
                dispatch(setUserProfile(profileRes.data));
                dispatch(setUserPosts(postsRes.data));
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (editMode && userProfile) {
            setUsername(userProfile.username);
            setBio(userProfile.bio || "");
        }
    }, [editMode, userProfile]);

    const handleEditOrSave = async () => {
        if (editMode) {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("bio", bio);
            if (profileImg) {
                formData.append("profileImg", profileImg);
            }
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setErrorMessage("You are not authenticated.");
                    return;
                }
                const res = await axios.put("/users/me", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                dispatch(setUserProfile(res.data.user));
                setEditMode(false);
                setProfileImg(null);
                setErrorMessage(""); // clear on success
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data?.message || "Failed to update profile.");
                } else {
                    setErrorMessage("Something went wrong.");
                }
            }
        }
        else {
            setEditMode(true);
        }
    };

    return (
        <AppLayout>
            <div className={styles.container}>
                {loadingProfile && <p>Loading profile...</p>}
                {errorProfile && <p className={styles.error}>{errorProfile}</p>}
                {userProfile && !loadingProfile && (
                    <div className={styles.profileInfo}>
                        {editMode ? (
                            <>
                                <label htmlFor="profileImgUpload" className={styles.imageUploadeLable}>
                                    {profileImg || userProfile.profileImg ? (
                                        <img
                                            src={profileImg ? URL.createObjectURL(profileImg) : userProfile?.profileImg}
                                            alt="Profile Preview"
                                            className={styles.profileImg}
                                        />
                                    ) : (
                                        <div className={styles.defaultProfileImg}>
                                            {username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className={styles.penOverlay}>
                                        {FaPen && <FaPen className={styles.penIcon} />}
                                    </div>
                                </label>
                                <input
                                    id="profileImgUpload"
                                    type="file"
                                    accept="image/*"
                                    className={styles.hiddenFileInput}
                                    onChange={(e) =>
                                        setProfileImg(e.target.files?.[0] || null)}
                                    hidden
                                />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    className={styles.input}
                                />
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Bio"
                                    className={styles.textarea}
                                />
                            </>
                        ) : (
                            <>
                                {userProfile?.profileImg ? (
                                    <img
                                        src={userProfile.profileImg}
                                        alt="Profile"
                                        className={styles.profileImg}
                                    />
                                ) : (
                                    <div className={styles.defaultProfileImg}>
                                        {userProfile?.username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <h2 className={styles.username}>{userProfile.username}</h2>
                                {userProfile.bio ? <p>{userProfile.bio}</p> : <p>No bio available</p>}
                            </>
                        )}
                        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                        < button
                            className={editMode ? styles.saveButton : styles.editButton}
                            onClick={handleEditOrSave} >
                            {editMode ? "Save Changes" : "Edit Profile"}
                        </button>
                    </div>
                )}
                <hr />
                <h3>Your Posts</h3>
                {loadingPosts && <p>Loading posts...</p>}
                {errorPosts && <p className={styles.errorß}>{errorPosts}</p>}
                {userPosts.length === 0 ? (
                    <p className={styles.noPostsMessage}>
                        No posts yet – start sharing your moments!
                    </p>
                ) : (
                    <div className={styles.grid}>
                        {userPosts.map((post) => (
                            <div key={post.id} className={styles.postCard}>
                                {post.photos[0] && (
                                    <img
                                        src={post.photos[0].imageUrl}
                                        alt="Post Preview"
                                        className={styles.postImage}
                                        onClick={() => navigate(`/posts/${post.id}`)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout >
    );
}
export default UserProfilePage;