import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import styles from "../styles/LoginPage.module.css";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("justLoggedIn", "true");

      dispatch(loginSuccess({ user, token }));

      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          className={styles.logo}
          src="/minigram-logo.png"
          alt="Minigram Logo"
        />
        <h2 className={styles.subtitle}>Log In</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p style={{ marginTop: "14px" }}>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
          <button className={styles.button} type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
